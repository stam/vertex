import React, { useRef, useState } from "react";
import { observer } from "mobx-react";
import { registerDrop } from "../behavior/dragHandler";
import { LinkedInput } from "../store/Mesh";

interface SliderProps {
  model: any;
  prop: string;
  from: number;
  to: number;
  droppable?: boolean;
  label?: string;
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
  const { model, prop, from, to, label, droppable = false } = props;

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

  const handleDrop = (e: React.DragEvent) => {
    registerDrop(model, prop);
  };

  const link: LinkedInput =
    model._inputDisposers && model._inputDisposers[prop];

  const linkStyle = link ? { background: link.value.color } : undefined;

  const handleUnlink = () => {
    if (!link) {
      return;
    }
    model.removeInput(prop);
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
      <span
        className={`${droppable && "droppable"} ${link && "linked"} prop`}
        style={linkStyle}
        onClick={handleUnlink}
        onDragOver={e => e.preventDefault()}
        onDrop={handleDrop}
      >
        {label || prop}
      </span>
    </div>
  );
});

export default Slider;
