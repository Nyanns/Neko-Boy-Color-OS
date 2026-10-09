class SynthEngine {
    constructor() { this.ctx = new (window.AudioContext || window.webkitAudioContext)(); }
    playTone(freq, type, duration, vol=0.1, delay=0) {
        setTimeout(() => {
            if(this.ctx.state === 'suspended') this.ctx.resume();
            const osc = this.ctx.createOscillator(), gain = this.ctx.createGain();
            osc.type = type; osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
            gain.gain.setValueAtTime(vol, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + duration);
            osc.connect(gain); gain.connect(this.ctx.destination);
            osc.start(); osc.stop(this.ctx.currentTime + duration);
        }, delay);
    }
    sfxBoot() { this.playTone(1046.50, 'square', 0.2, 0.1, 0); this.playTone(1318.51, 'square', 0.4, 0.1, 200); }
    sfxFeed() { [400, 600, 800].forEach((f, i) => this.playTone(f, 'square', 0.1, 0.1, i*100)); }
    sfxPlay() { this.playTone(880, 'sine', 0.1, 0.1, 0); this.playTone(1200, 'sine', 0.2, 0.1, 100); }
    sfxSleep() { this.playTone(200, 'triangle', 0.5, 0.05, 0); this.playTone(150, 'triangle', 0.8, 0.05, 500); }
    sfxClean() { this.playTone(1500, 'sine', 0.1, 0.05, 0); this.playTone(2000, 'sine', 0.1, 0.05, 100); }
    sfxError() { this.playTone(150, 'sawtooth', 0.3, 0.1, 0); }
    sfxDie() { [300, 200, 100].forEach((f, i) => this.playTone(f, 'sawtooth', 0.4, 0.2, i*200)); }
    sfxLevelUp() { [440, 554, 659, 880].forEach((f, i) => this.playTone(f, 'square', 0.15, 0.1, i*150)); }
}
