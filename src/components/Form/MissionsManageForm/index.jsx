import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { missionsTypeConfig, missionsStatusConfig } from '@/configs';
import InspectMissionTimeline from '@/components/Widgets/InspectMissionTimeline';

const MissionsManageForm = props => {
  console.log(' MissionsManageForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const { file = [] } = props.init;
  // const file = props.init.file ?? []

  const logTimeLine = [
    {
      formType: 'CustomCom',
      CustomCom: (
        <div>
          {file.map((v, i) => (
            <img src={v} className="feedBackImg" key={i} />
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
        label: '工单日志',
        name: 'task_log',
      },
    },
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
    {
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
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
      formType: 'Search',
      // selectSearch: props.getPowerAsync,
      selectData: props.powerList,
      itemProps: {
        label: '电站',
        name: 'station_id',
      },
    },
    {
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
        name: 'content',
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

    ...(props.action === 'detail' ? logTimeLine : []),
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' missionsManageForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsManageForm.defaultProps = {
  init: {},
};

export default MissionsManageForm;
