import { create } from 'zustand'
import { Box3, Vector3 } from 'three'

export type ItemName = 'wall' | 'tower'

export type BaseItem = {
	type: ItemName
	rotation: number
}

export type PlacedItem = BaseItem & {
	box: Box3
	position: Vector3
}

type SelectedItem = BaseItem & {
	isValid: boolean
	isTriggered: boolean
}

type State = {
	items: PlacedItem[]
	selected: SelectedItem | null
	selectedPos: Vector3
}

type Actions = {
	setSelected: (item: SelectedItem) => void
	setSelectedPos: (position: Vector3) => void
	placeItem: (data: Pick<PlacedItem, 'box' | 'position'>) => void
	selectItem: (name: ItemName) => void
	invalidateSelection: () => void
	triggerSelection: (isValid: boolean) => void
	untriggerSelection: () => void
}

export const useStore = create<State & Actions>((set) => ({
	items: [],
	selected: null,
	pointerPos: new Vector3(),
	selectedPos: new Vector3(),
	setSelected: (item) => {
		set((state) => ({
			selected: item,
		}))
	},
	setSelectedPos: (position) => {
		set((state) => ({ selectedPos: position }))
	},
	selectItem: (type) => {
		set((state) => ({
			selected: {
				isValid: false,
				type,
				rotation: 0,
				isTriggered: false,
			},
		}))
	},
	invalidateSelection: () => {
		set((state) => ({
			selected: state.selected
				? {
						...state.selected,
						isValid: false,
				  }
				: null,
		}))
	},
	triggerSelection: (isValid) => {
		set((state) => ({
			selected: state.selected
				? {
						...state.selected,
						isValid,
						isTriggered: true,
				  }
				: null,
		}))
	},
	untriggerSelection: () => {
		set((state) => ({
			selected: state.selected
				? {
						...state.selected,
						isTriggered: false,
				  }
				: null,
		}))
	},
	placeItem: (data) => {
		set((state) => {
			const { selected, items } = state

			if (!selected) return state

			if (selected.isValid || !items.length)
				return {
					items: [
						...state.items,
						{
							box: data.box,
							position: data.position,
							rotation: selected.rotation,
							type: selected.type,
						},
					],
					selected: null,
				}
			return state
		})
	},
}))
