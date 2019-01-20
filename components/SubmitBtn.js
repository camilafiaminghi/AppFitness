import React from 'react'
import { TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { white, purple } from '../utils/colors'

const styles = StyleSheet.create({
	iosBtn: {
		backgroundColor: purple,
		padding: 10,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40
	},
	androidBtn: {
		backgroundColor: purple,
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
		borderRadius: 2,
		height: 45,
		alignSelf: 'flex-end',
		justifyContent: 'center',
		alignItems: 'center'
	},
	btnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center'
	}
})

export default function SubmitBtn ({ onPress }) {
	return (
		<TouchableOpacity
			onPress={onPress}
			style={Platform.OS === 'ios' ? styles.iosBtn : styles.androidBtn}>
			<Text style={styles.btnText}>SUBMIT</Text>
		</TouchableOpacity>
	)
}
