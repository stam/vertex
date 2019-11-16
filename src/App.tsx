import React, { useState } from "react";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

const App: React.FC = () => {
  const [timestamp, setTimestamp] = useState(new Date().getTime());
  const [bpm, setBpm] = useState(144);

  return <main className="App">
    <Canvas />
    <Controls timestamp={timestamp} bpm={bpm} setTimestamp={setTimestamp} setBpm={setBpm} />
  </main>;
};

export default App;
