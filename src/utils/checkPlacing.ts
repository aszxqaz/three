import { itemsConfig, Side } from '../config/itemtypes'
import { PlacedItem } from '../store'

export function checkPlacing(
	curItem: Omit<PlacedItem, 'position'>,
	placedItem: Omit<PlacedItem, 'position'>
) {
	const placingsOrdered = ['left', 'top', 'right', 'bottom']
	const curOffset = curItem.rotation % placingsOrdered.length
	const placedOffset = placedItem.rotation % placingsOrdered.length

	const curConfig = itemsConfig[curItem.type]
	const placedConfig = itemsConfig[placedItem.type]

	let curSide = ''
	let placedSide = ''

	if (curItem.box.min.x + 0.1 >= placedItem.box.max.x) {
		curSide = 'left'
		placedSide = 'right'
	}
	if (curItem.box.max.x <= placedItem.box.min.x + 0.1) {
		curSide = 'right'
		placedSide = 'left'
	}
	if (curItem.box.min.z + 0.1 >= placedItem.box.max.z) {
		curSide = 'top'
		placedSide = 'bottom'
	}
	if (curItem.box.max.z <= placedItem.box.min.z + 0.1) {
		curSide = 'bottom'
		placedSide = 'top'
	}

	if (!curSide || !placedSide) return false

	let placedIndex = placingsOrdered.indexOf(placedSide) - placedOffset
	if (placedIndex >= placingsOrdered.length) {
		placedIndex = placedIndex % placingsOrdered.length
	}
	if (placedIndex < 0) {
		placedIndex = placingsOrdered.length + placedIndex
	}

	const realPlacedSide = placingsOrdered[placedIndex]

	let curIndex = placingsOrdered.indexOf(curSide) - curOffset
	if (curIndex >= placingsOrdered.length) {
		curIndex = curIndex % placingsOrdered.length
	}
	if (curIndex < 0) {
		curIndex = placingsOrdered.length + curIndex
	}

	const realCurSide = placingsOrdered[curIndex]

	if (
		!curConfig.legalPlacings[placedItem.type].includes(realCurSide as Side) ||
		!placedConfig.legalPlacings[curItem.type].includes(realPlacedSide as Side)
	)
		return false

	return true
}
