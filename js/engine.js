class TamagotchiEngine {
    constructor() {
        this.audio = new SynthEngine();
        this.gfx = new Graphics3D('canvas-container');
        this.state = this.getDefaultState();
        this.dom = {
            hBar: document.getElementById('bar-hunger'), hpBar: document.getElementById('bar-happiness'),
            eBar: document.getElementById('bar-energy'), stat: document.getElementById('status-text'),
            death: document.getElementById('death-overlay'), anomalyCont: document.getElementById('anomaly-container'),
            boot: document.getElementById('boot-screen'), bootLogo: document.getElementById('boot-logo')
        };
        
        this.hasBooted = false;
        this.lastTick = performance.now();
        this.anomalyTimer = 0;
    }

    getDefaultState() {
        return { hunger: 100, happiness: 100, energy: 100, isAlive: true, isSleeping: false, xp: 0, level: 1, coins: 50, anomalyCount: 0 };
    }

    bootSequence() {
        if(this.hasBooted) return;
        this.hasBooted = true;
        
        this.dom.bootLogo.style.transition = "all 1s ease";
        this.dom.bootLogo.style.opacity = 1;
        this.dom.bootLogo.style.transform = "translateY(0)";
        this.audio.sfxBoot();

        setTimeout(() => {
            this.dom.boot.style.transition = "opacity 0.5s ease";
            this.dom.boot.style.opacity = 0;
            setTimeout(() => {
                this.dom.boot.style.display = 'none';
                this.frameId = requestAnimationFrame((t) => this.tick(t));
            }, 500);
        }, 2500);
    }

    updateUI() {
        this.dom.hBar.style.transform = `scaleX(${Math.max(0, this.state.hunger)/100})`;
        this.dom.hpBar.style.transform = `scaleX(${Math.max(0, this.state.happiness)/100})`;
        this.dom.eBar.style.transform = `scaleX(${Math.max(0, this.state.energy)/100})`;

        document.getElementById('val-hunger').innerText = Math.round(this.state.hunger);
        document.getElementById('val-happiness').innerText = Math.round(this.state.happiness);
        document.getElementById('val-energy').innerText = Math.round(this.state.energy);
        document.getElementById('val-lvl').innerText = this.state.level;
        document.getElementById('val-coins').innerText = this.state.coins;
    }

    tick(time) {
        const dt = (time - this.lastTick) / 1000;
        this.lastTick = time;

        if (this.state.isAlive) {
            let drainMult = 1 + (this.state.anomalyCount * 0.5); 
            
            if (this.state.isSleeping) {
                this.state.energy = Math.min(100, this.state.energy + (5 * dt));
                this.state.hunger -= (0.2 * drainMult) * dt;
            } else {
                this.state.hunger -= (0.5 * drainMult) * dt; 
                this.state.happiness -= (0.4 * drainMult) * dt; 
                this.state.energy -= 0.2 * dt;
            }

            this.addXp(1 * dt);

            if(!this.state.isSleeping) {
                this.anomalyTimer += dt;
                if(this.anomalyTimer > 5 && Math.random() < 0.01 && this.state.anomalyCount < 5) {
                    this.spawnAnomaly();
                    this.anomalyTimer = 0;
                }
            }

            if (this.state.hunger <= 0 || this.state.happiness <= 0) this.kill();
            else this.updateStatus();
        }

        this.updateUI();
        this.gfx.render(time / 1000);
        this.frameId = requestAnimationFrame((t) => this.tick(t));
    }

    addXp(amount) {
        this.state.xp += amount;
        const nextLevelReq = this.state.level * 100;
        if(this.state.xp >= nextLevelReq) {
            this.state.xp = 0;
            this.state.level++;
            this.audio.sfxLevelUp();
            this.dom.stat.innerText = `LEVEL UP! (${this.state.level})`;
        }
    }

    spawnAnomaly() {
        this.state.anomalyCount++;
        const anomaly = document.createElement('div');
        anomaly.className = 'anomaly';
        anomaly.innerText = 'x_x';
        anomaly.style.left = (20 + Math.random() * 60) + '%';
        anomaly.style.top = (40 + Math.random() * 40) + '%';
        this.dom.anomalyCont.appendChild(anomaly);
    }

    clean() {
        if(!this.state.isAlive || this.state.anomalyCount === 0) return;
        this.audio.sfxClean();
        this.state.anomalyCount = 0;
        this.dom.anomalyCont.innerHTML = '';
        this.state.happiness = Math.min(100, this.state.happiness + 10);
        this.dom.stat.innerText = "ALL CLEAN!";
    }

    updateStatus() {
        if(this.state.isSleeping) { this.dom.stat.innerText = "Zzz..."; this.dom.stat.style.color = 'var(--yellow)'; }
        else if(this.state.anomalyCount > 0) { this.dom.stat.innerText = "SMELLY!"; this.dom.stat.style.color = 'var(--red)'; }
        else if(this.state.hunger < 30) { this.dom.stat.innerText = "STARVING"; this.dom.stat.style.color = 'var(--red)'; }
        else if(this.state.happiness < 30) { this.dom.stat.innerText = "SAD"; this.dom.stat.style.color = 'var(--red)'; }
        else { this.dom.stat.innerText = "SYSTEM NORMAL"; this.dom.stat.style.color = 'var(--green)'; }
        this.gfx.setState(this.state, false);
    }

    feed() {
        if (!this.state.isAlive || this.state.isSleeping) return;
        if (this.state.coins < 10) { this.audio.sfxError(); this.dom.stat.innerText = "NOT ENOUGH COINS"; return; }
        this.state.coins -= 10;
        this.state.hunger = Math.min(100, this.state.hunger + 40);
        this.addXp(15);
        this.audio.sfxFeed(); this.dom.stat.innerText = "NOM NOM"; this.gfx.targetScale = 1.15;
        setTimeout(() => this.gfx.targetScale = 1, 150);
    }

    play() {
        if (!this.state.isAlive || this.state.isSleeping) return;
        if (this.state.energy < 20) { this.audio.sfxError(); this.dom.stat.innerText = "TOO TIRED"; return; }
        this.state.happiness = Math.min(100, this.state.happiness + 30);
        this.state.energy -= 20; 
        this.state.coins += 5;
        this.addXp(25);
        this.audio.sfxPlay(); this.dom.stat.innerText = "SPINNING!";
        this.gfx.setState(this.state, true);
    }

    sleep() {
        if (!this.state.isAlive) return;
        this.state.isSleeping = !this.state.isSleeping; 
        if(this.state.isSleeping) this.audio.sfxSleep();
    }

    kill() {
        this.state.isAlive = false; this.audio.sfxDie(); this.gfx.setState(this.state);
        this.dom.death.classList.remove('hidden'); this.dom.death.classList.add('flex');
    }

    revive() {
        this.state = this.getDefaultState();
        this.dom.anomalyCont.innerHTML = '';
        this.dom.death.classList.add('hidden'); this.dom.death.classList.remove('flex');
    }
}
