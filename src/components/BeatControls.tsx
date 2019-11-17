import React, { useState, useEffect } from "react";
import renderer from "../renderer";

const COUNT = 4;

let taps: number[] = [];
// eslint-disable-next-line
let clearTapTimeout;

const calculateBpm = (beats: number[]) => {
  if (beats.length === 1) {
    return;
  }

  const firstTap = beats[0];
  const lastTap = beats[beats.length - 1];

  const res = 60000 / ((lastTap - firstTap) / (beats.length - 1));
  return res;
};

let clearActiveTimer: NodeJS.Timeout;

const Controls: React.FC = () => {
  // const [timestamp, setTimestamp] = useState(new Date().getTime());
  const [bpm, setBpm] = useState(60);
  const [beat, setBeat] = useState(0);

  const offset = 60000 / bpm;

  const createTicker = () => {
    clearActiveTimer = setTimeout(() => {
      setBeat((beat + 1) % COUNT);
    }, offset);
  };
  createTicker();

  const reset = () => {
    setBeat(0);
    clearTimeout(clearActiveTimer);
  };

  const handleClick = (e: React.MouseEvent) => {
    taps.push(e.timeStamp);
    // setTimestamp(e.timeStamp);
    reset();

    const calculatedBpm = calculateBpm(taps);

    if (calculatedBpm) {
      setBpm(calculatedBpm);
    }

    clearTapTimeout = setTimeout(() => (taps = []), 900);
  };

  useEffect(() => {
    renderer.updateBeat(beat);
  }, [beat]);

  return (
    <div className="bpm">
      <p>{Math.round(bpm)} bpm</p>
      <div className="beat" onMouseDown={handleClick}>
        <span className={beat === 0 ? "active" : ""} />
        <span className={beat === 1 ? "active" : ""} />
        <span className={beat === 3 ? "active" : ""} />
        <span className={beat === 2 ? "active" : ""} />
      </div>
    </div>
  );
};

export default Controls;
