import React from "react";
import { observer } from "mobx-react";
import Canvas from "./components/Canvas";
import Controls from "./components/Controls";

const App: React.FC = observer(() => {
  return (
    <main className="App">
      <Canvas />
      <Controls />
    </main>
  );
});

export default App;
