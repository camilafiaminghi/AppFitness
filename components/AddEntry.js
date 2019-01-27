import React, { Component } from 'react'
import { View, ScrollView, Text, AsyncStorage, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { NavigationActions } from 'react-navigation'
import AlreadyLoggedView from './AlreadyLoggedView'
import DateHeader from './DateHeader'
import AppSlider from './AppSlider'
import Steppers from './Steppers'
import SubmitBtn from './SubmitBtn'
import { getMetricMetaInfo, timeToString, getDailyReminderValue, clearLocalNotification, setLocalNotification } from '../utils/helpers'
import { submitEntry, removeEntry } from '../utils/api'
import { white } from '../utils/colors'
import { addEntry } from '../actions'

class AddEntry extends Component {
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
		this.props.dispatch(addEntry({
			[key]: entry
		}));

		this.setState(() => ({
			run: 0,
			bike: 0,
			swin: 0,
			sleep: 0,
			eat: 0
		}))

		this.toHome()
		submitEntry({ entry, key })
		clearLocalNotification()
			.then(setLocalNotification)
	}

	reset = () => {
		const key = timeToString()

		// Upadate Redux
		this.props.dispatch(addEntry({
			[key]: getDailyReminderValue()
		}))

		this.toHome()
		// Update DB
		removeEntry(key)
	}

	toHome = () => {
		this.props.navigation.dispatch(NavigationActions.back({
			key: 'AddEntry'
		}))
	}

	render() {
		const metaInfo = getMetricMetaInfo()
		const { alreadyLogged } = this.props

		if ( alreadyLogged ) {
			return (<AlreadyLoggedView reset={this.reset} />)
		}

		return (
			<View style={styles.container}>
				<DateHeader date={(new Date()).toLocaleDateString()} />

				{Object.keys(metaInfo).map((key) => {
					const { getIcon, type, ...rest } = metaInfo[key]
					const value = this.state[key]
					return (
						<View
							key={key}
							style={styles.row}>
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

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: white
	},
	row: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center'
	}
})

const mapStateToProps = (state) => {
	const key = timeToString()

	return {
		alreadyLogged: state[key] && typeof state[key].today === 'undefined'
	}
}

export default connect(mapStateToProps)(AddEntry)
