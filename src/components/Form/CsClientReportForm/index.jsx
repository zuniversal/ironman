import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import { regoins } from '@/configs';
import { formatConfig, reportRadioOp } from '@/utils';

const ClientReportForm = props => {
  console.log(' ClientReportForm ： ', props);

  const { getCapture } = props;

  const config = [
    {
      itemProps: {
        label: '电价类型',
        name: 'bill_type',
      },
    },
    {
      itemProps: {
        label: '客户名称',
        name: 'customer',
      },
    },
    {
      itemProps: {
        label: '电源编号',
        name: 'power_number',
      },
    },
    {
      itemProps: {
        label: '装接总容量',
        name: 'total_capacity',
      },
    },
    {
      itemProps: {
        label: '申报MD',
        name: 'declare_MD',
      },
    },
    {
      itemProps: {
        label: '尖电量1',
        name: 'tip_num_1',
      },
    },
    {
      itemProps: {
        label: '峰电量1 ',
        name: 'peak_num_1',
      },
    },
    {
      itemProps: {
        label: '平电量1',
        name: 'flat_num_1',
      },
    },
    {
      itemProps: {
        label: '谷电量1',
        name: 'valley_num_1',
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
        label: '峰电量2',
        name: 'peak_num_2',
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
        label: '谷电量2',
        name: 'valley_num_2',
      },
    },
    {
      itemProps: {
        label: '其他电量',
        name: 'other_num',
      },
    },
    {
      itemProps: {
        label: '实际MD',
        name: 'real_MD',
      },
    },
    {
      itemProps: {
        label: '代征费用',
        name: 'replace_amount',
      },
    },
    {
      itemProps: {
        label: '力率(%)',
        name: 'force_ratio',
      },
    },
    {
      itemProps: {
        label: '应付账款',
        name: 'accounts_payable',
      },
    },

    {
      itemProps: {
        label: '倍率',
        name: 'magnification',
      },
    },
    // {
    //   itemProps: {
    //     label: '电价类型',
    //     name: 'bill_type',
    //   },
    // },
    {
      itemProps: {
        label: '实际总容量',
        name: 'real_capacity',
      },
    },
    {
      itemProps: {
        label: '基本电价单价',
        name: 'price',
      },
    },
    {
      itemProps: {
        label: '尖电价1',
        name: 'tip_bill_1',
      },
    },
    {
      itemProps: {
        label: '峰电价1',
        name: 'peak_bill_1',
      },
    },
    {
      itemProps: {
        label: '平电价1',
        name: 'flat_bill_1',
      },
    },
    {
      itemProps: {
        label: '谷电价1',
        name: 'valley_bill_1',
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
        label: '峰电价2',
        name: 'peak_bill_2',
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
        label: '谷电价2',
        name: 'valley_bill_2',
      },
    },
    {
      itemProps: {
        label: '其他电价',
        name: 'other_bill',
      },
    },
    {
      itemProps: {
        label: '小计金额',
        name: 'amount',
      },
    },
    {
      itemProps: {
        label: '无功电量',
        name: 'kvarh',
      },
    },
    {
      itemProps: {
        label: '功率因数考核值',
        name: 'power_factor',
      },
    },
    {
      itemProps: {
        label: '力率调整',
        name: 'force_ratio_change',
      },
    },
  ];

  return (
    <div className={''}>
      <SmartForm config={config} {...props}></SmartForm>
    </div>
  );
};

ClientReportForm.defaultProps = {};

export default ClientReportForm;
