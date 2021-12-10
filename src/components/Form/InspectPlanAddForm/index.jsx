import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';

const formLayouts = {
  labelCol: {
    sm: { span: 0 }, //
  },
  wrapperCol: {
    sm: { span: 24 }, //
  },
};

const checkboxData = [{ label: '短信通知客户', value: '', key: '' }];

const InspectPlanAddForm = props => {
  const config = [
    {
      formType: 'CustomCom',
      CustomCom: (
        <div className={'notifyWrapper'}>
          <div className="title">确认是否通知用户？</div>
          <div className="subTitle">
            检测到部分已通知客户的巡检计划日期发生变更
          </div>
        </div>
      ),
    },
    {
      formType: 'Checkbox',
      checkboxData: checkboxData,
      itemProps: {
        label: '',
        name: 'notify',
      },
    },
  ];

  return (
    <div className={' inspectPlanAddForm '}>
      <SmartForm
        config={config}
        {...props}
        formLayouts={formLayouts}
      ></SmartForm>
    </div>
  );
};

InspectPlanAddForm.defaultProps = {};

export default InspectPlanAddForm;
