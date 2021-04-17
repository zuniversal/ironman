import React from 'react';
import './style.less';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import InspectMissionSearchForm from '@/components/Form/InspectMissionSearchForm';
import { Button } from 'antd';
import { regoins } from '@/configs';
import { formatConfig, reportRadioOp } from '@/utils';

const billFormLayouts = {
  labelCol: {
    sm: { span: 4 }, //
  },
  wrapperCol: {
    sm: { span: 20 }, //
  },
};

const OptionsItem = props =>
  props.config.map((item, i) => (
    <div className={'row'} key={i}>
      <div className={'item opLabel'}>{item.label}：</div>
      <div className={'item opValue'}>{props.val[item.value]}</div>
    </div>
  ));

export const priceConfig1 = [
  {
    label: '峰电价1',
    value: 'peak_prise',
  },
  {
    label: '平电价1',
    value: 'flat_prise',
  },
  {
    label: '基本电价单价',
    value: 'base_prise',
  },
];

const ClientReportSearchForm = props => {
  console.log(' ClientReportSearchForm ： ', props);

  const config = [
    {
      formType: 'MonthPicker',
      itemProps: {
        label: '选择月份',
        name: 'year_month',
      },
    },
    {
      noLabel: true,
      itemProps: {
        label: '户号/客户名称/客户代表/巡检组长/电源编号',
        name: 'filter',
      },
      comProps: {
        className: 'keywordInput',
      },
    },
    // {
    //   noRule: true,
    //   formType: 'Select',
    //   selectData: [
    //     {
    //       value: '2',
    //       label: '电流',
    //     },
    //     {
    //       value: '3',
    //       label: '负载',
    //     },
    //   ].map(v => ({
    //     ...v,
    //     label: <div className={'optionWrapper'}>
    //       <div className={'label'}>
    //         {v.label}
    //       </div>
    //       <div className={'opInfo'}>
    //         <div className={'left'}>
    //           <OptionsItem val={v} config={priceConfig1}></OptionsItem>
    //         </div>
    //         <div className={'right'}>
    //           <OptionsItem val={v} config={priceConfig1}></OptionsItem>
    //         </div>
    //       </div>
    //     </div>,
    //     label: <div className={'selectOpWrapper'}>
    //       <div>
    //         <InspectMissionSearchForm></InspectMissionSearchForm>
    //       </div>
    //       <div>
    //         <Button type="primary">搜索</Button>
    //         <Button>清空</Button>
    //         <Button>确认</Button>
    //       </div>
    //       {props.table}

    //     </div>,
    //   })),
    //   itemProps: {
    //     label: '电价类型',
    //     name: 'type',
    //     className: 'panelSelect',
    //     // ...billFormLayouts,
    //   },
    //   comProps: {
    //     className: 'panelInput w100',
    //     optionFilterProp: 'label',
    //     // filterOption: (input, option) => {
    //     //   // console.log('input, option ：', input, option, props,   )
    //     //   const res = option.children.props.children[0].props.children.toLowerCase().includes(input.toLowerCase())
    //     //   console.log('  res ：', res);
    //     //   return res
    //     // }
    //   },
    // },

    // {
    //   itemProps: {
    //     label: ' 户号',
    //     name: 'number',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '客户名称',
    //     name: 'name',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '客户代表',
    //     name: 'service_staff_name',
    //   },
    // },
    // {
    //   itemProps: {
    //     label: '巡检组长',
    //     name: 'service_team_name',
    //   },
    // },
    // {
    //   formType: 'Select',
    //   itemProps: {
    //     label: '是否加急',
    //     name: '',
    //   },
    // },
  ];

  return (
    <div className={''}>
      <SearchForm
        config={config}
        className={'clientReportSearchForm'}
        {...props}
      ></SearchForm>
    </div>
  );
};

ClientReportSearchForm.defaultProps = {};

export default ClientReportSearchForm;
