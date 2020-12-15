import React from 'react';
import './style.less';
import { Divider } from 'antd';
import SmartForm from '@/common/SmartForm'; //

const formLayouts = {
  labelCol: {
    sm: { span: 12 }, //
  },
  wrapperCol: {
    sm: { span: 12 }, //
  },
};

const SystemNotifyForm = props => {
  console.log(' SystemNotifyForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '合同ID:',
        name: '合同ID',
      },
      comProps: {
        className: 'detailItem w-180',
      },
    },
    {
      itemProps: {
        label: '业务员:',
        name: '业务员',
      },
      comProps: {
        className: 'detailItem w-180',
      },
    },
    {
      itemProps: {
        label: '对应抢修单ID:',
        name: '对应抢修单ID',
      },
      comProps: {
        className: 'detailItem w-180',
      },
    },
    {
      itemProps: {
        label: '合同类型:',
        name: '合同类型',
      },
      comProps: {
        className: 'detailItem w-180',
      },
    },
    {
      itemProps: {
        label: '处理时间:',
        name: '处理时间',
      },
      comProps: {
        className: 'detailItem w-180',
      },
    },
    {
      itemProps: {
        label: '关联工单ID:',
        name: '关联工单ID',
      },
      comProps: {
        className: 'detailItem w-180',
      },
    },
  ];

  return (
    <div className={' systemNotifyForm '}>
      <div className="content textCenter">
        尊敬的XXX客户，您的抢修业务需要签署合同 并缴一定金额
      </div>
      <Divider />
      <SmartForm
        config={config}
        formLayouts={formLayouts}
        noRuleAll
        // {...rest}
        {...props}
      ></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

SystemNotifyForm.defaultProps = {};

export default SystemNotifyForm;
