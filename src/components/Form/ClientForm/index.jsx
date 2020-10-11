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
} from 'antd';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import UploadCom from '@/components/Widgets/UploadCom'; //
import { regoins } from '@/configs'; //
import { formatConfig, reportRadioOp } from '@/utils'; //

const ClientForm = props => {
  console.log(' ClientForm ： ', props); //

  const { getCapture } = props; //

  const config = [
    {
      formType: 'rowText',
      // noRule: true,
      itemProps: {
        label: '基本信息',
      },
    },
    {
      formType: 'Search',
      itemProps: {
        label: '客户名称',
        name: 'name',
      },
      comProps: {},
    },
    {
      formType: 'Select',
      itemProps: {
        label: '客户类型',
        name: 'type',
      },
      comProps: {},
    },
    {
      formType: 'Select',
      itemProps: {
        label: '所属行业',
        name: 'industry',
      },
      comProps: {},
    },
    {
      formType: 'Select',
      itemProps: {
        label: '企业规模',
        name: 'scale',
      },
      comProps: {},
    },
    {
      formType: 'Select',
      itemProps: {
        label: '资产规模',
        name: 'asset',
      },
      comProps: {},
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '总面积',
        name: 'total_area',
      },
      comProps: {},
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '占地面积',
        name: 'covered_area',
      },
      comProps: {},
    },
    // {
    //   // formType: 'Select',
    //   itemProps: {
    //     label: '企业LoGo',
    //     name: 'logo',
    //   },
    //   comProps: {},
    // },
    <UploadCom label={'企业LoGo'} key={'logo'}></UploadCom>,

    {
      formType: 'rowText',
      // noRule: true,
      itemProps: {
        label: '位置信息',
      },
    },
    {
      formType: 'Cascader',
      itemProps: {
        label: '区域',
        name: 'region',
      },
      comProps: {
        options: regoins,
      },
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '详细地址',
        name: 'addr',
      },
      comProps: {},
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '经度',
        name: 'longitude',
      },
      comProps: {},
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '纬度',
        name: 'latitude',
      },
      comProps: {},
    },

    {
      formType: 'rowText',
      noRule: true,
      itemProps: {
        label: '管理员信息',
      },
    },
    {
      formType: 'Dynamic',
      itemProps: {
        // label: '',
        label: '用户名',
        name: 'admin',
        className: 'noMargin',
      },
      comProps: {
        extra: true,
        itemProps: {
          label: '用户名',
        },
        comProps: {
          className: 'w-320',
        },
      },
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '密码',
        // name: 'pwd',
      },
      comProps: {},
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '手机号',
        // name: 'phone',
      },
      comProps: {},
    },

    {
      formType: 'rowText',
      noRule: true,
      itemProps: {
        label: '其他信息',
      },
    },
    {
      itemProps: {
        label: '附件',
      },
      comProps: {},
      extra: (
        <Button
          onClick={() => {
            console.log(' getCapture ： ', getCapture); //
            return getCapture({ action: 'userCapture' });
          }}
          className="m-l-5"
        >
          用户画像
        </Button>
      ),
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={''}>
      <SmartForm
        // flexRow={4}
        config={formatConfig(config)}
        formProps={formProps}
        // init={init}
        // init={{}}
        // init={{
        //   key9: regoins,
        // }}
        {...props}
      ></SmartForm>
    </div>
  );
};

ClientForm.defaultProps = {};

export default ClientForm;
