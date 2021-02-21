import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { electricTypeConfig } from '@/configs'; //

const ClientReportForm = props => {
  console.log(' ClientReportForm ： ', props); //

  const onFieldChange = params => {
    console.log(
      ' onFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      props,
    );
    const { value } = params;
    // props.getListAsync(params.formData);
  };
  const selectConfig = [
    {
      formType: 'Select',
      selectData: electricTypeConfig,
      itemProps: {
        label: '电价类型',
        name: 'type',
      },
    },
  ];

  const config = [
    {
      itemProps: {
        label: '客户名称',
        name: 'customer',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '倍率',
        name: 'magnification',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '电源编号',
        name: 'power_number',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '电价类型',
        name: 'bill_type',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '装接总容量',
        name: 'total_capacity',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '实际总容量',
        name: 'real_capacity',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '申报MD',
        name: 'declare_MD',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '基本电价单价',
        name: 'price',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '尖电量1',
        name: 'tip_num_1',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '尖电价1',
        name: 'tip_bill_1',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '峰电量1',
        name: 'peak_num_1',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '峰电价1',
        name: 'peak_bill_1',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '平电量1',
        name: 'flat_num_1',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平电价1',
        name: 'flat_bill_1',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '谷电量1',
        name: 'valley_num_1',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '谷电价1',
        name: 'valley_bill_1',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '尖电量2',
        name: 'tip_num_2',
      },
    },
    {
      itemProps: {
        label: '尖电价2',
        name: 'tip_bill_2',
      },
    },
    {
      itemProps: {
        label: '峰电量2',
        name: 'peak_num_2',
      },
    },
    {
      itemProps: {
        label: '峰电价2',
        name: 'peak_bill_2',
      },
    },
    {
      itemProps: {
        label: '平电量2',
        name: 'flat_num_2',
      },
    },
    {
      itemProps: {
        label: '平电价2',
        name: 'flat_bill_2',
      },
    },
    {
      itemProps: {
        label: '谷电量2',
        name: 'valley_num_2',
      },
    },
    {
      itemProps: {
        label: '谷电价2',
        name: 'valley_bill_2',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '其他电量',
        name: 'other_num',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '其他电价',
        name: 'other_bill',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际MD',
        name: 'real_MD',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '小计金额',
        name: 'amount',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '代征费用',
        name: 'replace_amount',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '无功电量',
        name: 'kvarh',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '功率因数实际值',
        name: '',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '功率因数考核值',
        name: 'power_factor',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '力率（%）',
        name: 'force_ratio',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '力率调整',
        name: 'force_ratio_change',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '应付账款',
        name: 'accounts_payable',
      },
    },
  ].map(v => ({
    ...v,
    comProps: { className: 'w-240', ...v.comProps },
  }));

  return (
    <div className={''}>
      <SmartForm
        config={selectConfig}
        onFieldChange={onFieldChange}
      ></SmartForm>

      <SmartForm flexRow={2} config={config} {...props}></SmartForm>
    </div>
  );
};

ClientReportForm.defaultProps = {};

export default ClientReportForm;
