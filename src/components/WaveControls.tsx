import React from "react";
import { Wave } from "../store/Output";
import Slider from "./Slider";
import { registerDrag } from "../behavior/dragHandler";

interface WaveProps {
  model: Wave;
}

const WaveControls: React.FC<WaveProps> = props => {
  const { model } = props;

  const handleDragStart = () => {
    registerDrag(model);
  };

  return (
    <div className="wave controls">
      Wave
      <Slider model={model} prop="frequency" label="f" from={0} to={20} />
      <Slider model={model} prop="amplitude" label="A" from={0} to={10} />
      <span
        className="dot"
        style={{ background: model.color }}
        onDragStart={handleDragStart}
        draggable
      />
    </div>
  );
};

export default WaveControls;
