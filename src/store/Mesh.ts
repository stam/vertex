import * as Three from "three";
import { observable, autorun, IReactionDisposer } from "mobx";
import { Renderer } from "../renderer";
import { ValueOutput } from "./Output";

type AdjustableProp = "x" | "y" | "z" | "hue" | "saturation" | "lightness";

export interface LinkedInput {
  dispose: IReactionDisposer;
  value: ValueOutput;
}

export class Mesh {
  @observable hue = 1;
  @observable saturation = 0.9;
  @observable lightness = 0.5;

  @observable x = 0;
  @observable y = 0;
  @observable z = 0;

  @observable _inputDisposers: { [key: string]: LinkedInput } = {};
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
      this._instance.position.y = this.y;
      this._instance.position.z = this.z;
    });

    autorun(() => {
      if (!this._instance) {
        return;
      }

      if (this._instance.material instanceof Array) {
        return;
      }

      const color = new Three.Color();
      color.setHSL(this.hue, this.saturation, this.lightness);
      const m = new Three.MeshBasicMaterial({ color });
      this._instance.material = m;
    });
  }

  setInput(input: ValueOutput, prop: AdjustableProp) {
    if (this._inputDisposers[prop]) {
      this._inputDisposers[prop].dispose();
    }

    this._inputDisposers[prop] = {
      dispose: autorun(() => {
        this[prop] = input.value;
      }),
      value: input
    };
  }

  removeInput(prop: AdjustableProp) {
    if (!this._inputDisposers[prop]) {
      return;
    }

    this._inputDisposers[prop].dispose();
    delete this._inputDisposers[prop];
  }
}

export class MeshStore {
  @observable meshes = [new Mesh()];

  _renderer?: Renderer;

  addMesh() {
    if (!this._renderer) {
      return;
    }
    const mesh = new Mesh();
    this._renderer.initMesh(mesh);
    this.meshes.push(mesh);
  }
}

const meshStore = new MeshStore();

export default meshStore;
