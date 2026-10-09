import React, { useEffect, useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import GameScene from './GameScene'
import useGameStore from '../store/useGameStore'
import { audio } from './AudioEngine'

export default function ConsoleShell() {
  const containerRef = useRef()
  const store = useGameStore()
  
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let isDragging = false
    let rotX = 0
    let rotY = 0

    const handleMouseDown = (e) => {
      // Prevent drag if clicking on buttons
      if (e.target.closest('.d-btn') || e.target.closest('.a-btn') || e.target.closest('.controls-grid')) return
      isDragging = true
      document.body.style.cursor = 'grabbing'
      container.style.transition = 'none' // Rigid while dragging
    }

    const handleMouseMove = (e) => {
      if (!isDragging) return
      
      rotY += e.movementX * 0.4
      rotX -= e.movementY * 0.4
      
      // Clamp rotation
      rotX = Math.max(-35, Math.min(35, rotX))
      rotY = Math.max(-35, Math.min(35, rotY))
      
      container.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`
    }

    const handleMouseUp = () => {
      if (!isDragging) return
      isDragging = false
      document.body.style.cursor = 'default'
      
      // Smooth snap back
      rotX = 0
      rotY = 0
      container.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
      container.style.transform = `rotateX(0deg) rotateY(0deg)`
    }

    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  useEffect(() => {
    let lastTime = performance.now()
    let frameId
    const loop = (time) => {
      const dt = (time - lastTime) / 1000
      lastTime = time
      store.tick(dt)
      frameId = requestAnimationFrame(loop)
    }
    if (store.hasBooted) {
      frameId = requestAnimationFrame(loop)
    }
    return () => cancelAnimationFrame(frameId)
  }, [store.hasBooted])

  // Anomaly spawning
  useEffect(() => {
    if (!store.hasBooted || !store.isAlive || store.isSleeping) return
    const interval = setInterval(() => {
      if (Math.random() < 0.05 && store.anomalyCount < 5) {
        store.spawnAnomaly()
      }
    }, 5000)
    return () => clearInterval(interval)
  }, [store.hasBooted, store.isAlive, store.isSleeping, store.anomalyCount])

  const handleBoot = () => {
    if (store.hasBooted) return
    audio.sfxBoot()
    store.boot()
  }

  const anomalies = Array.from({ length: store.anomalyCount }).map((_, i) => (
    <div key={i} className="anomaly" style={{ left: `${20 + Math.random() * 60}%`, top: `${40 + Math.random() * 40}%` }}>x_x</div>
  ))

  return (
    <div id="console-container" ref={containerRef}>
      <div className="console-shell">
        
        <div className="flex justify-between items-center mb-2 px-1">
          <div className="text-[10px] font-bold text-[var(--red)] tracking-wider flex items-center gap-1">
            PWR <span className={`inline-block w-2 h-2 rounded-full ${store.hasBooted ? 'bg-[var(--green)] shadow-[0_0_5px_var(--green)]' : 'bg-[var(--red)] shadow-[0_0_5px_var(--red)]'}`}></span>
          </div>
          <div className="text-xs font-bold text-gray-500 tracking-widest italic">NEKO-BOY COLOR</div>
        </div>

        <div className="screen-bezel">
          <div className="text-[10px] text-gray-500 mb-1 flex justify-between">
            <span>LVL <span className="text-[var(--lavender)]">{store.level}</span></span>
            <span>COIN <span className="text-[var(--yellow)]">{store.coins}</span></span>
          </div>
          
          <div className="screen-display">
            {!store.hasBooted && (
              <div id="boot-screen">
                <div className="boot-logo" style={{ opacity: 1, transform: 'translateY(0)' }}>NEKO<br/>STUDIOS</div>
              </div>
            )}
            
            <div id="canvas-container">
              {store.hasBooted && (
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
                  <GameScene />
                </Canvas>
              )}
            </div>
            
            <div className="scanline"></div>
            <div className="absolute inset-0 z-5 pointer-events-none">{anomalies}</div>

            <div className="ui-layer">
              <div className="text-[10px] font-bold text-center bg-black/50 px-2 py-1 rounded inline-block self-center backdrop-blur-sm" style={{ color: store.statusColor }}>
                {store.statusText}
              </div>
              
              {!store.isAlive && (
                <div className="flex flex-col justify-center items-center h-full pointer-events-auto bg-[#11111b]/90 backdrop-blur-md rounded">
                  <div className="text-[var(--red)] text-sm tracking-widest font-bold mb-4">GAME OVER</div>
                  <button onClick={() => store.revive()} className="a-btn bg-[var(--red)] w-auto px-4 rounded-full">RESTART</button>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mb-6 text-[9px] font-bold tracking-wider px-2">
          <div>
            <div className="flex justify-between mb-1"><span className="text-[var(--green)]">HNG</span><span>{Math.round(store.hunger)}</span></div>
            <div className="bar-container"><div className="bar-fill bg-[var(--green)]" style={{ transform: `scaleX(${Math.max(0, store.hunger)/100})` }}></div></div>
          </div>
          <div>
            <div className="flex justify-between mb-1"><span className="text-[var(--blue)]">HAP</span><span>{Math.round(store.happiness)}</span></div>
            <div className="bar-container"><div className="bar-fill bg-[var(--blue)]" style={{ transform: `scaleX(${Math.max(0, store.happiness)/100})` }}></div></div>
          </div>
          <div>
            <div className="flex justify-between mb-1"><span className="text-[var(--yellow)]">ENG</span><span>{Math.round(store.energy)}</span></div>
            <div className="bar-container"><div className="bar-fill bg-[var(--yellow)]" style={{ transform: `scaleX(${Math.max(0, store.energy)/100})` }}></div></div>
          </div>
        </div>

        <div className="controls-grid">
          <div className="d-pad">
            <div className="d-center"></div>
            <div className="d-btn d-top" onClick={() => { store.clean(); audio.sfxClean(); }} title="Clean (Up)"></div>
            <div className="d-btn d-bottom" onClick={() => { store.sleep(); audio.sfxSleep(); }} title="Sleep (Down)"></div>
            <div className="d-btn d-left"></div>
            <div className="d-btn d-right"></div>
          </div>
          <div className="action-btns">
            <button className="a-btn bg-[var(--green)]" style={{ marginTop: '20px' }} onClick={() => { store.feed(); if(store.coins>=10 && !store.isSleeping && store.isAlive) audio.sfxFeed(); else if(store.isAlive && !store.isSleeping) audio.sfxError(); }}>FEED<br/>-10</button>
            <button className="a-btn bg-[var(--blue)]" style={{ marginBottom: '20px' }} onClick={() => { store.play(); if(store.energy>=20 && !store.isSleeping && store.isAlive) audio.sfxPlay(); else if(store.isAlive && !store.isSleeping) audio.sfxError(); }}>PLAY<br/>+5</button>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4 text-[8px] text-gray-500 font-bold">
          <div className="flex flex-col items-center"><div className="w-8 h-2 bg-gray-700 rounded-full mb-1"></div>SELECT</div>
          <div className="flex flex-col items-center cursor-pointer hover:text-gray-300" onClick={handleBoot}><div className="w-8 h-2 bg-gray-700 hover:bg-gray-500 rounded-full mb-1"></div>START</div>
        </div>
      </div>
    </div>
  )
}
