import React, { useState } from 'react'
import { Text, View, Button, StyleSheet } from 'react-native'

const HelloWorldApp = () => {
	const [stateButton, setStateButton] = useState(false)
	const pressButton = () => {
		setStateButton(!stateButton)
	}
	return (
		<View style={styles.globalContainer}>
			<View style={styles.container}>
				<Text style={styles.blueText}>Hello, world!</Text>
				<Text style={styles.blueText}>This is a text.</Text>
				<Text style={styles.blueText}>And an other text.</Text>
				<Button color='white' title='Click here' onPress={pressButton} />
				{stateButton && <Text>You clicked!</Text>}
			</View>
			<View style={styles.containerTwo}>
				<Text style={styles.blueText}>Hello, world!</Text>
				<Text style={styles.blueText}>This is a text.</Text>
				<Text style={styles.blueText}>And an other text.</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	globalContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'grey',
	},
	containerTwo: {
		alignItems: 'flex-end',
		backgroundColor: 'lightgreen',
	},
	blueText: {
		color: 'blue',
	},
})

export default HelloWorldApp
