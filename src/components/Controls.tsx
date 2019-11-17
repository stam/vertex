import React, { useState } from "react";
import Beat from "./BeatControls";
import MeshControls from "./MeshControls";
import WaveControls from "./WaveControls";
import { observer } from "mobx-react";
import meshStore from "../store/Mesh";
import inputStore from "../store/Output";

const Controls = observer(() => {
  const [m] = useState(meshStore);
  const [w] = useState(inputStore);

  const addWave = () => {
    inputStore.addWave();
  };

  const addMesh = () => {
    meshStore.addMesh();
  };

  return (
    <aside>
      <div></div>
      <div>
        <h1>vertex</h1>
        <Beat />
      </div>
      <div className="inputControls">
        <u onClick={addWave}>+ wave</u>
        {w.waves.map((wave, i) => (
          <WaveControls key={`wave-${i}`} model={wave} />
        ))}
      </div>
      <div className="meshControls">
        <u onClick={addMesh}>+ mesh</u>
        {m.meshes.map((mesh, i) => (
          <MeshControls key={`mesh-${i}`} model={mesh} />
        ))}
      </div>
    </aside>
  );
});

export default Controls;
