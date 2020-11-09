import React from 'react';
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
import { uploadFile } from '@/services/assets'; //
import { tips } from '@/utils';

const UploadFileCom = props => {
  console.log(' UploadFileCom   props, ,   ： ', props);
  // return <Form.Item
  //   key={'attach'}
  //   name="upload"
  //   label={props.label}
  //   colon={false}
  //   // extra="支持扩展名：.pdf"
  // >
  //   <Upload name="logo" action="/upload.do"  listType="picture" className={''}  >
  //     <div>
  //       <Button icon={<UploadOutlined />}>上传文件</Button>
  //       <div className="extra">
  //         支持扩展名：xls, xlsx, csv,...
  //       </div>
  //     </div>
  //   </Upload>
  // </Form.Item>
  const onChange = params => {
    console.log(' onChange   params,   ： ', params);
    if (params.file.status === 'done') {
      const { msg } = params.file.response;
      tips(msg);
      props.onChange(params);
    }
  };

  return (
    <div className="uploadFileWrapper">
      <span className="label">{props.label}</span>

      <Upload listType="picture" onChange={onChange} action={uploadFile}>
        <Button className={'uploadBtn w-280'} icon={<UploadOutlined />}>
          上传文件
        </Button>
        <div className="extra">支持扩展名：xls, xlsx, csv,...</div>
      </Upload>
    </div>
  ); //
};

export default UploadFileCom;
