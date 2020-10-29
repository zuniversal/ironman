import React from 'react';
import PropTypes from 'prop-types';
import './style.less';
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

const UploadCom = props => {
  console.log(' UploadCom   props, ,   ： ', props);
  const {
    label,
    isInputUpload,
    text,
    contentClass,
    action,
    name,
    extra,
  } = props; //
  const IconCom = isInputUpload ? UploadOutlined : PlusOutlined;
  return (
    <Form.Item
      key={'attach'}
      name="upload"
      label={label}
      colon={false}
      // extra="支持扩展名：.pdf"
      extra={extra}
    >
      <Upload
        name={name}
        action={action}
        // devScripts.js:5836 Warning: [antd: Upload] `value` is not a valid prop, do you mean `fileList`?
        fileList={[]}
        listType="picture-card"
        className={`uploadCom ${isInputUpload ? 'inputUpload' : ''}`}
      >
        {isInputUpload ? (
          <div className={`${contentClass}`}>
            <IconCom className={'icon'} />
            <div className={'text'}>{text}</div>
          </div>
        ) : (
          <div className={`dfc`}>
            <IconCom className={'icon'} />
            <div className={'text'}>{text}</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );
};

UploadCom.defaultProps = {
  text: '上传照片',
  action: '上传照片',
  name: 'file_name',
  extra: '',
};

UploadCom.propTypes = {
  text: PropTypes.string,
  action: PropTypes.string,
  name: PropTypes.string,
};

export default UploadCom;
