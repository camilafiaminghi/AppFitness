import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getMetricMetaInfo, timeToString } from './../utils/helpers'
import AlreadyLoggedView from './AlreadyLoggedView'
import DateHeader from './DateHeader'
import AppSlider from './AppSlider'
import Steppers from './Steppers'
import SubmitBtn from './SubmitBtn'

export default class AddEntry extends Component {
	state = {
		run: 0,
		bike: 0,
		swin: 0,
		sleep: 0,
		eat: 0
	}

	increment = (metric) => {
		const { max, step } = getMetricMetaInfo(metric)

		this.setState((state) => {
			const count = state[metric] + step
			return {
				...state,
				[metric]: (count > max) ? max : count
			}
		})
	}

	decrement = (metric) => {

		this.setState((state) => {
			const count = state[metric] - getMetricMetaInfo(metric).step
			return {
				...state,
				[metric]: (count < 0) ? 0 : count
			}
		})
	}

	slide = (metric, value) => {
		this.setState((state) => ({
			...state,
			[metric]: value
		}))
	}

	submit = () => {
		const key = timeToString()
		const entry = this.state

		// Upadate Redux

		this.setState(() => ({
			run: 0,
			bike: 0,
			swin: 0,
			sleep: 0,
			eat: 0
		}))

		// Navigate to home
		// Save to DB
		// Clear local notification
	}

	reset = () => {
		const key = timeToString()

		// Upadate Redux
		// Navigate to home
		// Update DB
	}

	render() {
		const metaInfo = getMetricMetaInfo()

		if (true) {
			return (<AlreadyLoggedView reset={this.reset} />)
		}

		return (
			<View>
				<DateHeader date={(new Date()).toLocaleDateString()} />

				{Object.keys(metaInfo).map((key) => {
					const { getIcon, type, ...rest } = metaInfo[key]
					const value = this.state[key]
					return (
						<View key={key}>
							{ getIcon() }
							{ type === 'slider'
								? <AppSlider
										value={value}
										onChange={(value) => this.slide(key, value)}
										{...rest} />
								: <Steppers
										value={value}
										onIncrement={() => this.increment(key)}
										onDecrement={() => this.decrement(key)}
										{...rest} />
							}
						</View>
					)
				})}

				<SubmitBtn onPress={this.submit} />
			</View>
		)
	}
}
