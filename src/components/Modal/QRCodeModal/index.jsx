import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import './style.less';
import {
  Table,
  Icon,
  notification,
  Modal,
  Button,
  Tag,
  Form,
  Input,
  Row,
  Col,
  Result,
  Typography,
  Divider,
} from 'antd';
import {
  SmileOutlined,
  CloseCircleOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';

import SmartModal from '@/common/SmartModal';

export const RemoveModal = props => {
  console.log(
    ' %c RemoveModal 组件 props ： ',
    `color: #333; font-weight: bold`,
    props,
  );
  const onQRCodeModalOk = e => {
    console.log(' onQRCodeModalOk   e,  ,   ： ', e);
  };

  const onQRCodeModalCancel = e => {
    console.log(' onQRCodeModalCancel   e, ,   ： ', e);
  };

  const title = '删除电站';
  const showQRCodeModal = false;

  const { modalProps, resProps, children } = props;

  // const resProps = {
  //   status: 'error',
  //   title: '导入成功',
  //   subTitle: '请核对并修改以下信息后，再重新提交。',
  //   // extra: [
  //   //   <Button  key="console" >返回列表</Button>,
  //   // ],
  //   children: <ErrorInfo></ErrorInfo>,
  // }
  console.log(' resProps ： ', resProps);
  return (
    <ResultModal
      className={'RemoveModal'}
      // title={'您是否确认删除？'}
      // subTitle={'删除电站会删除电站下所有资产。监测点，请慎重!'}
      // okText={'确认'}
      // cancelText={'取消'}:

      modalProps={modalProps}
      resProps={{
        icon: <ExclamationOutlined className={'warnings '} />,
        status: 'warning',
        title: '您是否确认删除？',
        subTitle: '删除电站会删除电站下所有资产。监测点，请慎重!',
        okText: '确认',
        cancelText: '取消',
        ...resProps,
      }}
    >
      {children}
    </ResultModal>
  );
};

RemoveModal.defaultProps = {
  // title: '您是否确认删除？',
  // subTitle: '删除电站会删除电站下所有资产。监测点，请慎重!',
  // okText: '确认',
  // cancelText: '取消',
};

const ResultModal = props => {
  const [form] = Form.useForm();
  // console.log(' ResultModal ： ', props, form);
  const {
    show,
    onOk,
    onCancel,
    onSubmit,
    onFail,
    modalProps,
    resProps,
    children,
  } = props;

  const { status = 'succ', okText, cancelText, okFn, offFn } = resProps;

  const btnCom = (
    <div className="dfc">
      {cancelText && <Button onClick={offFn}>{cancelText}</Button>}
      {okText && (
        <Button type="primary" onClick={okFn}>
          {okText}
        </Button>
      )}
    </div>
  );

  // const {
  //   children = btnCom,
  // } = props;

  // const onOk = e => {
  //   console.log(' onOk   e, ,   ： ', e);

  //   onOk && onOk({ e, form });
  // };

  const statusMap = {
    succ: 'success',
    success: 'success',
    error: 'error',
    warning: 'warning',
  }[status];

  // console.log(' statusMap ： ', statusMap, status,  )//

  return (
    <SmartModal
      width={'400px'}
      footer={null}
      className={`resultModal ${statusMap} `}
      {...modalProps}
    >
      <Result
        // status={statusMap}
        subTitle="subTitle"
        {...resProps}
      >
        {children}

        {(okText || cancelText) && btnCom}
      </Result>
    </SmartModal>
  );
};

ResultModal.defaultProps = {};

export default QRCodeModal;
