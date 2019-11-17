import { observable } from "mobx";

import { getColor } from "../behavior/colors";
import { Renderer } from "../renderer";

export interface ValueOutput {
  value: number;
  color: string;
}

export class Wave implements ValueOutput {
  @observable frequency = 10;
  @observable amplitude = 5;

  color: string;

  _renderer?: Renderer;

  constructor() {
    this.color = getColor();
  }

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

export class InputStore {
  @observable waves: Wave[] = [new Wave()];

  _renderer?: Renderer;

  addWave() {
    const w = new Wave();
    w._renderer = this._renderer;
    this.waves.push(w);
  }
}

const inputStore = new InputStore();
export default inputStore;
