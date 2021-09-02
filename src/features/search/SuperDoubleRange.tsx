import { Slider } from 'antd';
import React from 'react';

type SuperDoubleRangePropsType = {
  onChange: (value: [number, number]) => void;
  defaultValue: [number, number];
};

export const SuperDoubleRange = (props: SuperDoubleRangePropsType) => {
  return (
    <div>
      <Slider
        style={{ width: '150px', margin: '10px auto' }}
        range
        step={1}
        onChange={props.onChange}
        value={props.defaultValue}
      />
    </div>
  );
};
