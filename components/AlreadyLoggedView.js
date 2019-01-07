import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'

export default function AlreadyLoggedView ({ reset }) {
	return (
		<View>
			<Ionicons name={'md-happy'} size={100} />
			<Text>You already logged your information for today.</Text>
			<TextButton onPress={reset}>
				Reset
			</TextButton>
		</View>
	)
}
