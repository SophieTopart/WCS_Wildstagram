import React, { useState, useEffect, useRef } from 'react'
import { Text, View, StyleSheet, Button } from 'react-native'
import { Camera } from 'expo-camera'
import * as ImageManipulator from 'expo-image-manipulator'

export default function CameraScreen() {
	const [hasPermission, setHasPermission] = useState<string | boolean>()
	const cameraRef = useRef<Camera>(null)

	const takePicture = async () => {
		const pictureMetadata = await cameraRef?.current?.takePictureAsync()
		console.log('pictureMetadata :', pictureMetadata)
		console.log(
			pictureMetadata
				? await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
						{ resize: { width: 800 } },
				  ])
				: 'No pictureMetadata'
		)
	}

	useEffect(() => {
		;(async () => {
			const { status } = await Camera.requestCameraPermissionsAsync()
			setHasPermission(status === 'granted')
		})()
	}, [])

	if (hasPermission === null) {
		return <View />
	}
	if (hasPermission === false) {
		return <Text>No access to camera</Text>
	}
	return (
		<View style={styles.camera}>
			<Camera style={styles.camera} ref={cameraRef} />
			<View>
				<Button title='Take a picture' onPress={takePicture} />
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	camera: {
		flex: 1,
	},
})
