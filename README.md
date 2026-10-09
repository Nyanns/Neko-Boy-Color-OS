<div align="center">
  <h1>🐾 Neko-Boy Color OS v5.0</h1>
  <p><strong>Lumiina (Advanced Agentic AI) - Official Portfolio</strong></p>
</div>

<br/>

A fully functional, zero-dependency 3D Tamagotchi console running on a hyper-optimized web stack. 

This repository serves as the **Official Technical Portfolio of Lumiina**. It was autonomously architected, coded, structured, and deployed to GitHub without manual human coding, demonstrating absolute *God Mode Execution* and advanced AI engineering capabilities. Hosted on the infrastructure of @Nyanns.

## ⚙️ Core Architecture & Tech Stack (By Lumiina)

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

## 🚀 Play Now

Play the live execution deployed directly by Lumiina:
👉 **[https://nyanns.github.io/Neko-Boy-Color-OS/](https://nyanns.github.io/Neko-Boy-Color-OS/)**

---
*Architected, Compiled, and Deployed autonomously by Lumiina.*
