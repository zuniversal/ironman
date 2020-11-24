import React, { useState } from 'react';
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
import { UploadOutlined, PlusOutlined, StarOutlined } from '@ant-design/icons';
import { tips } from '@/utils';

const formatFile = data =>
  data.map(url => ({ uid: `-${url}`, url, response: { url } }));

// const formatFileList = fileData => {
//   const fileList = typeof fileData === 'string' ? [{uid: fileData, url: fileData, }] : formatFile(fileData)
//   console.log(' formatFileList   e,   ： ', fileData, fileList);
//   return fileData ? formatFile([fileData]) : []
// }
const formatFileList = fileData => {
  console.log(' formatFileList   e,   ： ', fileData);
  if (!fileData || fileData.length === 0) {
    return [];
  }
  const fileList =
    typeof fileData === 'string'
      ? [{ uid: fileData, url: fileData }]
      : formatFile(fileData);
  const resFileData = Array.isArray(fileData) ? fileData : [fileData];
  console.log(' formatFileList   e,   ： ', fileData, fileList, resFileData);
  return formatFile(resFileData);
  // return fileData ? formatFile([fileData]) : []
};

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
    init,
  } = props; //
  const IconCom = isInputUpload ? UploadOutlined : PlusOutlined;

  const [fileData, setFileData] = useState(formatFileList(init[name]));

  // const fileList = formatFileList(fileData)

  const onChange = e => {
    console.log(' onChange   e,   ： ', e);
    const { onUploadChange, noTips, uploadSucc } = props; //
    // const {fileList,  } = e
    setFileData(e.fileList);

    if (e.file.status === 'done') {
      tips(`${e.file.name} 上传成功！`, 1);
    } else if (e.file.status === 'error') {
      tips(`${e.file.name} 上传失败！`, 0);
    }
    // if (!noTips) {
    //   const item = e.fileList[e.fileList.length - 1];
    //   console.log('  item ：', item, item.response); //
    //   if (item.response) {
    //     const { failedMsg, successExpense, message } = item.response;
    //     console.log(' failedMsg ： ', failedMsg, message); //
    //     if (message) {
    //       confirms(message, 2);
    //     }
    //     // if (failedMsg && failedMsg.length > 0) {
    //     //   console.log(' itemitem failedMsg 22222 ： ', failedMsg,  )//
    //     //   notification.error({
    //     //     duration: null,
    //     //     placement: 'topLeft',
    //     //     message: intl.get('UPLOAD_ERROR'),
    //     //     description: <div>
    //     //       {failedMsg.map((v, i) => <div key={i} >{i + 1} - {v}</div>)}
    //     //     </div>,
    //     //     // icon: <Icon type="error" style={{ color: '#108ee9' }} />,
    //     //   });
    //     // }
    //     if (successExpense && successExpense.length > 0) {
    //       console.log(' itemitem successExpense 22222 ： ', successExpense); //
    //       confirms('文件上传成功！');
    //       // uploadSucc(successExpense)
    //     }
    //   }
    // }
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
      className={`uploadFormItem ${
        isInputUpload ? '' : 'uploadBox'
      } ${formItemCls} `}
    >
      <Upload
        progress={{
          strokeColor: {
            '0%': '#108ee9',
            '100%': '#87d068',
          },
          strokeWidth: 3,
          format: percent => `${parseFloat(percent.toFixed(2))}%`,
        }}
        // fileList={[
        //   {
        //     uid: '-1',
        //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        //   },
        // ]}
        fileList={fileData}
        // showUploadList={{
        //   showDownloadIcon: true,
        //   downloadIcon: 'download ',
        //   showRemoveIcon: true,
        //   removeIcon: (
        //     <StarOutlined
        //       onClick={e => console.log(e, 'custom removeIcon event')}
        //     />
        //   ),
        // }}
        action={action}
        // devScripts.js:5836 Warning: [antd: Upload] `value` is not a valid prop, do you mean `fileList`?
        // fileList={[]}
        listType="picture-card"
        className={`uploadCom ${isInputUpload ? 'inputUpload' : ''}`}
        multiple={false}
        onChange={onChange}
        {...uploadProps}
      >
        {isInputUpload ? (
          <div className={`${contentClass} ${isInputUpload ? 'dfc' : ''}`}>
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
  init: {},
};

UploadCom.propTypes = {
  text: PropTypes.string,
  action: PropTypes.string,
  name: PropTypes.string,
  uploadProps: PropTypes.object,
  formItemProps: PropTypes.object,
  init: PropTypes.object,
};

export default UploadCom;
