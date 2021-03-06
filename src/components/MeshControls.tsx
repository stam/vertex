import React from "react";
import { Mesh } from "../store/Mesh";
import Slider from "./Slider";

interface MeshProps {
  model: Mesh;
}

const MeshControls: React.FC<MeshProps> = props => {
  const { model } = props;
  return (
    <div className="mesh controls">
      Mesh
      <Slider model={model} prop="x" from={-5} to={5} droppable />
      <Slider model={model} prop="y" from={-5} to={5} droppable />
      <Slider model={model} prop="z" from={-5} to={5} droppable />
      |
      <Slider model={model} prop="hue" from={0} to={1} label="h" droppable />
      <Slider
        model={model}
        prop="saturation"
        from={0}
        to={1}
        label="s"
        droppable
      />
      <Slider
        model={model}
        prop="lightness"
        from={0}
        to={1}
        label="l"
        droppable
      />
    </div>
  );
};

export default MeshControls;
