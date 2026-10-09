import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import useGameStore from '../store/useGameStore'

export default function GameScene() {
  const catRef = useRef()
  const pointer = useRef({ x: 0, y: 0 })
  
  const isSleeping = useGameStore(state => state.isSleeping)
  const isAlive = useGameStore(state => state.isAlive)
  const hunger = useGameStore(state => state.hunger)
  const happiness = useGameStore(state => state.happiness)
  const anomalyCount = useGameStore(state => state.anomalyCount)

  // Color logic
  let bodyColor = 0xcdd6f4
  let eyeScale = [1, 1, 1]
  if (!isAlive) {
    bodyColor = 0xf38ba8
    eyeScale = [1, 0.1, 1]
  } else if (isSleeping) {
    bodyColor = 0x585b70
    eyeScale = [1, 0.1, 1]
  } else if (hunger < 30 || happiness < 30 || anomalyCount > 2) {
    bodyColor = 0xa6adc8
    eyeScale = [1.5, 1.5, 1]
  }

  useFrame((state) => {
    if (!catRef.current) return
    const time = state.clock.getElapsedTime()
    
    // Simulate pointer tracking since r3f useFrame pointer is normalized
    let targetRotY = 0
    let targetRotX = 0
    
    if (!isSleeping && isAlive) {
      targetRotY = (state.pointer.x * 1.2) + (Math.sin(time * 2) * 0.05)
      targetRotX = (-state.pointer.y * 0.8) + (Math.cos(time * 1.5) * 0.05)
      catRef.current.position.y = Math.sin(time * 3) * 0.05
    } else {
      catRef.current.position.y = Math.sin(time) * 0.05 - 0.2
      targetRotY = 0
      targetRotX = 0.3
    }
    
    catRef.current.rotation.y += (targetRotY - catRef.current.rotation.y) * 0.15
    catRef.current.rotation.x += (targetRotX - catRef.current.rotation.x) * 0.15
  })

  return (
    <>
      <ambientLight intensity={0.7} />
      <directionalLight position={[2, 5, 3]} intensity={0.8} />
      
      <group ref={catRef}>
        {/* Head */}
        <mesh>
          <boxGeometry args={[1.5, 1.2, 1.5]} />
          <meshLambertMaterial color={bodyColor} />
        </mesh>
        
        {/* Ears */}
        <mesh position={[-0.5, 0.8, 0]} rotation={[0, 0, 0.2]}>
          <coneGeometry args={[0.3, 0.6, 4]} />
          <meshLambertMaterial color={0xf38ba8} />
        </mesh>
        <mesh position={[0.5, 0.8, 0]} rotation={[0, 0, -0.2]}>
          <coneGeometry args={[0.3, 0.6, 4]} />
          <meshLambertMaterial color={0xf38ba8} />
        </mesh>

        {/* Eyes */}
        <mesh position={[-0.4, 0.1, 0.76]} scale={eyeScale}>
          <boxGeometry args={[0.2, 0.2, 0.1]} />
          <meshBasicMaterial color={0x11111b} />
        </mesh>
        <mesh position={[0.4, 0.1, 0.76]} scale={eyeScale}>
          <boxGeometry args={[0.2, 0.2, 0.1]} />
          <meshBasicMaterial color={0x11111b} />
        </mesh>

        {/* Mouth */}
        <mesh position={[0, -0.2, 0.76]}>
          <boxGeometry args={[0.3, 0.1, 0.1]} />
          <meshBasicMaterial color={0x11111b} />
        </mesh>
      </group>
    </>
  )
}
