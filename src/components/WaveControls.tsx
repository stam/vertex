import React from "react";
import { Wave } from "../store/Wave";
import Slider from "./Slider";

interface WaveProps {
  model: Wave;
}

const WaveControls: React.FC<WaveProps> = props => {
  const { model } = props;
  return (
    <div className="wave controls">
      Wave
      <Slider model={model} prop="frequency" label="f" from={0} to={20} />
      <Slider model={model} prop="amplitude" label="A" from={0} to={10} />
    </div>
  );
};

export default WaveControls;
