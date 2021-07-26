import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import SmartImg from '@/common/SmartImg';

const WeakForm = props => {
  console.log(' WeakForm ： ', props);
  const { formBtn, ...rest } = props;
  const { file = [] } = props.init;

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
        name: 'created_time',
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
    // {
    //   itemProps: {
    //     label: '使用耗材',
    //     name: '',
    //   },
    // },
    {
      itemProps: {
        label: '缺陷等级',
        name: 'level',
      },
    },
    {
      itemProps: {
        label: '整改意见',
        name: 'proposal',
      },
    },
    {
      itemProps: {
        label: '缺陷后果',
        name: 'possible_result',
      },
    },
    {
      itemProps: {
        label: '业务跟进情况',
        name: 'follow_up',
      },
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <>
          {file.map((v, i) => (
            // <img src={v} className="detailImg" key={i} />
            <SmartImg src={v} key={i} />
          ))}
        </>
      ),
      itemProps: {
        label: '图片',
      },
    },
    // {
    //   formType: 'TextArea',
    //   itemProps: {
    //     label: '备注',
    //     name: 'remark',
    //   },
    // },
  ];

  return (
    <div className={' WeakForm '}>
      <SmartForm
        config={config}
        isDisabledAll={!['add', 'edit'].includes(props.action)}
        noRuleAll
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

WeakForm.defaultProps = {
  init: {},
};

export default WeakForm;
