import React, { useState, useEffect, useCallback } from 'react'
import {
	StyleSheet,
	Image,
	FlatList,
	ListRenderItem,
	RefreshControl,
} from 'react-native'
import axios from 'axios'

export default function FeedScreen() {
	const [serverImages, setServerImages] = useState<string[]>([])
	const [refreshing, setRefreshing] = useState(false)

	const wait = (timeout: number) => {
		return new Promise((resolve) => {
			setTimeout(resolve, timeout)
		})
	}

	const onRefresh = useCallback(() => {
		setRefreshing(true)
		wait(2000).then(() => setRefreshing(false))
	}, [])

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
			refreshControl={
				<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
			}
			inverted={true}
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
