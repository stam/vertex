import React, { useRef, useState } from "react";
import { observer } from "mobx-react";

interface SliderProps {
  model: any;
  prop: string;
  from: number;
  to: number;
}

const SCREEN_RANGE = 25;

const screenToValue = (
  screen: number,
  range: number,
  to: number,
  from: number
) => {
  const relativeValue = screen * (range / SCREEN_RANGE);
  return Math.max(Math.min(relativeValue + from, to), from);
};
// 0 to 25px

const Slider: React.FC<SliderProps> = observer(props => {
  const { model, prop, from, to } = props;

  const sliderRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState(false);
  const value = model[prop];

  const range = to - from;
  const top = (value - from) * (SCREEN_RANGE / range);

  const handleMouseDown = () => {
    setDragging(true);
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!sliderRef.current) {
      return;
    }
    setDragging(false);

    const top = e.clientY - sliderRef.current.getBoundingClientRect().top;
    model[prop] = screenToValue(top, range, to, from);
  };

  const handleDragStart = (e: any) => {
    if (!dragging || !sliderRef.current) {
      return;
    }
    // const z = sliderRef.current.getBoundingClientRect();
    const top = e.clientY - sliderRef.current.getBoundingClientRect().top;
    model[prop] = screenToValue(top, range, to, from);
  };

  return (
    <div className="slider">
      <div
        className="range"
        ref={sliderRef}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleDragStart}
      >
        <div className="handle" style={{ top }} />
      </div>
      <span className="prop">{prop}</span>
    </div>
  );
});

export default Slider;
