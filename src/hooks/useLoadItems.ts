import { useLoader } from '@react-three/fiber'
import { Mesh, Texture } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { TextureLoader } from 'three/src/loaders/TextureLoader'
import { ModelsConfig } from '../config/models'
import { ItemName } from '../store'

export type ItemsListConfig = {
	[K in ItemName]: {
		object: Mesh
	}
}

export const useItemsLoader = (models: ModelsConfig) => {
	const modelNames = Object.keys(models) as ItemName[]
	const modelSources = Object.keys(models).map(
		(name) => models[name as ItemName].modelSource
	)

	const gltfs = useLoader(GLTFLoader, modelSources)

	const items = {} as ItemsListConfig

	for (let i = 0; i < modelNames.length; i++) {
		items[modelNames[i]] = {
			object: gltfs[i].scene.children[0] as Mesh,
		}
	}

	return items
}
