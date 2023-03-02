import { Ref, memo, useMemo } from 'react'
import { Material, Mesh } from 'three'
import { useStore } from '../store'
import { ItemsListConfig } from '../hooks/useLoadItems'

type SelectedItemProps = {
	itemsListConfig: ItemsListConfig
	selectedRef: Ref<Mesh>
}

export const SelectedItem = memo(
	({ itemsListConfig, selectedRef }: SelectedItemProps) => {
		const selected = useStore((state) => state.selected)
		const selectedPos = useStore((state) => state.selectedPos)

		const invalidMaterial = useMemo(() => {
			let mat: Material | Material[] | null = null
			if (selected) {
				mat = itemsListConfig[selected.type].object.material
				if (Array.isArray(mat)) mat = mat[0]
				mat = mat.clone()
				if (!selected.isValid) {
					mat!.transparent = true
					mat!.opacity = 0.5
				}
				return mat
			}
			return null
		}, [selected])

		if (!selected) return null

		return (
			<mesh
				ref={selectedRef}
				onPointerMove={(e) => {}}
				castShadow
				receiveShadow
				geometry={itemsListConfig[selected.type].object.geometry}
				material={
					selected.isValid
						? itemsListConfig[selected.type].object.material
						: invalidMaterial!
				}
				rotation={[0, (selected.rotation * Math.PI) / 2, 0]}
				position={selectedPos}
			/>
		)
	}
)
