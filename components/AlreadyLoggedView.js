import React from 'react'
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// import TextButton from './TextButton'

export default function AlreadyLoggedView () {
	return (
		<View>
			<Ionicons name={'md-happy'} syze={100} />
			<Text>>You already logged your information for today.</Text>
		</View>
	)
}
