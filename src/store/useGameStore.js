import { create } from 'zustand';

const useGameStore = create((set, get) => ({
  hunger: 100,
  happiness: 100,
  energy: 100,
  isAlive: true,
  isSleeping: false,
  xp: 0,
  level: 1,
  coins: 50,
  anomalyCount: 0,
  hasBooted: false,
  statusText: 'SYSTEM STANDBY',
  statusColor: 'var(--green)',

  boot: () => set({ hasBooted: true }),
  
  sleep: () => set((state) => ({ isSleeping: !state.isSleeping })),
  
  feed: () => set((state) => {
    if (!state.isAlive || state.isSleeping || state.coins < 10) return state;
    let newXp = state.xp + 15;
    let newLevel = state.level;
    if (newXp >= newLevel * 100) { newXp = 0; newLevel++; }
    return {
      coins: state.coins - 10,
      hunger: Math.min(100, state.hunger + 40),
      xp: newXp,
      level: newLevel,
    };
  }),

  play: () => set((state) => {
    if (!state.isAlive || state.isSleeping || state.energy < 20) return state;
    let newXp = state.xp + 25;
    let newLevel = state.level;
    if (newXp >= newLevel * 100) { newXp = 0; newLevel++; }
    return {
      happiness: Math.min(100, state.happiness + 30),
      energy: state.energy - 20,
      coins: state.coins + 5,
      xp: newXp,
      level: newLevel,
    };
  }),

  clean: () => set((state) => {
    if (!state.isAlive || state.anomalyCount === 0) return state;
    return {
      anomalyCount: 0,
      happiness: Math.min(100, state.happiness + 10)
    };
  }),

  revive: () => set({
    hunger: 100, happiness: 100, energy: 100, isAlive: true,
    isSleeping: false, anomalyCount: 0
  }),

  tick: (dt) => set((state) => {
    if (!state.isAlive || !state.hasBooted) return state;
    
    let drainMult = 1 + (state.anomalyCount * 0.5);
    let newHunger = state.hunger;
    let newHappiness = state.happiness;
    let newEnergy = state.energy;
    
    if (state.isSleeping) {
      newEnergy = Math.min(100, state.energy + (5 * dt));
      newHunger -= (0.2 * drainMult) * dt;
    } else {
      newHunger -= (0.5 * drainMult) * dt;
      newHappiness -= (0.4 * drainMult) * dt;
      newEnergy -= 0.2 * dt;
    }

    if (newHunger <= 0 || newHappiness <= 0) {
      return { hunger: newHunger, happiness: newHappiness, energy: newEnergy, isAlive: false, statusText: 'GAME OVER', statusColor: 'var(--red)' };
    }

    let statusText = "SYSTEM NORMAL";
    let statusColor = "var(--green)";
    if (state.isSleeping) { statusText = "Zzz..."; statusColor = "var(--yellow)"; }
    else if (state.anomalyCount > 0) { statusText = "SMELLY!"; statusColor = "var(--red)"; }
    else if (newHunger < 30) { statusText = "STARVING"; statusColor = "var(--red)"; }
    else if (newHappiness < 30) { statusText = "SAD"; statusColor = "var(--red)"; }

    return { hunger: newHunger, happiness: newHappiness, energy: newEnergy, statusText, statusColor };
  }),
  
  spawnAnomaly: () => set((state) => ({ anomalyCount: state.anomalyCount + 1 }))
}));

export default useGameStore;
