import React from "react";
import Renderer from "./components/Renderer";
import Controls from "./components/Controls";

const App: React.FC = () => {
  return <main className="App">
    <Renderer />
    <Controls />
  </main>;
};

export default App;
