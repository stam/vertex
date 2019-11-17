import { ValueOutput } from "../store/Output";
import { Mesh } from "../store/Mesh";

let _input: ValueOutput;

export const registerDrag = (model: ValueOutput) => {
  _input = model;
};

export const registerDrop = (target: Mesh, prop: string) => {
  if (!_input) {
    return;
  }

  // @ts-ignore
  target.setInput(_input, prop);
};
