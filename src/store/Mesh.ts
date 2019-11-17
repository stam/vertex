import * as Three from "three";
import { observable, autorun, IReactionDisposer } from "mobx";
import { Renderer } from "../renderer";
import { ValueInput } from "./Wave";

type AdjustableProp = "x" | "y" | "z" | "hue" | "saturation" | "lightness";

export class Mesh {
  @observable hue = 0;
  @observable saturation = 0;
  @observable lightness = 0;

  @observable x = 0;
  @observable y = 0;
  @observable z = 0;

  _inputDisposers: { [key: string]: IReactionDisposer } = {};
  _instance?: Three.Mesh;
  _renderer?: Renderer;

  create(m: Three.Mesh, renderer: Renderer) {
    this._instance = m;
    this._renderer = renderer;

    autorun(() => {
      if (!this._instance) {
        return;
      }
      this._instance.position.x = this.x;
      this._instance.position.y = -this.y;
      this._instance.position.z = this.z;
    });
  }

  setInput(input: ValueInput, prop: AdjustableProp) {
    if (this._inputDisposers[prop]) {
      this._inputDisposers[prop]();
    }

    // this._input = input;
    // this._inputProp = prop;

    this._inputDisposers[prop] = autorun(() => {
      this[prop] = input.value;
    });
  }
}

export class MeshStore {
  @observable meshes = [new Mesh()];
}

const meshStore = new MeshStore();

export default meshStore;
