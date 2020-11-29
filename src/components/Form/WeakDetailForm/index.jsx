import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import WeakDetailImg from '@/components/Widgets/WeakDetailImg'; //
import SmartImg from '@/common/SmartImg';

const WeakDetailForm = props => {
  console.log(' WeakDetailForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const { file = [] } = props.init;

  const config = [
    {
      itemProps: {
        label: '名称',
      },
    },
    {
      itemProps: {
        label: '电站',
      },
    },
    {
      itemProps: {
        label: '客户',
      },
    },
    {
      itemProps: {
        label: '登记日期',
      },
    },
    {
      itemProps: {
        label: '状态',
      },
    },
    {
      itemProps: {
        label: '巡检人',
      },
    },
    {
      itemProps: {
        label: '巡检组长',
      },
    },
    {
      itemProps: {
        label: '缺陷描述',
      },
    },
    {
      itemProps: {
        label: '使用耗材',
      },
    },
    {
      formType: 'CustomCom',
      // CustomCom: [1, 2, 3, 4, 5, 6, 7].map((v, i) => (
      //   <WeakDetailImg key={i}></WeakDetailImg>
      // )),
      CustomCom: (
        <>
          {file.map((v, i) => (
            // <img src={v} className={`detailImg`} key={i} />
            <SmartImg src={v} key={i} />
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
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WeakDetailForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        isDisabledAll
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

WeakDetailForm.defaultProps = {};

export default WeakDetailForm;
