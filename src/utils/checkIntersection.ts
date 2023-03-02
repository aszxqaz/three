import { Box3 } from 'three'
import { PlacedItem } from '../store'

export function checkIntersection(box: Box3, items: PlacedItem[]) {
	let intersectionItem: PlacedItem | null = null

	let isIntersecting = false

	for (const item of items) {
		intersectionItem = item
		isIntersecting = box.intersectsBox(item.box)
		if (isIntersecting) break
	}

	return {
		isIntersecting,
		intersectionItem,
	}
}
