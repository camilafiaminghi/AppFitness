import React from 'react'
import { TouchableOpacity, Text } from 'react-native'

export default function SubmitBtn ({ onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text>Submit</Text>
		</TouchableOpacity>
	)
}
