import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //

const MissionsForm = props => {
  console.log(' MissionsForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      // formType: 'Search',
      // selectSearch: props.getClientAsync,
      // selectData: props.clientList,
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
      itemProps: {
        label: '任务类型',
        name: 'type',
      },
    },
    // 选择客户所属电站
    {
      // formType: 'Search',
      // selectSearch: props.getPowerAsync,
      // selectData: props.powerList,
      itemProps: {
        label: '电站',
        name: 'station_id',
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getAssetsAsync,
      // selectData: props.assetsList,
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
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' MissionsForm '}>
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

MissionsForm.defaultProps = {};

export default MissionsForm;
