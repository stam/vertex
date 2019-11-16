import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

const App: React.FC = () => {
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const [bpm, setBpm] = useState(133);
  const [beat, setBeat] = useState(0);


  return <main className="App">
    <Canvas timestamp={timestamp} bpm={bpm} beat={beat} />
    <Controls beat={beat} setBeat={setBeat} timestamp={timestamp} bpm={bpm} setTimestamp={setTimestamp} setBpm={setBpm} />
  </main>;
};

export default App;
