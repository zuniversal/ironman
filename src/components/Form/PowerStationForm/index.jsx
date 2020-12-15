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
  PowerStationDetailTable,
} from '@/components/Table/PowerStationInfoTable'; //
import UploadCom from '@/components/Widgets/UploadCom'; //
import { regoins } from '@/configs'; //
import { formatConfig, reportRadioOp } from '@/utils'; //
import { ImgBlock } from '@/components/Temp';
import SmartImg from '@/common/SmartImg';

const selectData = [
  { label: '正常', value: true, key: 'yes' },
  { label: '不正常', value: false, key: 'no' },
];

const PowerStationForm = props => {
  console.log(' PowerStationForm ： ', props, config); //
  const { action, extra } = props; //

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

  const actionConfig = [
    // {
    //   formType: 'rowText',
    //   // rowText: '基本信息',
    //   // noRule: true,
    //   itemProps: {
    //     label: '基本信息',
    //   },
    // },
    {
      itemProps: {
        label: '电站名称',
        name: 'name',
      },
    },
    {
      // noRule: true,
      formType: 'Search',
      selectSearch: props.getHouseNoAsync,
      selectData: props.houseNoList,
      itemProps: {
        label: '户号',
        name: 'electricity_user',
      },
    },
    // {
    //   formType: 'Search',
    //   selectSearch: props.getClientAsync,
    //   selectData: props.clientList,
    //   itemProps: {
    //     label: '所属客户',
    //     name: 'customer',
    //   },
    // },
    // {
    //   formType: 'Search',
    //   selectSearch: props.getHouseNoAsync,
    //   selectData: props.houseNoList,
    //   itemProps: {
    //     label: '户号',
    //     name: 'electricity_user',
    //   },
    // },

    {
      itemProps: {
        label: '业务主体',
        name: 'person',
      },
    },

    {
      formType: 'Search',
      selectData: selectData,
      itemProps: {
        label: '运行状态',
        name: 'status',
      },
    },
    {
      itemProps: {
        label: '运行等级',
        name: 'operation_level',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '巡检次数',
        name: 'inspections_number',
      },
    },
    // {
    //   itemProps: {
    //     label: '区域',
    //     name: 'addr',
    //   },
    // },
    {
      itemProps: {
        label: '电话',
        name: 'phone',
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

    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '位置信息',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '详细用电地址',
    //     name: 'addr',
    //   },
    // },
    {
      itemProps: {
        label: '电站地址',
        name: 'addr',
      },
    },

    // ...typeCols,

    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '一次电气图',
    //   },
    // },

    <UploadCom
      label={'上传电气图'}
      action={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      key={'file'}
      // extra={'支持扩展名:pdf、jpg、png'}
      init={props.init}
    ></UploadCom>,
    {
      formType: 'rowText',
      itemProps: {
        label: '电源信息',
      },
    },
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
  const detailConfig = [
    {
      noRule: true,
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientList,
      itemProps: {
        label: '所属客户',
        name: 'customer',
      },
    },
    {
      // noRule: true,
      formType: 'Search',
      selectSearch: props.getHouseNoAsync,
      selectData: props.houseNoList,
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
        label: '业务主体',
        name: 'person',
      },
    },
    {
      itemProps: {
        label: '运行状态',
        name: 'status',
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
        label: '巡检次数',
        name: 'inspections_number',
      },
    },
    {
      itemProps: {
        label: '电话',
        name: 'phone',
      },
    },
    // {
    //   itemProps: {
    //     label: '区域',
    //     // name: '',
    //   },
    // },
    {
      itemProps: {
        label: '电站地址',
        name: 'addr',
      },
    },
    ...typeCols,
    {
      formType: 'CustomCom',
      // CustomCom: <ImgBlock>电气图</ImgBlock>,
      // CustomCom: <img src={props.init?.file} className={`imgBlock`} />,
      CustomCom: <SmartImg src={props.init?.file} />,
      itemProps: {
        label: '一次电气图',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电源信息',
      },
    },
  ];

  const config = action !== 'detail' ? actionConfig : detailConfig; //
  console.log('  config ：', config); //

  return (
    <>
      <SmartForm
        config={config}
        // config={configs}

        isDisabledAll={action === 'detail'}
        {...props}
      ></SmartForm>

      {extra}
      <PowerStationDetailTable
        addPowerInfoAsync={props.addPowerInfoAsync}
        editPowerInfoAsync={props.editPowerInfoAsync}
        removePowerInfoAsync={props.removePowerInfoAsync}
        modifyPowerInfo={props.modifyPowerInfo}
        dataSource={props.powerInfoData}
        init={props.init}
        isDisabledAll={!['add', 'edit'].includes(action)}
      ></PowerStationDetailTable>
    </>
  );
};

PowerStationForm.defaultProps = {};

export default PowerStationForm;
