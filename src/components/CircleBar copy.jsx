import {
  CircularProgressbar,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useState,useEffect } from 'react';

const CircleBar = ({total,completed}) => {

    // calculating percentage of completed project
    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div style={{ width: 200 ,margin:'auto',height:'auto'}}>
      <CircularProgressbar
        value={progress}
        text={`${progress}%`}
        styles={buildStyles({
          pathColor: '#3B82F6',
          textColor: '#374151',
          trailColor: '#e5e7eb',
        })}
      />
    </div>
  );
};
export default CircleBar;
