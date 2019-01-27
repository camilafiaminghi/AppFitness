import React, { Component } from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { View, Platform } from 'react-native';
import { createBottomTabNavigator, createMaterialTopTabNavigator, createStackNavigator, createAppContainer } from 'react-navigation'
import AddEntry from './components/AddEntry'
import History from './components/History'
import AppStatusBar from './components/AppStatusBar'
import EntryDetail from './components/EntryDetail'
import Live from './components/Live'
import reducer from './reducers'
import { purple, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { setLocalNotification } from './utils/helpers'

// const Tabs = createBottomTabNavigator({
const Tabs = {
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
			tabBarLabel: 'Add Entry',
			tabBarIcons: ({ tintColor }) => <FontAwesome name="plus-square" size={30} color={tintColor} />
		}
	},
	Live: {
		screen: Live,
		navigationOptions: {
			tabBarLabel: 'Live',
			tabBarIcons: ({ tintColor }) => <FontAwesome name="plus-speedometer" size={30} color={tintColor} />
		}
	}
}
const TabNavigationOptions = {
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
}
const TabsAndroid = createMaterialTopTabNavigator(Tabs, TabNavigationOptions)
const TabsIos = createBottomTabNavigator(Tabs, TabNavigationOptions)
const TabsContainer = (Platform.OS === 'ios') ? createAppContainer(TabsIos) : createAppContainer(TabsAndroid)

const Stack = createStackNavigator({
  Home: {
    screen: TabsContainer,
    navigationOptions: {
      header: null
    }
  },
  EntryDetail: {
    screen: EntryDetail,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: purple
      }
    }
  }
})

const StackContainer = createAppContainer(Stack)

export default class App extends Component {
	componentDidMount() {
		setLocalNotification()
	}

	render() {
    return (
    	<Provider store={createStore(reducer)}>
	      <View style={{flex: 1}}>
	      	<AppStatusBar backgroundColor={purple} barStyle="light-content" />
	      	<StackContainer />
	      </View>
	    </Provider>
    )
  }
}
