import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
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
} from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import SmartForm from '@/common/SmartForm';
import SmartModal from '@/common/SmartModal';
import { regoins } from '@/configs';

// 通用表单模态框组件 转发父组件传入的 表单属性给相应的表单
// 统一自动创建 form 管理 转发 form 组件的状态供父组件使用

// 主要作用是转发创建的表单

import { connect } from 'umi';
const mapStateToProps = ({ loading }) => ({ loadingData: loading });

const okDisableConfig = ['add', 'edit'];

const SmartFormModal = props => {
  const {
    // modalProps,
    // formsProps,

    show,
    onOk,
    onCancel,
    onSubmit,
    onFail,
    FormCom, // 调用传入的form组件
    formComProps, // 传递给表单的属性
    children,
    top,
    bottom,
    isNoForm,
    ...modalProps // 其余传给表单的属性

    // config,
  } = props;

  // const [form = {setFieldsValue: () => {}, }, ] = show ? Form.useForm() : [];
  const [form] = show ? Form.useForm() : [];
  // const [form] = Form.useForm()

  const { init } = formComProps;

  // const updateInit = (init) => {
  //   console.log(' updateInit   ,   ： ', init,   )
  //   if (form) {
  //     form.setFieldsValue(init)
  //   }
  // }

  // if (form) {
  //   form.setFieldsValue({
  //     yyyy: 'zyb',
  //   })
  // }

  const handleOk = e => {
    console.log(' handleOk   e, ,   ： ', e, props);

    const formValues = form.getFieldsValue();
    console.log('  formValues ：', formValues, formComProps, init);

    // onOk && onOk({ e, form, init: init, });
    onOk && onOk({ e, form, init: init });
  };
  const close = e => {
    console.log(' close   e, ,   ： ', e);

    onCancel && onCancel({ e, form });
  };

  // 确认按钮是否禁用
  let isOkDisabled = false;
  props.okDisableConfig.forEach((v, i) => {
    Object.keys(props.loadingData.effects).forEach((item, index) => {
      // console.log(' SmartFormModalSmartFormModal Object.keys(props.loadingData.effects) item ： ', props.loadingData.effects[item], item, index, item.includes(v), )
      if (item.includes(v) && props.loadingData.effects[item]) {
        isOkDisabled = true;
      }
    });
  });

  return (
    <SmartModal
      show={show}
      onOk={handleOk}
      onCancel={close}
      form={form}
      isOkDisabled={isOkDisabled}
      {...modalProps}
    >
      {/* <SmartForm
        // flexRow={4}
        config={formConfig}
        // formProps={formProps}
        // init={init}
        // init={{}}
        init={{
          key9: regoins,
        }}
        // {...formsProps}
        propsForm={form}
        onSubmit={onSubmit}
        onFail={onFail}
      ></SmartForm> */}

      <div>
        {top}

        {/* {children} */}

        {/* {FormCom && form && (
          <FormCom
            // flexRow={4}
            // config={formConfig}
            // formProps={formProps}
            // init={init}
            // init={{}}
            {...formComProps}
            propsForm={form}
            key={props.action}
            // onSubmit={onSubmit}
            // onFail={onFail}
          ></FormCom>
        )} */}

        {children && !isNoForm
          ? React.cloneElement(children, {
              propsForm: form,
            })
          : children}

        {bottom}
      </div>
    </SmartModal>
  );
};

SmartFormModal.defaultProps = {
  show: false,
  formComProps: {},
  okDisableConfig,
};

SmartFormModal.propTypes = {
  show: PropTypes.bool,
  formComProps: PropTypes.object,
  okDisableConfig: PropTypes.array,
};

// export default SmartFormModal;
export default connect(mapStateToProps)(SmartFormModal);
