import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

const styles = StyleSheet.create({
	metricCounter: {
		width: 85,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'flex-end'
	}
})

export default function AppSlider ({ value, unit }) {
	return (
		<View style={styles.metricCounter}>
			<Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
			<Text style={{fontSize: 18, color: gray}}>{unit}</Text>
		</View>
	)
}
