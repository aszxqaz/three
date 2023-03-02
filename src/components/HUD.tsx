import { useCallback } from 'react'
import { useStore } from '../store'

export const HUD = () => {
	const setSelected = useStore((state) => state.setSelected)
	const selected = useStore((state) => state.selected)
	const selectItem = useStore((state) => state.selectItem)

	const setCursor = useCallback(() => {
		const canvas = document.body.querySelector('canvas')
		if (canvas) canvas.style.cursor = 'none'
	}, [])

	return (
		<div
			className="panel"
			onKeyDown={(e) => {
				if (!selected) return

				setSelected({
					...selected,
					rotation: selected.rotation + 1,
				})
			}}>
			<div>
				Press R to rotate item <br />
				Left click to place item
			</div>
			<div className="panel__bottom">
				<button
					onClick={() => {
						selectItem('tower')
						setCursor()
					}}>
					Tower
				</button>
				<button
					onClick={() => {
						selectItem('wall')
						setCursor()
					}}>
					Wall
				</button>
			</div>
		</div>
	)
}
