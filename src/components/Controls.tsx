import React, { useState } from "react";
import Beat from "./BeatControls";
import MeshControls from "./MeshControls";
import { observer } from "mobx-react";
import meshStore from "../store/Mesh";

const Controls = observer(() => {
  const [store] = useState(meshStore);

  return (
    <aside>
      <h1>vertex</h1>
      <Beat />
      {store.meshes.map((mesh, i) => (
        <MeshControls key={i} model={mesh} />
      ))}
    </aside>
  );
});

export default Controls;
