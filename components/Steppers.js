import React from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { FontAwesome, Entypo } from '@expo/vector-icons'
import MetricCounter from './MetricCounter'
import { white, gray, purple } from '../utils/colors'

const styles = StyleSheet.create({
	row: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	iosBtn: {
		backgroundColor: white,
		borderColor: purple,
		borderWidth: 1,
		borderRadius: 3,
		padding: 5,
		paddingLeft: 25,
		paddingRight: 25
	},
	androidBtn: {
		margin: 5,
		padding: 10,
		backgroundColor: purple,
		borderRadius: 2
	},
	btnRight: {
		borderTopRightRadius: 0,
		borderBottomRightRadius: 0
	},
	btnLeft: {
		borderTopLeftRadius: 0,
		borderBottomLeftRadius: 0
	}
})

export default function Steppers ({ max, unit, step, value, onIncrement, onDecrement }) {
	return (
		<View style={styles.row}>
			<View style={{flexDirection: 'row'}}>
				<TouchableOpacity
					onPress={onDecrement}
					style={Platform.OS === 'ios' ? [styles.iosBtn, styles.btnRight] : [styles.androidBtn, styles.btnRight]}>
					<FontAwesome name="minus" size={30} color={Platform.OS === 'ios' ? purple : white} />
				</TouchableOpacity>

				<TouchableOpacity
					onPress={onIncrement}
					style={Platform.OS === 'ios' ? [styles.iosBtn, styles.btnLeft] : [styles.androidBtn, styles.btnLeft]}>
					<FontAwesome name="plus" size={30} color={Platform.OS === 'ios' ? purple : white} />
				</TouchableOpacity>
			</View>

			<MetricCounter value={value} unit={unit} />
		</View>
	)
}
