import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const BussniessRecordForm = props => {
  console.log(' BussniessRecordForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '单号',
        name: '',
      },
    },
    {
      itemProps: {
        label: '状态',
        name: '',
      },
    },
    {
      itemProps: {
        label: '类型',
        name: '',
      },
    },
    {
      itemProps: {
        label: '户号',
        name: '',
      },
    },
    {
      itemProps: {
        label: '户名',
        name: '',
      },
    },
    {
      itemProps: {
        label: '地址',
        name: '',
      },
    },
    {
      itemProps: {
        label: '是否托管',
        name: '',
      },
    },
    {
      itemProps: {
        label: '供电电压',
        name: '',
      },
    },
    {
      itemProps: {
        label: '装接容量',
        name: '',
      },
    },
    {
      itemProps: {
        label: '用户现场负责人',
        name: '',
      },
    },
    {
      itemProps: {
        label: '联系电话',
        name: '',
      },
    },
    {
      itemProps: {
        label: '天气情况',
        name: '',
      },
    },
    {
      itemProps: {
        label: '施工日期',
        name: '',
      },
    },
    {
      itemProps: {
        label: '现场抢修负责人',
        name: '',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom:
        // props.init.files.map((v, i) => <img src={v} className="faultImg" key={i}  />)
        [1, 2].map((v, i) => <img src={v} className="faultImg" key={i} />),
      itemProps: {
        label: '现场故障照片',
        name: 'task_log',
      },
    },
    {
      itemProps: {
        label: '事故经过及原因分析',
        name: '',
      },
    },
    {
      itemProps: {
        label: '事故处理',
        name: '',
      },
    },
    {
      itemProps: {
        label: '事故反措及建议',
        name: '',
      },
    },
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
    </div>
  );
};

BussniessRecordForm.defaultProps = {
  files: [],
};

export default BussniessRecordForm;
