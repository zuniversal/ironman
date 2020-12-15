import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //

const MissionsWorkOrderForm = props => {
  console.log(' MissionsWorkOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '客户',
      },
    },
    {
      itemProps: {
        label: '名称',
      },
    },
    {
      itemProps: {
        label: '类型',
      },
    },
    {
      itemProps: {
        label: '分配给',
      },
    },
  ];

  return (
    <div className={' MissionsWorkOrderForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MissionsWorkOrderForm.defaultProps = {};

export default MissionsWorkOrderForm;
