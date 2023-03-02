import { useLoader } from '@react-three/fiber'
import { MeshStandardMaterialParameters, RepeatWrapping, Vector2 } from 'three'
import { TextureLoader } from 'three/src/loaders/TextureLoader'

export const useGrassMaterialLoader = (): MeshStandardMaterialParameters => {
	const textureDiffuse = useLoader(TextureLoader, './grasslight-small.jpg')
	const textureNormal = useLoader(TextureLoader, './grasslight-small-nm.jpg')

	textureDiffuse.wrapS = RepeatWrapping
	textureDiffuse.wrapT = RepeatWrapping
	textureDiffuse.repeat.x = 16
	textureDiffuse.repeat.y = 16
	textureDiffuse.anisotropy = 16

	textureNormal.wrapS = RepeatWrapping
	textureNormal.wrapT = RepeatWrapping
	textureNormal.repeat.x = 16
	textureNormal.repeat.y = 16
	textureNormal.anisotropy = 16

	return {
		map: textureDiffuse,
		normalMap: textureNormal,
		normalScale: new Vector2(1, 1).multiplyScalar(0.5),
    color: 0x1f6e1f
	}
}