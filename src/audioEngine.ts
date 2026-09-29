class BioSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private oscs: OscillatorNode[] = [];

  public start() {
    if (this.isPlaying) return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.08, this.ctx.currentTime + 1.2);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(650, this.ctx.currentTime);
      filter.Q.setValueAtTime(3.5, this.ctx.currentTime);

      this.masterGain.connect(filter);
      filter.connect(this.ctx.destination);

      // Ambient lo-fi chord
      const freqs = [164.81, 196.0, 246.94, 293.66, 369.99];
      this.oscs = freqs.map((f, i) => {
        const osc = this.ctx!.createOscillator();
        osc.type = i % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, this.ctx!.currentTime);

        const pan = this.ctx!.createStereoPanner();
        pan.pan.value = (i - 2) * 0.35;
        osc.connect(pan);
        pan.connect(this.masterGain!);

        osc.start();
        return osc;
      });

      this.isPlaying = true;
    } catch {
      // AudioContext blocked
    }
  }

  public stop() {
    if (!this.isPlaying || !this.ctx || !this.masterGain) return;
    try {
      this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, this.ctx.currentTime);
      this.masterGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.4);
      setTimeout(() => {
        this.oscs.forEach((o) => {
          try {
            o.stop();
            o.disconnect();
          } catch {
            // ignore
          }
        });
        this.oscs = [];
        this.isPlaying = false;
      }, 450);
    } catch {
      this.isPlaying = false;
    }
  }

  public setVolume(val: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0.0001, Math.min(0.25, val * 0.15));
      this.masterGain.gain.setValueAtTime(clamped, this.ctx.currentTime);
    }
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public getPlaying(): boolean {
    return this.isPlaying;
  }
}

export const soundEngine = new BioSoundEngine();
