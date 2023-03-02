import { ItemName } from "../store"

export type Side = 'left' | 'right' | 'top' | 'bottom'

type ItemsConfig = {
	[K in ItemName]: {
		legalPlacings: {
			[N in ItemName]: Side[]
		}
	}
}

export const itemsConfig: ItemsConfig = {
	wall: {
		legalPlacings: {
			tower: ['left', 'right'],
      wall: ['left', 'right', 'top', 'bottom']
		},
	},

	tower: {
		legalPlacings: {
			wall: ['left', 'right', 'top', 'bottom'],
      tower: []
		},
	},
}
