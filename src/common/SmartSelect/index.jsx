import React from 'react';
import './style.less';
import { Select } from 'antd';

const SmartSelect = props => {
  const { selectData = [], comProps = {} } = props;
  return (
    <Select
      className="smartSelect"
      {...comProps}
      onSelect={props.onSelect}
      // defaultValue={props.selectData[0].id}
      key={props.drawId}
    >
      {selectData.map(v => (
        <Select.Option value={v.value} key={v.value} title={v.label} {...v}>
          {v.label}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SmartSelect;
