import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //
import SmartImg from '@/common/SmartImg';

const BussniessRecordForm = props => {
  console.log(' BussniessRecordForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const { file = [] } = props.init;

  const isCompleted = props.init.status === 'completed';

  const completedConfig = [
    // 任务状态已完成 - completed 确认按钮
    // 详细说明看 BussniessRecordTable
    {
      itemProps: {
        label: '事故经过及原因分析',
        name: 'problem',
      },
    },
    {
      itemProps: {
        label: '事故处理',
        name: 'handle',
      },
    },
    {
      itemProps: {
        label: '事故措施及建议',
        name: 'proposal',
      },
    },
  ];

  const config = [
    {
      itemProps: {
        label: '单号',
        name: 'number',
      },
    },
    {
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    {
      itemProps: {
        label: '类型',
        name: 'type',
      },
    },
    {
      itemProps: {
        label: '户号',
        name: ['electricity_user', 'number'],
      },
    },
    // {
    //   itemProps: {
    //     label: '户名',
    //     name: ['electricity_user', 'householder'],
    //   },
    // },
    {
      itemProps: {
        label: '地址',
        name: 'addr',
      },
    },
    {
      itemProps: {
        label: '是否托管',
        // === 1 是
        name: ['customer', 'type'],
      },
    },
    {
      itemProps: {
        label: '供电电压',
        name: ['electricity_user', 'voltage_level'],
      },
    },
    {
      itemProps: {
        label: '装接容量',
        name: ['electricity_user', 'transformer_capacity'],
      },
    },
    {
      itemProps: {
        label: '用户现场负责人',
        name: 'contacts',
      },
    },
    {
      itemProps: {
        label: '联系电话',
        name: 'contacts_phone',
      },
    },
    // {
    //   itemProps: {
    //     label: '天气情况',
    //     name: '',
    //   },
    // },
    {
      itemProps: {
        label: '施工日期',
        name: 'created_time',
      },
    },
    {
      itemProps: {
        label: '现场抢修负责人',
        name: ['person', 'nickname'],
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <div>
          {[1, 2].map((v, i) => (
            // <img src={v} className="faultImg" key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </div>
      ),
      // file.map((v, i) => <img src={v} className="faultImg" key={i} />),
      itemProps: {
        label: '现场故障照片',
        // devScripts.js:5836 Warning: [antd: Form.Item] `children` is array of render props cannot have `name`.
        // name: '',
      },
    },
    ...(isCompleted ? completedConfig : []),
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' bussniessRecordForm '}>
      <SmartForm
        config={config}
        // config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}

        noRuleAll
        isDisabledAll
        {...props}
      ></SmartForm>

      {isCompleted && (
        <Button type="primary" onClick={this.onBatchRemove}>
          删除
        </Button>
      )}
    </div>
  );
};

BussniessRecordForm.defaultProps = {
  files: [],
  init: {
    file: [],
  },
};

export default BussniessRecordForm;
