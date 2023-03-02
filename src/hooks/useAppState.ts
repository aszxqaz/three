import { useStore } from '../store'

export const useAppState = () => {
  const items = useStore(state => state.items)
  const selected = useStore(state => state.selected)

	const invalidateSelection = useStore((state) => state.invalidateSelection)
	const triggerSelection = useStore((state) => state.triggerSelection)
	const untriggerSelection = useStore((state) => state.untriggerSelection)
	const placeItem = useStore((state) => state.placeItem)
	const setSelectedPos = useStore(
		(state) => state.setSelectedPos
	)

	return {
    items,
    selected,
		invalidateSelection,
		triggerSelection,
		untriggerSelection,
		placeItem,
		setSelectedPos,
	}
}
