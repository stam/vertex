import React, { useEffect, useRef } from "react";
import Renderer from "../renderer";

const Canvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    new Renderer(canvasRef.current);
  }, [canvasRef]);
  return <canvas ref={canvasRef} className="main" />
};

export default Canvas;
