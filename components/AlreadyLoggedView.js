import React from 'react'
import { View, Text, Platform, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import TextButton from './TextButton'

export default function AlreadyLoggedView ({ reset }) {
	return (
		<View style={styles.container}>
			<Ionicons name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'} size={100} />
			<Text>You already logged your information for today.</Text>
			<TextButton
				onPress={reset}
				style={{padding: 10}}>
				Reset
			</TextButton>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 30,
		marginLeft: 30
	}
})
