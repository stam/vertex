import React, { useEffect, useRef } from "react";
import Renderer from "../renderer";

interface CanvasProps {
  timestamp: number;
  bpm: number;
  beat: number;
}

let renderer: Renderer;

const Canvas: React.FC<CanvasProps> = ({ timestamp, bpm, beat }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (renderer) {
      renderer.updateSync(timestamp, bpm);
    }
  }, [timestamp, bpm])

  useEffect(() => {
    if (renderer) {
      renderer.updateBeat(beat);
    }
  }, [beat])


  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    renderer = new Renderer(canvasRef.current);
  }, [canvasRef]);
  return <canvas ref={canvasRef} className="main" />
};

export default Canvas;
