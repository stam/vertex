import { ValueInput } from "../store/Wave";
import { Mesh } from "../store/Mesh";

let _input: ValueInput;

export const registerDrag = (model: ValueInput) => {
  _input = model;
};

export const registerDrop = (target: Mesh, prop: string) => {
  if (!_input) {
    return;
  }

  // @ts-ignore
  target.setInput(_input, prop);
};
