import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Button } from 'antd';

import SmartForm from '@/common/SmartForm';
import {
  DeviceInfoTable,
  WatchInfoTable,
  PowerStationDetailTable,
} from '@/components/Table/PowerStationInfoTable';
import UploadCom from '@/components/Widgets/UploadCom';
import { inspectTemplateConfig, inspectModelRadio, dayHours } from '@/configs';
import { DRAW_PANEL } from '@/constants';
import { arrMapObj, formatSelectList } from '@/utils';
import { ImgBlock } from '@/components/Temp';
import SmartImg from '@/common/SmartImg';
import ReduxTable from '@/common/ReduxTable';
import PowerNumberTable from '@/components/Table/PowerNumberTable';
import OutlineTable from '@/components/Table/OutlineTable';
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
  const commonParams = {
    init: [],
    format: res => formatSelectList(res),
  };

  const isAdd = props.action === 'add';
  const isDetail = props.action === 'detail';

  console.log(
    ' PowerStationForm  inspectModeinspectModeinspectMode ： ',
    inspection_type,
    props,
    inspectMode,
    props.init.id,
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
        label: '合同到期时间',
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

  const powerInfoData = formatSelectList(
    action === 'detail' ? props.init.powerInfoData : props.powerInfoData,
    'power_number',
  );
  const outLineTableData =
    action === 'detail' ? props.init.outLineTableData : props.outLineTableData;
  console.log('  outLineTableData ：', outLineTableData, powerInfoData);

  const commonProps = {
    noPad: true,
    rowSelection: null,
    pagination: false,
    showFormModal2: props.showFormModal2,
  };
  if (isDetail) {
    commonProps.noActionCol = true;
  }

  const powerNumberTableProps = {
    ...commonProps,
    dataSource: powerInfoData,
    edit: props.showFormModal2,
    remove: props.removePowerInfoAsync,
  };

  const outLineTableProps = {
    ...commonProps,
    dataSource: outLineTableData,
    edit: props.showFormModal2,
    remove: props.removeOutlineAsync,
    powerInfoData,
  };

  return (
    <div className={`powerStationForm`}>
      <SmartForm
        config={config}
        // isDisabledAll={action === 'detail'}
        {...props}
        init={{
          // inspection_type: 0,
          operation_level: null,
          inspection_type: inspectMode,
          ...props.init,
        }}
      ></SmartForm>

      {!isDetail && (
        <div className={'fje'}>
          <Button
            type="primary"
            onClick={() => {
              props.showFormModal2({
                action: 'addPowerNumberAsync',
              });
            }}
          >
            新增电源编号
          </Button>
        </div>
      )}
      <PowerNumberTable {...powerNumberTableProps}></PowerNumberTable>

      {!isDetail && (
        <div className={'fje'}>
          <Button
            type="primary"
            onClick={() => {
              props.showFormModal2({
                action: 'addOutlineAsync',
                extraData2: {
                  powerInfoData: formatSelectList(
                    powerInfoData,
                    'power_number',
                  ),
                },
              });
            }}
          >
            新增出线侧
          </Button>
        </div>
      )}
      <OutlineTable {...outLineTableProps}></OutlineTable>
    </div>
  );
};

PowerStationForm.defaultProps = {
  init: {},
  outLineTableData: [],
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
