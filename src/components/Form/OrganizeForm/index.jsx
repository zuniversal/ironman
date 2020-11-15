import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const selectData = [
  {
    label: '部门1',
    value: 'app1',
    children: [
      {
        label: '子部门1',
        value: 'msg1',
        children: [
          {
            label: '子部门111',
            value: 'msg12',
            children: [
              { label: '子部门1222', value: 'msg132' },
              { label: '子部门2333', value: 'email1342' },
            ],
          },
          { label: '子部门2', value: 'email12' },
        ],
      },
      { label: '子部门2', value: 'email1' },
    ],
  },
  {
    label: '部门2',
    value: 'app2',
    children: [
      { label: '子部门1', value: 'msg2' },
      { label: '子部门2', value: 'email2' },
    ],
  },
];

const OrganizeForm = props => {
  console.log(' OrganizeForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  const config = [
    {
      itemProps: {
        label: '部门名称',
        name: 'name',
      },
    },
    // {
    //   formType: 'Select',
    //   itemProps: {
    //     label: '上级部门',
    //     name: 'parent_id',
    //   },
    //   opType: 'group',
    //   selectData: selectData,
    //   // selectData: props.organizeList,
    // },
    {
      noRule: true,
      formType: 'TreeSelect',
      itemProps: {
        label: '上级部门',
        name: 'parent_id',
      },
      comProps: {
        treeData: props.organizeList,
      },
      // opType: 'group',
      selectData: selectData,
      // selectData: props.organizeList,
    },
  ];

  return (
    <div className={' OrganizeForm '}>
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

OrganizeForm.defaultProps = {};

export default OrganizeForm;
