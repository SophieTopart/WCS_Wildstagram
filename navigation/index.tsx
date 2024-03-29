/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import {
	NavigationContainer,
	DefaultTheme,
	DarkTheme,
} from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import * as React from 'react'
import { ColorSchemeName, Pressable } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'

import ModalScreen from '../screens/ModalScreen'
import NotFoundScreen from '../screens/NotFoundScreen'
import CameraScreen from '../screens/CameraScreen'
import FeedScreen from '../screens/FeedScreen'
import ImagesScreen from '../screens/ImagesScreen'
import { RootStackParamList, RootTabParamList } from '../types'
import LinkingConfiguration from './LinkingConfiguration'

export default function Navigation({
	colorScheme,
}: {
	colorScheme: ColorSchemeName
}) {
	return (
		<NavigationContainer
			linking={LinkingConfiguration}
			theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
		>
			<RootNavigator />
		</NavigationContainer>
	)
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>()

function RootNavigator() {
	return (
		<Stack.Navigator>
			<Stack.Screen
				name='Root'
				component={BottomTabNavigator}
				options={{ headerShown: false }}
			/>
			<Stack.Screen
				name='NotFound'
				component={NotFoundScreen}
				options={{ title: 'Oops!' }}
			/>
			<Stack.Group screenOptions={{ presentation: 'modal' }}>
				<Stack.Screen name='Modal' component={ModalScreen} />
			</Stack.Group>
		</Stack.Navigator>
	)
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>()

function BottomTabNavigator() {
	return (
		<BottomTab.Navigator
			initialRouteName='TabOne'
			screenOptions={({ route }) => ({
				tabBarIcon: ({ focused, color, size }) => {
					let iconName: React.ComponentProps<typeof Ionicons>['name'] =
						'ios-information-circle'

					if (route.name === 'TabOne') {
						iconName = focused
							? 'ios-information-circle'
							: 'ios-information-circle-outline'
					} else if (route.name === 'CameraScreen') {
						iconName = focused ? 'camera' : 'camera-outline'
					} else if (route.name === 'FeedScreen') {
						iconName = focused ? 'share-social' : 'share-social-outline'
					} else if (route.name === 'ImagesScreen') {
						iconName = focused ? 'image' : 'image-outline'
					}
					return <Ionicons name={iconName} size={size} color={color} />
				},
				tabBarActiveTintColor: 'blue',
				tabBarInactiveTintColor: 'gray',
			})}
		>
			{/* <BottomTab.Screen
				name='TabOne'
				component={TabOneScreen}
				options={({ navigation }: RootTabScreenProps<'TabOne'>) => ({
					title: 'Tab One',
					tabBarIcon: ({ color }) => <TabBarIcon name='code' color={color} />,
					headerRight: () => (
						<Pressable
							onPress={() => navigation.navigate('Modal')}
							style={({ pressed }) => ({
								opacity: pressed ? 0.5 : 1,
							})}
						>
							<FontAwesome
								name='info-circle'
								size={25}
								color={Colors[colorScheme].text}
								style={{ marginRight: 15 }}
							/>
						</Pressable>
					),
				})}
			/> */}
			<BottomTab.Screen
				name='CameraScreen'
				component={CameraScreen}
				options={{
					title: 'Camera',
					unmountOnBlur: true,
				}}
			/>
			<BottomTab.Screen
				name='ImagesScreen'
				component={ImagesScreen}
				options={{
					title: 'Images',
					unmountOnBlur: true,
				}}
			/>
			<BottomTab.Screen
				name='FeedScreen'
				component={FeedScreen}
				options={{
					title: 'Feed',
					unmountOnBlur: true,
				}}
			/>
		</BottomTab.Navigator>
	)
}

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
	name: React.ComponentProps<typeof FontAwesome>['name']
	color: string
}) {
	return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />
}
