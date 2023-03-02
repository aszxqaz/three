import { ThreeElements, ThreeEvent } from '@react-three/fiber'
import { useCallback, useRef } from 'react'
import { Box3, Euler, Mesh } from 'three'
import { models } from '../config/models'
import { useAppState } from '../hooks/useAppState'
import { useGrassMaterialLoader } from '../hooks/useGrass'
import { useItemsLoader } from '../hooks/useLoadItems'
import { checkIntersection } from '../utils/checkIntersection'
import { checkPlacing } from '../utils/checkPlacing'
import { getSelectionBoxes } from '../utils/getSelectionBoxes'
import { PlacedItems } from './PlacedItems'
import { SelectedItem } from './SelectedItem'

export function Screen(props: ThreeElements['mesh']) {
	const selectedRef = useRef<Mesh>(null)
	const itemsListConfig = useItemsLoader(models)
	const grassMaterial = useGrassMaterialLoader()
	const {
		items,
		selected,
		invalidateSelection,
		triggerSelection,
		untriggerSelection,
		placeItem,
		setSelectedPos: setSelectedPosToPointer,
	} = useAppState()

	const handlePointerMove = useCallback(
		async (e: ThreeEvent<PointerEvent>) => {
			e.stopPropagation()
			const mesh = selectedRef.current

			if (!selected || !mesh) return

			const { original, projected } = getSelectionBoxes(mesh, e.point)

			const { intersectionItem, isIntersecting } = checkIntersection(
				projected,
				items
			)

			if (!isIntersecting) {
				if (selected.isValid) invalidateSelection()
				if (selected.isTriggered) untriggerSelection()
				setSelectedPosToPointer(e.point)
				return
			}

			if (!selected.isValid)
				if (
					checkPlacing(
						{
							type: selected.type,
							box: original,
							rotation: selected.rotation,
						},
						intersectionItem!
					) &&
					!selected.isTriggered
				)
					triggerSelection(true)
				else triggerSelection(false)
		},
		[selected]
	)

	const setCursor = useCallback(() => {
		const canvas = document.body.querySelector('canvas')
		if (canvas) canvas.style.cursor = 'grab'
	}, [])

	return (
		<>
			<mesh
				rotation={new Euler(80, 0, 0)}
				onPointerMove={handlePointerMove}
				onClick={() => {
					if (selectedRef.current) {
						placeItem({
							position: selectedRef.current.position,
							box: new Box3().setFromObject(selectedRef.current),
						})
						setCursor()
					}
				}}>
				<mesh>
					<planeBufferGeometry attach="geometry" args={[250, 150]} />
					<meshStandardMaterial attach="material" {...grassMaterial} />
				</mesh>
			</mesh>
			<PlacedItems itemsListConfig={itemsListConfig} />
			<SelectedItem
				selectedRef={selectedRef}
				itemsListConfig={itemsListConfig}
			/>
		</>
	)
}
