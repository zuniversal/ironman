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

const ClientRadar = props => {
  console.log(' ClientRadar ： ', props);

  return (
    <div className={''}>
      <SmartEcharts data={[]} type="radar" radar={[]} {...props}></SmartEcharts>
    </div>
  );
};

ClientRadar.defaultProps = {};

export default ClientRadar;
