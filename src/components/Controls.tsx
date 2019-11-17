import React, { useState } from "react";
import Beat from "./BeatControls";
import MeshControls from "./MeshControls";
import WaveControls from "./WaveControls";
import { observer } from "mobx-react";
import meshStore from "../store/Mesh";
import waveStore from "../store/Wave";

const Controls = observer(() => {
  const [m] = useState(meshStore);
  const [w] = useState(waveStore);

  return (
    <aside>
      <h1>vertex</h1>
      <Beat />
      {w.waves.map((wave, i) => (
        <WaveControls key={`wave-${i}`} model={wave} />
      ))}
      {m.meshes.map((mesh, i) => (
        <MeshControls key={`mesh-${i}`} model={mesh} />
      ))}
    </aside>
  );
});

export default Controls;
