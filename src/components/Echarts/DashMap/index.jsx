import React from 'react';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
  Upload,
  Result,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

import SmartEcharts from '@/common/SmartEcharts';

const DashMap = props => {
  console.log(' DashMap ： ', props);

  return (
    <div className={''}>
      <SmartEcharts data={[]} type="map" radar={[]} {...props}></SmartEcharts>
    </div>
  );
};

DashMap.defaultProps = {};

export default DashMap;
