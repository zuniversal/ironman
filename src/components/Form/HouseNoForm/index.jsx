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
import SmartForm from '@/common/SmartForm'; //
import HouseNoFormTable from '@/components/Table/HouseNoFormTable'; //
import { regoins } from '@/configs'; //
import { formatConfig, reportRadioOp } from '@/utils'; //

const HouseNoForm = props => {
  console.log(' HouseNoForm ： ', props, config); //
  const { action } = props; //

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  const capacityConfig = [
    {
      itemProps: {
        label: '变压器容量',
        name: 'transformer_capacity',
      },
    },
    {
      itemProps: {
        label: '实际容量',
        name: 'real_capacity',
      },
    },
  ];
  // const formConfig = formatConfig(config);
  const areaConfig = [
    // {
    //   noRule: true,
    //   formType: 'Cascader',
    //   itemProps: {
    //     label: '区域',
    //     name: 'area_code',
    //   },
    // },,
    {
      noRule: true,
      itemProps: {
        label: '经度',
        name: 'longitude',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '纬度',
        name: 'latitude',
      },
      comProps: {
        disabled: true,
      },
    },
  ];

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息:',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientList,
      itemProps: {
        label: '客户',
        name: 'customer',
      },
    },
    {
      // 户号名称 唯一 直接输入
      itemProps: {
        label: '户号',
        name: 'number',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '客户代表',
        name: 'customer_representative',
      },
    },
    {
      itemProps: {
        label: '户主',
        name: 'householder',
      },
    },

    // {
    //   itemProps: {
    //     label: '签约公司',
    //     name: 'signing_company',
    //   },
    // },
    {
      itemProps: {
        label: '电话',
        name: 'phone',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '位置信息',
      },
    },
    // {
    //   // formType: 'Cascader',
    //   itemProps: {
    //     label: '区域',
    //     name: 'area_code',
    //   },
    // },
    {
      itemProps: {
        label: '详细用电地址',
        name: 'addr',
      },
    },
    {
      itemProps: {
        label: '邮编',
        name: 'postcode',
      },
    },

    // ...(action !== 'add' ? areaConfig : []),
    ...(action === 'detail' ? areaConfig : []),

    {
      formType: 'rowText',
      itemProps: {
        label: '电气信息',
      },
    },
    ...(action === 'detail' ? capacityConfig : []),

    {
      // formType: 'Select',
      itemProps: {
        label: '电压等级',
        name: 'voltage_level',
      },
    },

    {
      // formType: 'Select',
      itemProps: {
        label: '电价类型',
        name: 'type',
      },
    },

    {
      itemProps: {
        label: '托管电站数',
        name: 'trusteeship_num',
      },
    },

    {
      itemProps: {
        label: '电功率考核因数',
        name: 'ep_factor',
      },
    },
    {
      itemProps: {
        label: '计费方式',
        name: 'billing_method',
      },
    },
  ];

  // if (action === 'detail') {
  //   config.push(<HouseNoFormTable key={'table'}></HouseNoFormTable>);
  // }

  return (
    <div className={''}>
      <SmartForm
        config={config}
        // config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}

        isDisabledAll={action === 'detail'}
        {...props}
      ></SmartForm>
    </div>
  );
};

HouseNoForm.defaultProps = {};

export default HouseNoForm;
