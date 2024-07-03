'use client'
import ReactSlider from 'react-slider';
import { useState, useEffect } from 'react';
import styles from './RangeSliderStyles.module.css'

interface RangeSliderProps {
  min: number;
  max: number;
  onRangeChange: (values: [number, number]) => void;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ min, max, onRangeChange }) => {
  const [range, setRange] = useState<[number, number]>([min, max]);

  const handleChange = (value: number | number[]) =>{
    setRange(value as [number, number]);
    onRangeChange(value as [number, number]);
  };

  const createTicks = () => {
    const ticks = [];
    ticks.push(<div key={min} className={styles.tick}>{min}</div>);
    ticks.push(<div key={max} className={styles.tick}>{max}</div>);
    return ticks;
  };

  return (
    <div>
      <ReactSlider
        className={styles.horizontalSlider}
        thumbClassName={styles.exampleThumb}
        trackClassName={styles.exampleTrack}
        defaultValue={[min,max]}
        ariaLabel={['Lower thumb', 'Upper thumb']}
        renderThumb={(props, state: { valueNow: number }) => (
          <div {...props} data-value={state.valueNow}>{state.valueNow}</div>
        )}
        pearling
        minDistance={8}
        min={min}
        max={max}
        onChange={handleChange}
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`${props.className} ${state.index === 1 ? styles.exampleTrackActive : ''}`}
          />
        )}
      />
      <div className={styles.ticks}>
        {createTicks()}
      </div>
    </div>
  );
};

export default RangeSlider;
