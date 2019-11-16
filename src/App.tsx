import React from "react";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

const App: React.FC = () => {
  return <main className="App">
    <Canvas />
    <Controls />
  </main>;
};

export default App;
