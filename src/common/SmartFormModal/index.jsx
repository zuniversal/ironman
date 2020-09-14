import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types'
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
} from 'antd';
import { SmileOutlined } from '@ant-design/icons';

import SmartForm from '@/common/SmartForm'; //
import SmartModal from '@/common/SmartModal'; //
import usePowerStationForm from '@/components/Form/PowerStationForm/usePowerStationForm'; //
import { regoins } from '@/configs'; //


const SmartFormModal = props => {

  const {
    // modalProps,
    // formsProps,

    show,
    onOk,
    onCancel,
    onSubmit,
    onFail,
    FormCom,
    formComProps,
    children,
    top,
    bottom,
    ...modalProps

    // config,
  } = props; //

  // const configs = usePowerStationForm()
  // console.log(' configs ： ', configs,  )// 

  const [form] = show ? Form.useForm() : []



  console.log(' SmartFormModal ： ', props, form, modalProps, React.isValidElement(null), React.isValidElement(FormCom), ); //

  
  const handleOk = e => {
    console.log(' handleOk   e, ,   ： ', e);

    const formValues = form.getFieldsValue()
    console.log('  formValues ：', formValues,  )//  

    // .validateFields()
    // .then(values => {
    //   console.log('  values await 结果  ：', values,  )//
    //   form.resetFields();
    //   // onCreate(values);
    // })
    // .catch(info => {
    //   console.log('Validate Failed:', info);
    // });

    onOk && onOk({ e, form });
  };
  const close = e => {
    console.log(' close   e, ,   ： ', e);

    onCancel && onCancel({ e, form });
  };

  


  return (
    show && <SmartModal
        // {...modalProps}

        show={show}

        {...modalProps}
        onOk={handleOk}
        onCancel={close}
        
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

          {children}

          {FormCom && <FormCom
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
          ></FormCom>}

          {bottom}
          

        </div>

      </SmartModal>
  );
};


SmartFormModal.defaultProps = {
    show: false, 
    // formComProps: {}, 



};

SmartFormModal.propTypes = {
    show: PropTypes.bool,
    // formComProps: PropTypes.object,

}


export default SmartFormModal;
