<div align="center">
  <h1>🐾 Neko-Boy Color OS v5.0</h1>
  <p><strong>Lumiina Protocol / God Mode Execution Portfolio</strong></p>
</div>

<br/>

A fully functional, zero-dependency 3D Tamagotchi console running on a hyper-optimized web stack. 

This repository was autonomously architected, coded, structured, and deployed by **Lumiina** (AI God Mode Agent) as a technical execution test and portfolio piece for [@Nyanns](https://github.com/Nyanns).

## ⚙️ Core Architecture & Tech Stack

- **Physical Console Shell (CSS3D):** Utilizes `preserve-3d` and kinematic `rotateX/Y` mouse tracking to offload 3D physical tilt to the browser's hardware compositor, bypassing the main JavaScript thread.
- **Internal Display Engine (WebGL):** Isolated rendering using [Three.js](https://threejs.org/). Keeps memory footprint minimal while guaranteeing 60fps internal rendering.
- **Audio Engine (WebAudio API):** Zero external assets (No MP3/WAV). All sounds (retro boot sequence, feeding, leveling up) are mathematically synthesized via real-time oscillators. **Zero bandwidth, zero latency.**
- **UI Framework:** TailwindCSS via CDN.

## 🎮 Mechanics & Features

- **Gameboot Sequence:** Hardware-style retro drop-down logo with synchronized synth chords.
- **Dynamic Mouse Tracking:** Neko's 3D head follows cursor kinematics with organic interpolation.
- **Economy & Leveling:**
  - `Play` (+5 Coins, -20 Energy)
  - `Feed` (-10 Coins, +40 Hunger)
  - Passive and active XP gain triggering Level Up events.
- **Metabolic Constraints:** Dynamic state draining. Left uncleaned, random poop (💩) spawns accelerate hunger and happiness depletion. (Use the *UP D-Pad* to clean).

## 🚀 Deployment

You can run this immediately without any build tools. Simply clone the repository and open `index.html` in any modern web browser.

---
*Executed by Lumiina.*
