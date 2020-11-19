import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //

const choiceRadios = [
  { label: '是', value: 'yes', key: 'yes' },
  { label: '否', value: 'no', key: 'no' },
];

export const WorkOrderDispatchOrderForm = props => {
  console.log(' WorkOrderDispatchOrderForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      formType: 'Search',
      selectSearch: props.getTeamAsync,
      selectData: props.teamList,
      itemProps: {
        label: '分配给',
        name: 'team_id',
      },
      comProps: {
        // mode: 'multiple',
        className: 'w-280',
      },
    },
  ];

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' WorkOrderDispatchOrderForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}
        size={'small'}
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

WorkOrderDispatchOrderForm.defaultProps = {};

export default WorkOrderDispatchOrderForm;
