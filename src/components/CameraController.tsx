import { useEffect } from 'react'
import { useThree } from '@react-three/fiber'

const movement = 1

export const CameraController = () => {
	const { camera } = useThree()

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.code === 'KeyA' || e.code === 'ArrowLeft') {
			camera.translateX(-movement)
		}
		if (e.code === 'KeyD' || e.code === 'ArrowRight') {
			camera.translateX(movement)
		}
		if (e.code === 'KeyS' || e.code === 'ArrowDown') {
			camera.translateZ(movement)
		}
		if (e.code === 'KeyW' || e.code === 'ArrowUp') {
			camera.translateZ(-movement)
		}
	}

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return <></>
}
