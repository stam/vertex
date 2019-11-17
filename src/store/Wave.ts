import { observable } from "mobx";
import { Renderer } from "../renderer";

export class Wave {
  @observable frequency = 10;
  @observable amplitude = 5;

  _renderer?: Renderer;

  get value() {
    if (!this._renderer) {
      return 0;
    }
    return (
      this.amplitude *
      Math.sin(2 * Math.PI * this.frequency + this._renderer.frame)
    );
  }
}

export class WaveStore {
  @observable waves = [new Wave()];
}

const waveStore = new WaveStore();
export default waveStore;
