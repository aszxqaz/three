import { Mesh, Vector3, Box3 } from 'three'

export function getSelectionBoxes(mesh: Mesh, pointer: Vector3) {
	const original = new Box3().setFromObject(mesh)
	const size = new Vector3()
	original.getSize(size)

	const projected = new Box3().setFromCenterAndSize(pointer, size)

	return { original, projected }
}
