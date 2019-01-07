import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

export default class App extends React.Component {
	componentDidMount() {
		// console.log('Before debugger')
		// debugger
		// console.log('After debugger')
	}
  render() {
    return (
      <View style={styles.container}>
      	<Ionicons name='ios-airplane' size={35} />
      	<Text>Icon Example</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
