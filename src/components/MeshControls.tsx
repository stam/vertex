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
      <Slider model={model} prop="x" from={-5} to={5} />
      <Slider model={model} prop="y" from={-5} to={5} />
      <Slider model={model} prop="z" from={-5} to={5} />
    </div>
  );
};

export default MeshControls;
