import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import WeakDetailImg from '@/components/Widgets/WeakDetailImg'; //

const WeakForm = props => {
  console.log(' WeakForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    {
      itemProps: {
        label: '电站',
        name: ['station', 'name'],
      },
    },
    {
      itemProps: {
        label: '客户',
        name: ['customer', 'name'],
      },
    },
    {
      itemProps: {
        label: '登记日期',
        name: '',
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
        label: '巡检人',
        name: ['team', 'name'],
      },
    },
    {
      itemProps: {
        label: '巡检组长',
        name: ['team', 'team_headman'],
      },
    },
    {
      itemProps: {
        label: '缺陷描述',
        name: 'content',
      },
    },
    {
      itemProps: {
        label: '使用耗材',
        name: '',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {[1, 2, 3, 4, 5, 6, 7].map((v, i) => (
            <WeakDetailImg key={i}></WeakDetailImg>
          ))}
        </>
      ),
      itemProps: {
        label: '图片',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '备注',
        name: 'remark',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WeakForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        isDisabledAll
        noRuleAll
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

WeakForm.defaultProps = {};

export default WeakForm;
