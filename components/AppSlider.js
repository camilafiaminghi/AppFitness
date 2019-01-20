import React from 'react'
import { View, Text, Slider, StyleSheet } from 'react-native'
import MetricCounter from './MetricCounter'

const styles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	}
})

export default function AppSlider ({ max, unit, step, value, onChange }) {
	return (
		<View style={styles.row}>
			<Slider
				step={step}
				value={value}
				maximumValue={max}
				minimumValue={0}
				onValueChange={onChange}
				style={{flex: 1}} />

			<MetricCounter value={value} unit={unit} />
		</View>
	)
}
