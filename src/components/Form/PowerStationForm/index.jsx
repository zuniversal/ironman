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
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';

import SmartForm from '@/common/SmartForm';
import {
  DeviceInfoTable,
  WatchInfoTable,
  PowerStationDetailTable,
} from '@/components/Table/PowerStationInfoTable';
import UploadCom from '@/components/Widgets/UploadCom';
import { inspectTemplateConfig, inspectModelRadio, dayHours } from '@/configs';
import { DRAW_PANEL } from '@/constants';
import {
  formatConfig,
  reportRadioOp,
  arrMapObj,
  formatSelectList,
  filterObjSame,
} from '@/utils';
import { ImgBlock } from '@/components/Temp';
import SmartImg from '@/common/SmartImg';
import ReduxTable from '@/common/ReduxTable';
import useHttp from '@/hooks/useHttp';
import { getPowerInfo } from '@/services/powerStation';
import { history } from 'umi';

const selectData = [
  { label: '正常', value: true, key: 'yes' },
  { label: '异常', value: false, key: 'no' },
];

const PowerStationForm = props => {
  console.log(' PowerStationForm 挂载 ： ', props, config);
  const { action, extra } = props;
  // const [inspectMode, setInspectMode] = useState(0);
  const { inspection_type = 0 } = props.init;

  const [inspectMode, setInspectMode] = useState(inspection_type);
  // const [powerInfoList, setPowerInfoList] = useState([]);
  const commonParams = {
    init: [],
    format: res => formatSelectList(res),
  };
  const { data: powerInfoList, req: getPowerInfoAsync } = useHttp(
    getPowerInfo,
    {
      ...commonParams,
      format: res => formatSelectList(res, 'power_number'),
    },
  );

  console.log(
    ' PowerStationForm  inspectModeinspectModeinspectMode ： ',
    inspection_type,
    props,
    inspectMode,
  );
  const onInspectModeChange = e => {
    console.log(
      ' PowerStationForm onInspectModeChange   e, 改变设置  ： ',
      e,
      e.target.value,
      inspectMode,
    );
    const inspectMode = props.propsForm.getFieldValue('inspectMode');
    // console.log(' PowerStationForm inspectMode 设置 ： ', inspectMode, );
    setInspectMode(e.target.value);
    props.propsForm.setFieldsValue({
      service_team: undefined,
    });
    // setInspectMode(inspectMode == 0 ? 1 : 0);
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
        name: '请筛选设备',
      },
    },
    watchRow,
    {
      noRule: true,
      // formType: 'Select',
      itemProps: {
        label: '请筛选监控点',
        name: '请筛选监控点',
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

  const inspectModeCol = [
    {
      formType: 'Radio',
      itemProps: {
        label: '巡检模式',
        name: 'inspection_type',
      },
      comProps: {
        onChange: onInspectModeChange,
      },
      radioData: inspectModelRadio,
    },
  ];
  const inspectTimeCol = [
    {
      formType: 'Search',
      selectData: dayHours,
      itemProps: {
        label: '巡检时间',
        name: 'inspection_time',
      },
      comProps: {
        mode: 'multiple',
      },
    },
  ];
  const inspectCountCol = [
    {
      formType: 'InputNumber',
      itemProps: {
        label: '巡检次数',
        name: 'inspections_number',
      },
    },
  ];

  // 月巡检电站只能绑定一个班组
  const monthTeamCol = [
    {
      key: 'monthTeamCol',
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '服务班组',
        name: 'service_team',
      },
    },
  ];
  const dayTeamCol = [
    {
      key: 'dayTeamCol',
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '服务班组',
        name: 'service_team',
      },
      comProps: {
        mode: 'multiple',
      },
    },
  ];

  // const inspectCol = props.propsForm.getFieldValue('inspection_type') == 0 ? inspectTimeCol : inspectCountCol;
  const inspectCol = inspectMode == 1 ? inspectTimeCol : inspectCountCol;
  const teamCol = inspectMode == 1 ? dayTeamCol : monthTeamCol;

  console.log(
    ' PowerStationForm inspectMode const inspectMode 查看值 ： = ',
    inspectMode,
    props.propsForm.getFieldValue('inspection_type'),
    inspectCol,
  );

  const actionConfig = [
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
        label: '所属户号',
        name: 'electricity_user',
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
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '运行等级',
    //     name: 'operation_level',
    //   },
    // },
    // {
    //   formType: 'Search',
    //   selectData: inspectTemplateConfig,
    //   itemProps: {
    //     label: '巡检模板',
    //     name: '巡检模板',
    //   },
    // },

    ...inspectModeCol,
    ...inspectCol,
    ...teamCol,
    {
      noRule: true,
      itemProps: {
        label: '电话',
        name: 'phone',
      },
    },
    {
      itemProps: {
        label: '电站地址',
        name: 'addr',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '过期时间',
        name: 'end_time',
      },
    },

    <UploadCom
      label={'上传电气图'}
      label={'一次系统图'}
      action={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      key={'file'}
      extra={
        <div className={`extraWrapper`}>
          {/* <Button
            type="primary"
            onClick={() => {
              console.log(' xxxx ： ',    )// 
              history.push(DRAW_PANEL)
            }}
            size={'small'}
          >
            编辑
          </Button>
          <Button
            type="wa"
            onClick={() => props.removeCircuitItem()}
            size={'small'}
          >
            删除
          </Button> */}

          {/* <a
            className={`actionBtn`}
            onClick={() => {
              console.log(' xxxx ： ');
              history.push(`${DRAW_PANEL}?powerstation_id=${props.init.id}`);
            }}
          >
            编辑
          </a>
          <a
            className={`actionBtn removeBtn`}
            onClick={() => props.removeCircuitItemAsync()}
          >
            删除
          </a> */}
        </div>
      }
      init={props.init}
      formAction={props.action}
      formItemProps={{
        rules: null,
      }}
    ></UploadCom>,
    {
      formType: 'rowText',
      itemProps: {
        label: '电源信息',
      },
    },
    // <UploadCom
    //   label={'上传一次系统图'}
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
    // {
    //   itemProps: {
    //     label: '运行等级',
    //     name: 'operation_level',
    //   },
    // },

    ...inspectModeCol,
    ...inspectCol,
    ...teamCol,
    {
      noRule: true,
      itemProps: {
        label: '电话',
        name: 'phone',
      },
    },
    {
      itemProps: {
        label: '电站地址',
        name: 'addr',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '过期时间',
        name: 'end_time',
      },
    },
    ...typeCols,
    {
      formType: 'CustomCom',
      // CustomCom: <ImgBlock>电气图</ImgBlock>,
      // CustomCom: <img src={props.init?.file} className={`imgBlock`} />,
      CustomCom: <SmartImg src={props.init?.file} />,
      itemProps: {
        label: '一次系统图',
      },
    },
    {
      formType: 'rowText',
      itemProps: {
        label: '电源信息',
      },
    },
  ];

  const config = action !== 'detail' ? actionConfig : detailConfig;

  const outLineConfig = [
    {
      itemProps: {
        label: '出线侧编号',
        name: 'id',
      },
    },
    {
      itemProps: {
        label: '出线侧名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getPowerInfoAsync,
      selectData: props.powerInfoList,
      // dataMap: arrMapObj(props.powerInfoList),
      dataMap: arrMapObj(powerInfoList),
      itemProps: {
        label: '电源编号',
        name: 'power_number',
      },
      comProps: {
        mode: 'multiple',
      },
    },
  ];

  const powerInfoData =
    action === 'detail' ? props.init.powerInfoData : props.powerInfoData;
  const outLineTableData =
    action === 'detail' ? props.init.outLineTableData : props.outLineTableData;
  console.log(
    '  outLineTableData ：',
    powerInfoData,
    outLineTableData,
    arrMapObj(props.powerInfoList),
    props.powerInfoList,
  );

  return (
    <div className={`powerStationForm`}>
      <SmartForm
        config={config}
        // config={configs}

        isDisabledAll={action === 'detail'}
        {...props}
        init={{
          // inspection_type: 0,
          operation_level: null,
          inspection_type: inspectMode,
          ...props.init,
        }}
      ></SmartForm>

      {extra}

      <PowerStationDetailTable
        addPowerInfoAsync={props.addPowerInfoAsync}
        editPowerInfoAsync={props.editPowerInfoAsync}
        removePowerInfoAsync={props.removePowerInfoAsync}
        modifyPowerInfo={props.modifyPowerInfo}
        dataSource={powerInfoData}
        init={props.init}
        isDisabledAll={!['add', 'edit'].includes(action)}
        showAdd
      ></PowerStationDetailTable>

      <ReduxTable
        key={'outLineFormTable'}
        config={outLineConfig.map(v => ({
          ...v,
          ...v.itemProps,
          isEdit: true,
        }))}
        addTableItemAsync={props.addOutLineTableItemAsync}
        editTableItemAsync={props.editOutLineTableItemAsync}
        removeTableItemAsync={props.removeOutLineTableItemAsync}
        modifyTableItem={props.modifyOutLineTableItem}
        dataSource={outLineTableData}
        isDisabledAll={!['add', 'edit'].includes(action)}
        noLimitAdd
        // hideSaveEdit={['add'].includes(action)}
        addText={'新增出线侧'}
      ></ReduxTable>
    </div>
  );
};

PowerStationForm.defaultProps = {
  init: {},
};

PowerStationForm.propTypes = {
  init: PropTypes.object,
};

export default PowerStationForm;
// export default React.memo(PowerStationForm,
//   (prev, next) => {
//   console.log('ClientForm memo ', prev, next, prev.init === next.init, prev.init, next.init, );
//   return true
// });
