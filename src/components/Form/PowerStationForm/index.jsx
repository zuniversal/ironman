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
import {
  DeviceInfoTable,
  WatchInfoTable,
} from '@/components/Table/PowerStationInfoTable'; //
import UploadCom from '@/components/Widgets/UploadCom'; //
import { regoins } from '@/configs'; //
import { formatConfig, reportRadioOp } from '@/utils'; //

const PowerStationForm = props => {
  console.log(' PowerStationForm ： ', props, config); //
  const { action } = props; //

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  // const formConfig = formatConfig(config);

  const deciveRow = {
    formType: 'rowText',
    itemProps: {
      label: '设备信息',
    },
  };
  const watchRow = {
    formType: 'rowText',
    itemProps: {
      label: '设备信息',
    },
  };

  const addCol = [
    deciveRow,
    {
      noRule: true,
      // formType: 'Select',
      itemProps: {
        label: '请筛选设备',
        name: '',
      },
    },
    watchRow,
    {
      noRule: true,
      // formType: 'Select',
      itemProps: {
        label: '请筛选监控点',
        name: '',
      },
    },
  ];

  const editCol = [
    // deciveRow,
    // <DeviceInfoTable
    //   key={'DeviceInfoTable'}
    //   pagination={false}
    //   dataSource={[props.init]}
    // ></DeviceInfoTable>,
    // watchRow,
    // <WatchInfoTable key={'WatchInfoTable'} pagination={false}
    // dataSource={[props.init]}
    // ></WatchInfoTable>,

    // {
    //   itemProps: {
    //     label: '详细地址',
    //   },
    // },
    {
      noRule: true,
      itemProps: {
        label: '经度',
        name: 'longitude',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '纬度',
        name: 'latitude',
      },
    },
  ];

  let typeCols = [];

  // if (action === 'add') {
  //   typeCols = addCol
  // } else if (action === 'edit') {
  //   typeCols = editCol
  // }

  if (action === 'add') {
    typeCols = addCol;
  } else {
    typeCols = editCol;
  }

  const config = [
    {
      formType: 'rowText',
      // rowText: '基本信息',
      // noRule: true,
      itemProps: {
        label: '基本信息',
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getClientAsync,
      // selectData: props.clientList,
      itemProps: {
        label: '所属客户',
        name: 'customer',
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getHouseNo,
      // selectData: props.houseNoList,
      itemProps: {
        label: '户号',
        name: 'electricity_user',
      },
    },

    {
      itemProps: {
        label: '电站名称',
        name: 'name',
      },
    },

    {
      itemProps: {
        label: '运行等级',
        name: 'operation_level',
      },
    },
    {
      itemProps: {
        label: '电话',
        name: 'phone',
      },
    },
    {
      itemProps: {
        label: '业务主体',
        name: 'person',
      },
    },
    // {
    //   itemProps: {
    //     label: '电气图',
    //     name: 'file',
    //   },
    // },

    // {
    //   itemProps: {
    //     label: '托管电站数',
    //     name: '',
    //   },
    // },

    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '电气信息',
    //   },
    // },

    // {
    //   itemProps: {
    //     label: '电源编号',
    //     name: 'power_number',
    //   },
    // },

    // {
    //   itemProps: {
    //     label: '进线名称',
    //     name: '',
    //   },
    // },

    // {
    //   itemProps: {
    //     label: '电压等级',
    //     name: 'voltage_level',
    //   },
    // },

    // {
    //   itemProps: {
    //     label: '倍率',
    //     name: '',
    //   },
    // },

    // {
    //   itemProps: {
    //     label: '变压器容量',
    //     name: '',
    //   },
    // },

    // {
    //   itemProps: {
    //     label: '电表号',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '电价类型',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '电功率考核因数',
    //     name: '',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '计费方式',
    //     name: '',
    //   },
    // },

    {
      formType: 'rowText',
      itemProps: {
        label: '位置信息',
      },
    },
    {
      itemProps: {
        label: '详细用电地址',
        name: 'addr',
      },
    },

    ...typeCols,

    {
      formType: 'rowText',
      itemProps: {
        label: '一次电气图',
      },
    },

    <UploadCom
      label={'上传电气图'}
      action={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      key={'file'}
      // extra={'支持扩展名:pdf、jpg、png'}
    ></UploadCom>,
    // <UploadCom
    //   label={'上传一次电气图'}
    //   text={'上传文件'}
    //   text={'上传文件'}
    //   extra={'支持上传.DWG文件'}
    //   key={'file'}
    // ></UploadCom>,

    // <Form.Item
    //   key={'attach'}
    //   name="upload"
    //   label="上传电气图"
    //   colon={false}
    //   // extra="支持扩展名：.pdf"
    // >
    //   <Upload name="logo" action="/upload.do"  listType="picture-card" >
    //     <div>
    //       <PlusOutlined />
    //       <div style={{ marginTop: 8 }}>上传照片</div>
    //     </div>
    //   </Upload>
    // </Form.Item>,
  ];

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

PowerStationForm.defaultProps = {};

export default PowerStationForm;
