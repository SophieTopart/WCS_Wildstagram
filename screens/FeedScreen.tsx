import React, { useState, useEffect } from 'react'
import { StyleSheet, Image, FlatList, ListRenderItem } from 'react-native'
import axios from 'axios'

export default function FeedScreen() {
	const [serverImages, setServerImages] = useState<string[]>([])

	useEffect(() => {
		;(async () => {
			const filesUrl = await axios.get(
				'https://wildstagram.nausicaa.wilders.dev/list'
			)
			setServerImages(filesUrl.data)
		})()
	}, [])

	const renderImage: ListRenderItem<string> = (itemData) => {
		return (
			<>
				<Image
					style={styles.image}
					source={{
						uri:
							'https://wildstagram.nausicaa.wilders.dev/files/' + itemData.item,
					}}
				/>
			</>
		)
	}

	return serverImages.length > 0 ? (
		<FlatList
			data={serverImages}
			keyExtractor={(serverImage) => serverImage}
			renderItem={renderImage}
		/>
	) : null
}

const styles = StyleSheet.create({
	image: {
		flex: 1,
		resizeMode: 'cover',
		height: 500,
	},
})
