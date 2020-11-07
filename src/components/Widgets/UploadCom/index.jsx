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
import { confirms } from '@/utils';

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
    formItemCls,
    formItemProps,
    uploadProps,
  } = props; //
  const IconCom = isInputUpload ? UploadOutlined : PlusOutlined;

  const onChange = e => {
    console.log(' onChange   e,   ： ', e);
    const { onUploadChange, noTips, uploadSucc } = props; //
    if (!noTips) {
      const item = e.fileList[e.fileList.length - 1];
      console.log('  item ：', item, item.response); //
      if (item.response) {
        const { failedMsg, successExpense, message } = item.response;
        console.log(' failedMsg ： ', failedMsg, message); //
        if (message) {
          confirms(message, 2);
        }
        // if (failedMsg && failedMsg.length > 0) {
        //   console.log(' itemitem failedMsg 22222 ： ', failedMsg,  )//
        //   notification.error({
        //     duration: null,
        //     placement: 'topLeft',
        //     message: intl.get('UPLOAD_ERROR'),
        //     description: <div>
        //       {failedMsg.map((v, i) => <div key={i} >{i + 1} - {v}</div>)}
        //     </div>,
        //     // icon: <Icon type="error" style={{ color: '#108ee9' }} />,
        //   });
        // }
        if (successExpense && successExpense.length > 0) {
          console.log(' itemitem successExpense 22222 ： ', successExpense); //
          confirms('文件上传成功！');
          // uploadSucc(successExpense)
        }
      }
    }
  };
  return (
    <Form.Item
      key={'attach'}
      // name="upload"
      name={name}
      label={label}
      colon={false}
      // extra="支持扩展名：.pdf"
      extra={extra}
      {...formItemProps}
      className={`uploadFormItem ${isInputUpload ? '' : 'uploadBox'}`}
    >
      <Upload
        {...uploadProps}
        action={action}
        // devScripts.js:5836 Warning: [antd: Upload] `value` is not a valid prop, do you mean `fileList`?
        fileList={[]}
        listType="picture-card"
        className={`uploadCom ${isInputUpload ? 'inputUpload' : ''}`}
        multiple={false}
        onChange={onChange}
      >
        {isInputUpload ? (
          <div className={`${contentClass}`}>
            <IconCom className={'icon'} />
            <div className={'text'}>{text}</div>
          </div>
        ) : (
          <div className={`dfc uploadContent`}>
            <IconCom className={'icon'} />
            <div className={'text'}>{text}</div>
          </div>
        )}
      </Upload>
    </Form.Item>
  );
};

UploadCom.defaultProps = {
  text: '上传文件',
  action: '上传文件',
  name: 'file_name',
  extra: '',
  uploadProps: {},
  formItemProps: {},
};

UploadCom.propTypes = {
  text: PropTypes.string,
  action: PropTypes.string,
  name: PropTypes.string,
  uploadProps: PropTypes.object,
  formItemProps: PropTypes.object,
};

export default UploadCom;
