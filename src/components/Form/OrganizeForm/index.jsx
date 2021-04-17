import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm';
import { regoins, treeList } from '@/configs';
import { formatConfig } from '@/utils';

const OrganizeForm = props => {
  console.log(' OrganizeForm ： ', props);
  const { formBtn, ...rest } = props;

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
      // selectData: treeList,
      // selectData: props.organizeList,
    },
  ];

  return (
    <div className={' OrganizeForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

OrganizeForm.defaultProps = {};

export default OrganizeForm;
