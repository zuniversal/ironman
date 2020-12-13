import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //

const checkboxData = [
  { label: '待巡检任务', value: 'inspectMission', key: 'inspectMission' },
  { label: '待处理工单', value: 'pendingOrder', key: 'pendingOrder' },

  { label: '未领取巡检任务', value: 'waitInspect', key: 'waitInspect' },
  { label: '未领取工单', value: 'waitReceive', key: 'waitReceive' },

  { label: '小组数据统计', value: 'groupCount', key: 'groupCount' },
  { label: '完成工单数', value: 'completeOrder', key: 'completeOrder' },
  { label: '完成巡检数', value: 'compeleteInspect', key: 'compeleteInspect' },
];

export const config = [
  {
    formType: 'Checkbox',
    checkboxData: checkboxData,
    itemProps: {
      label: '',
      name: 'homeSettings',
    },
  },
];

const HomeSettingForm = props => {
  console.log(' HomeSettingForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' homeSettingForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}

        // init={{
        //   settings: ['item1', 'item2'],
        // }}
        noLabelLayout
        {...props}
      ></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

HomeSettingForm.defaultProps = {};

export default HomeSettingForm;
