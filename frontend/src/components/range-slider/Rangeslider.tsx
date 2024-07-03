import ReactSlider from 'react-slider';
import styles from './RangeSliderStyles.module.css'

interface RangeSliderProps {
  defaultMin: number;
  defaultMax: number;
  min: number;
  max: number;
  onRangeChange: (values: [number, number]) => void;
}

const RangeSlider = ({ defaultMin, defaultMax, min, max, onRangeChange } : RangeSliderProps) => {
  const handleChange = (value: [number, number]) => {
    onRangeChange(value)
  }

  const createTicks = () => {
    const ticks = [];
    ticks.push(<div key={min} className={styles.tick}>{min}</div>);
    ticks.push(<div key={max} className={styles.tick}>{max}</div>);
    return ticks;
  };

  return (
    <>
      <ReactSlider
        className={styles.horizontalSlider}
        thumbClassName={styles.exampleThumb}
        trackClassName={styles.exampleTrack}
        defaultValue={[defaultMin >= min ? defaultMin : min, defaultMax <= max ? defaultMax : max]}
        renderThumb={(props, state: { valueNow: number }) => (
          <div {...props} data-value={state.valueNow}>
            {state.valueNow}
          </div>
        )}
        pearling
        minDistance={1}
        min={min}
        max={max}
        onChange={handleChange}
        renderTrack={(props, state) => (
          <div
            {...props}
            className={`${props.className} ${
              state.index === 1 ? styles.exampleTrackActive : ""
            }`}
          />
        )}
      />
      <div className={styles.ticks}>{createTicks()}</div>
    </>
  )
};

export default RangeSlider;
