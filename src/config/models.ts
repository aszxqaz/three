import { ItemName } from '../store'

type SingleModelConfig = {
	modelSource: string
}

export type ModelsConfig = {
	[K in ItemName]: SingleModelConfig
}

export const models: ModelsConfig = {
	tower: {
		modelSource: './tower.gltf',
	},
	wall: {
		modelSource: './wall.gltf',
	},
}
