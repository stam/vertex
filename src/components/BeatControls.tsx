import React, { useState, useEffect, Fragment } from "react";
import renderer from "../renderer";

const COUNT = 4;

// interface ControlProps {
//   timestamp: number;
//   bpm: number;
//   setTimestamp: (timestamp: number) => void;
//   setBpm: (bpm: number) => void;
//   beat: number;
//   setBeat: (beat: number) => void;
// }

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

const Controls: React.FC = () => {
  // const [timestamp, setTimestamp] = useState(new Date().getTime());
  const [bpm, setBpm] = useState(60);
  const [beat, setBeat] = useState(0);

  const offset = 60000 / bpm;

  let clearActiveTimer: number;

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

    clearTapTimeout = setTimeout(() => (taps = []), 1000);
  };

  useEffect(() => {
    renderer.updateBeat(beat);
  }, [beat])

  return (
    <Fragment>
      <p>{Math.round(bpm)} bpm</p>
      <div className="bpm" onMouseDown={handleClick}>
        <span className={beat === 0 ? "active" : ""} />
        <span className={beat === 1 ? "active" : ""} />
        <span className={beat === 2 ? "active" : ""} />
        <span className={beat === 3 ? "active" : ""} />
      </div>
    </Fragment>
  );
};

export default Controls;
