import React from 'react';
import './style.less';
import { Divider } from 'antd';
import SmartForm from '@/common/SmartForm';
import { systemNotifyConfig } from '@/configs';

const formLayouts = {
  labelCol: {
    sm: { span: 12 }, //
    sm: { span: 8 }, //
  },
  wrapperCol: {
    sm: { span: 12 }, //
    sm: { span: 16 }, //
  },
};

const SystemNotifyForm = props => {
  const config = [
    // {
    //   itemProps: {
    //     label: '合同ID:',
    //     name: '合同ID',
    //   },
    //   comProps: {
    //     className: 'detailItem w-180',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '业务员:',
    //     name: '业务员',
    //   },
    //   comProps: {
    //     className: 'detailItem w-180',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '对应抢修单ID:',
    //     name: '对应抢修单ID',
    //   },
    //   comProps: {
    //     className: 'detailItem w-180',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '合同类型:',
    //     name: '合同类型',
    //   },
    //   comProps: {
    //     className: 'detailItem w-180',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '处理时间:',
    //     name: '处理时间',
    //   },
    //   comProps: {
    //     className: 'detailItem w-180',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '关联工单ID:',
    //     name: '关联工单ID',
    //   },
    //   comProps: {
    //     className: 'detailItem w-180',
    //   },
    // },
    {
      itemProps: {
        label: '标题：',
        name: 'title',
      },
      comProps: {
        className: 'detailItem w-180',
      },
    },
    // {
    //   // formType: 'Search',
    //   // selectData: systemNotifyConfig,
    //   itemProps: {
    //     label: '类型：',
    //     name: 'typeMap',
    //   },
    //   comProps: {
    //     className: 'detailItem w-180',
    //   },

    // },
    {
      itemProps: {
        label: '时间：',
        name: 'createdTime',
      },
      comProps: {
        className: 'detailItem w-180',
      },
    },
    {
      itemProps: {
        label: '发送人：',
        name: 'sender_name',
      },
      comProps: {
        className: 'detailItem w-180',
      },
    },
    // {
    //   itemProps: {
    //     label: '接收人',
    //     name: 'receive_id',
    //   },
    //   comProps: {
    //     className: 'detailItem w-180',
    //   },
    // },
  ];

  return (
    <div className={' systemNotifyForm '}>
      <div className="content textCenter">
        {/* 尊敬的XXX客户，您的抢修业务需要签署合同 并缴一定金额 */}
        {props.init.content}
      </div>
      <Divider />
      <SmartForm
        config={config}
        formLayouts={formLayouts}
        noRuleAll
        {...props}
      ></SmartForm>
    </div>
  );
};

SystemNotifyForm.defaultProps = {};

export default SystemNotifyForm;
