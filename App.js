import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { View, Platform } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createAppContainer } from 'react-navigation'
import AddEntry from './components/AddEntry'
import History from './components/History'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'


// const Tabs = createBottomTabNavigator({
const Tabs = createMaterialTopTabNavigator({
	History: {
		screen: History,
		navigationOptions: {
			tabBarLabel: 'History',
			tabBarIcons: ({ tintColor }) => <Ionicons name="ios-bookmarks" size={30} color={tintColor} />
		}
	},
	AddEntry: {
		screen: AddEntry,
		navigationOptions: {
			tabBarLabel: 'AddEntry',
			tabBarIcons: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
		}
	}
}, {
	navigationOptions: {
		header: null
	},
	tabBarOptions: {
		activeTintColor: (Platform.OS === 'ios') ? purple : white,
		style: {
			height: 56,
			backgroundColor: (Platform.OS === 'ios') ? white : purple,
			shadowColor: 'rgba(0, 0, 0, 0.24)',
			shadowOffset: {
				width: 0,
				height: 3
			},
			shadowRadius: 6,
			shadowOpacity: 1
		}
	}
})

const TabsContainer = createAppContainer(Tabs)

export default class App extends Component {
	render() {
    return (
    	<Provider store={createStore(reducer)}>
	      <View style={{flex: 1}}>
	      	<View style={{height: 20}} />
	      	<TabsContainer />
	      </View>
	    </Provider>
    )
  }
}
