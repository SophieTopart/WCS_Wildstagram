import React, { useEffect, useState, useCallback } from 'react'
import {
	Image,
	StyleSheet,
	FlatList,
	Button,
	ListRenderItem,
	ListRenderItemInfo,
	RefreshControl,
} from 'react-native'
import * as FileSystem from 'expo-file-system'
import singleFileUploader from 'single-file-uploader'

export default function CameraScreen() {
	const [imagesStore, setImagesStore] = useState<string[]>([])
	const [refreshing, setRefreshing] = useState(false)

	const wait = (timeout: number) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout)
		})
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		wait(1000).then(() => setRefreshing(false))
	}, [])

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
				refreshControl={
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
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
