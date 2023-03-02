import { memo } from 'react'
import { useStore } from '../store'
import { ItemsListConfig } from '../hooks/useLoadItems'

type PlacedItemsProps = {
	itemsListConfig: ItemsListConfig
}

export const PlacedItems = memo(({ itemsListConfig }: PlacedItemsProps) => {
	const items = useStore((state) => state.items)
	return (
		<group>
			{items.map((item, i) => {
				let material = itemsListConfig[item.type].object.material
				material = Array.isArray(material) ? material[0] : material
				let mat = material.clone()

				return (
					<mesh
						key={i}
						castShadow
						receiveShadow
						geometry={itemsListConfig[item.type].object.geometry}
						rotation={[0, (item.rotation * Math.PI) / 2, 0]}
						material={mat}
						position={item.position}></mesh>
				)
			})}
		</group>
	)
})
