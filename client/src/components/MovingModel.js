import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Suspense } from 'react'
import Cat from './Cat'

const MovingModel = () => {
  return (
    <Canvas className='canvas' style={{ height: '15rem' }}>
      <OrbitControls enableZoom={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[-2, 5, 2]} />
      <Suspense fallback={null}>
        <Cat />
      </Suspense>
    </Canvas>
  )
}

export default MovingModel
