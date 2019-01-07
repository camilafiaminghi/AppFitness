import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { getMetricMetaInfo } from './../utils/helpers'
import DateHeader from './DateHeader'
import Slider from './Slider'
import Steppers from './Steppers'

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

		setState((state) => {
			const count = state[metric] + step
			return {
				...state,
				[metric]: (count > max) ? max : count
			}
		})
	}

	decrement = (metric) => {

		setState((state) => {
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

	render() {
		const metaInfo = getMetricMetaInfo()

		return (
			<View>
				<DateHeader date={(new Date()).toLocaleDateString()} />

				{Object.keys(metaInfo).map((key) => {
					const { getIcon, type, ...rest } = metaInfo[key]
					const value = this.state[key]
					return (
						<View key={key}>
							{ getIcon() }
							{ type
								? <Slider
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
			</View>
		)
	}
}
