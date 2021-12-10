import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import { missionsTypeConfig, missionsStatusConfig } from '@/configs';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';
import SmartImg from '@/common/SmartImg';
import UploadCom from '@/components/Widgets/UploadCom';

const MissionsManageForm = props => {
  // const { file = [] } = props.init;
  const file = props.init.file ?? [];

  const logTimeLine = [
    {
      noRule: true,
      formType: 'CustomCom',
      CustomCom: (
        <div>
          {file.map((v, i) => (
            // <img src={v} className="feedBackImg" key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </div>
      ),
      itemProps: {
        label: '反馈照片',
      },
    },
    {
      noRule: true,
      formType: 'CustomCom',
      CustomCom: (
        <InspectMissionTimeline
          datas={props.init?.work_log}
        ></InspectMissionTimeline>
      ),
      itemProps: {
        label: '任务日志',
        name: 'task_log',
      },
    },
  ];

  const actionConfig = [
    <UploadCom
      label={'反馈照片'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={'支持扩展名:pdf、jpg、png'}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
        multiple: true,
      }}
      init={props.init}
      formItemProps={{
        rules: null,
      }}
      formAction={props.action}
    ></UploadCom>,
  ];

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getClientAsync,
      selectData: props.clientList,
      itemProps: {
        label: '客户',
        // name: ['customer', 'id'],
        name: 'customer_id',
      },
    },
    ...(props.action !== 'add'
      ? [
          {
            noRule: true,
            itemProps: {
              label: '名称',
              name: 'name',
            },
          },
        ]
      : []),
    {
      formType: 'Search',
      selectData: missionsTypeConfig,
      itemProps: {
        label: '任务类型',
        name: 'type',
      },
    },
    // 选择客户所属电站
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: props.getPowerAsync,
      selectData: props.powerList,
      itemProps: {
        label: '电站',
        name: 'station_id',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: props.getAssetsAsync,
      selectData: props.assetsList,
      itemProps: {
        label: '设备',
        name: 'equipment_id',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '任务描述',
        name: props.action === 'detail' ? 'describe' : 'content',
      },
    },
    {
      itemProps: {
        label: '联系人',
        name: 'person',
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
        label: '地址',
        name: 'addr',
      },
    },

    ...(props.action === 'detail' ? logTimeLine : actionConfig),
  ];

  return (
    <div className={' missionsManageForm '}>
      <SmartForm config={config} {...props}></SmartForm>
    </div>
  );
};

MissionsManageForm.defaultProps = {
  init: {},
};

export default MissionsManageForm;
