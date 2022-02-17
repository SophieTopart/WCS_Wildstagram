import React, { useEffect, useState } from 'react'
import {
	Image,
	StyleSheet,
	FlatList,
	Button,
	ListRenderItem,
	ListRenderItemInfo,
} from 'react-native'
import * as FileSystem from 'expo-file-system'
import singleFileUploader from 'single-file-uploader'

interface IItemData {
	index: String
	item: String
	separators: Object
}

export default function CameraScreen() {
	const [imagesStore, setImagesStore] = useState<string[]>([])

	useEffect(() => {
		;(async () => {
			const images = await FileSystem.readDirectoryAsync(
				FileSystem.cacheDirectory + 'ImageManipulator'
			)
			setImagesStore(images)
		})()
	}, [])

	const uploadImage = async (itemData: ListRenderItemInfo<string>) => {
		try {
			await singleFileUploader({
				distantUrl: 'https://wildstagram.nausicaa.wilders.dev/upload',
				filename: itemData.item,
				filetype: 'image/jpeg',
				formDataName: 'fileData',
				localUri:
					FileSystem.cacheDirectory + 'ImageManipulator/' + itemData.item,
			})
			alert('Uploaded')
		} catch (err) {
			alert('Error')
		}
	}

	const deleteImage = async (itemData: ListRenderItemInfo<string>) => {
		try {
			await FileSystem.deleteAsync(
				FileSystem.cacheDirectory + 'ImageManipulator/' + itemData.item
			)
			alert('Deleted')
		} catch (err) {
			alert('Error')
		}
	}

	const renderImage: ListRenderItem<string> = (itemData) => {
		return (
			<>
				<Image
					style={styles.image}
					source={{
						uri:
							FileSystem.cacheDirectory + 'ImageManipulator/' + itemData.item,
					}}
				/>
				<Button title='Upload image' onPress={() => uploadImage(itemData)} />
				<Button title='Delete image' onPress={() => deleteImage(itemData)} />
			</>
		)
	}

	return imagesStore.length > 0 ? (
		<>
			<FlatList
				data={imagesStore}
				keyExtractor={(imageStore) => imageStore}
				renderItem={renderImage}
			/>
		</>
	) : null
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		height: 500,
	},
})
