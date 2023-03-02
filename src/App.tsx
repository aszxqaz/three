import { OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { CameraController } from './components/CameraController'
import { HUD } from './components/HUD'
import { Screen } from './components/Screen'

function App() {
	return (
		<>
			<Canvas
				style={{ display: 'flex', width: '100%', height: '100vh', cursor: 'grab' }}
				camera={{
					fov: 75,
					position: [0, 20, 50],
				}}>
				<OrbitControls
					minPolarAngle={0.7}
					maxPolarAngle={1.3}
					minAzimuthAngle={-0.4}
					maxAzimuthAngle={0.4}
					zoomSpeed={0.5}
					rotateSpeed={0.5}
					enableDamping={false}
				/>
				<directionalLight />
				<ambientLight />
				<Screen />
				<CameraController />
			</Canvas>
			<HUD />
		</>
	)
}

export default App
