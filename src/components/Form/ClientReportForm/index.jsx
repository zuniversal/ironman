import React, { useState } from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { electricTypeConfig, powerRateMap } from '@/configs'; //

// 小计金额=所有的电量*电价的和
// 总有功=峰平谷尖+其他电量的和
// 实际考核功率因素=总有功 / 开根号（ 无功电量 绝对值的平方 + 总有功的平方 ）
// 力率调整 = （ 小计金额 - 代征费用 ） * 力率 / 100
// 总金额 - 应付账款  = 小计金额 + 力率调整

// 力率就是调整电费那一栏 分为3档
// 然后计算出实际考核功率因素之后，根据容量 考核功率因数  取对应的调整电费值就是力率    功率因数考核值 （固定值 ） 匹配 调整电费 栏  三档对应的列就是 力率
// 调整电费的取值标准看考核功率因素，考核功率因素是0.85就取0.85的标准，是0.9就取0.9的标准

// 然后计算出实际考核功率因素之后  用这个值  去匹配  那个表格对应的   功率因素这一列 找到对应行
// 然后 用 考核功率因数   考核功率因素是0.85就取0.85的标准，是0.9就取0.9的标准    电费这一行去拿到对应的  力率 值

const calcMoeny = props => {
  const {
    tip_volume,
    tip_price,
    peak_volume,
    peak_price,
    usual_volume,
    usual_price,
    valley_volume,
    valley_price,
    tip_volume2,
    tip_price2,
    peak_volume2,
    peak_price2,
    usual_volume2,
    usual_price2,
    valley_volume2,
    valley_price2,
    other_volume,
    other_price,
  } = props;

  const calcRes =
    tip_volume * tip_price +
    peak_volume * peak_price +
    usual_volume * usual_price +
    valley_volume * valley_price +
    tip_volume2 * tip_price2 +
    peak_volume2 * peak_price2 +
    usual_volume2 * usual_price2 +
    valley_volume2 * valley_price2 +
    other_volume * other_price;
  console.log(' calcMoeny   props,   ： ', props, calcRes);
  return calcRes;
};

const calcTotalPower = props => {
  const {
    tip_volume,
    peak_volume,
    usual_volume,
    valley_volume,
    tip_volume2,
    peak_volume2,
    usual_volume2,
    valley_volume2,
    other_volume,
  } = props;

  const calcRes =
    tip_volume +
    peak_volume +
    usual_volume +
    valley_volume +
    tip_volume2 +
    peak_volume2 +
    usual_volume2 +
    valley_volume2 +
    other_volume;
  console.log(' calcTotalPower   props,   ： ', props, calcRes);
  return calcRes;
};

const ClientReportForm = props => {
  console.log(' ClientReportForm ： ', props); //

  const [dataInit, setDataInit] = useState({
    tip_volume: 0,
    tip_price: 0,
    peak_volume: 0,
    peak_price: 0,
    usual_volume: 0,
    usual_price: 0,
    valley_volume: 0,
    valley_price: 0,
    tip_volume2: 0,
    tip_price2: 0,
    peak_volume2: 0,
    peak_price2: 0,
    usual_volume2: 0,
    usual_price2: 0,
    valley_volume2: 0,
    valley_price2: 0,
    other_volume: 0,
    other_price: 0,
    ...props.init,
  });

  const onFieldChange = params => {
    console.log(
      ' onFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      props,
    );
    const { value } = params;
    const item = props.electricBillList.find(v => v.id == value.type);
    console.log(' item  props.electricBillList.filter v ： ', item);
    const setFields = {
      ...dataInit,
    };
    if (item) {
      setFields.basic_price = item.base_prise;
      setFields.tip_price = item.tip_prise;
      setFields.peak_price = item.peak_prise;
      setFields.usual_price = item.flat_prise;
      setFields.valley_price = item.valley_prise;
      setFields.bill_type = item.name;
    } else {
      setFields.basic_price = 0;
      setFields.tip_price = 0;
      setFields.peak_price = 0;
      setFields.usual_price = 0;
      setFields.valley_price = 0;
      setFields.bill_type = '';
    }
    console.log(' setFields ： ', setFields); //
    props.propsForm.setFieldsValue(setFields);
  };

  const selectConfig = [
    {
      noRule: true,
      formType: 'Select',
      // selectData: electricTypeConfig,
      selectData: props.electricBillList,
      itemProps: {
        label: '电价类型',
        name: 'type',
      },
    },
  ];

  const onUnitChange = (e, keys) => {
    console.log(' onUnitChange ： ', keys, props, dataInit); //
  };

  const factorRow = powerRateMap['0.90'];
  const factor = factorRow['0.90'];
  console.log(' factor ： ', factorRow, factor); //

  const onFormFieldChange = params => {
    console.log(
      ' onFormFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      props,
    );
    const formValues = props.propsForm.getFieldsValue();
    const { power_factor, levy_fee, idle_volume = 0 } = formValues;

    // 小计金额=所有的电量*电价的和
    const calcRes = calcMoeny(formValues);
    // 总有功=峰平谷尖+其他电量的和
    const calcTotalPowerRes = calcTotalPower(formValues);
    // 实际考核功率因素=总有功/开根号（ 无功电量 绝对值的平方+总有功的平方）
    const capcitySum =
      idle_volume * idle_volume + calcTotalPowerRes * calcTotalPowerRes;
    const calcRealFactorRes = (
      calcTotalPowerRes / Math.sqrt(capcitySum)
    ).toFixed(2);
    // 拿到对应的  力率 栏 和 值
    // const factorRow = powerRateMap['0.90']
    const factorRow = powerRateMap[calcRealFactorRes];
    const setFields = {
      calcMoeny: calcRes,
      power_factor_real: calcRealFactorRes,
    };
    console.log(
      ' calcRes, , , ,  ： ',
      formValues,
      calcRes,
      calcTotalPowerRes,
      capcitySum,
      calcRealFactorRes,
      factorRow,
    ); //
    if (power_factor && factorRow) {
      const factor = factorRow[`${power_factor}`];
      setFields.power_factor_adjust = factor;
      if (factor) {
        // 力率调整 = （ 小计金额 - 代征费用 ） * 力率 / 100
        const amountAdjust = (((calcRes - levy_fee) / 100) * factor).toFixed(2);
        // 总金额 - 应付账款  = 小计金额 + 力率调整
        const amount = calcRes + amountAdjust;
        setFields.amount_adjust = amountAdjust;
        setFields.amount = amount;
        console.log(
          ' power_factor, levy_fee, idle_volume ： ',
          power_factor,
          levy_fee,
          idle_volume,
          amountAdjust,
          amount,
          factor,
        ); //
      }
    }
    props.propsForm.setFieldsValue(setFields);
  };

  const config = [
    {
      noRule: true,
      itemProps: {
        label: '客户名称',
        name: 'customer',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '倍率',
        name: 'magnification',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '电源编号',
        name: 'electrical_id',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      // colCls: 'hidden',
      itemProps: {
        label: '电价类型',
        name: 'bill_type',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '装接总容量',
        name: 'transformer_capacity',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际总容量',
        name: 'capacity',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '申报MD',
        name: 'report_md',
      },
      comProps: {},
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '基本电价单价',
        name: 'basic_price',
      },
      comProps: {},
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '尖电量1',
        name: 'tip_volume',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'tip_volume'),
      // },
    },
    {
      noRule: true,
      itemProps: {
        label: '尖电价1',
        name: 'tip_price',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '峰电量1',
        name: 'peak_volume',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'peak_volume'),
      // },
    },
    {
      noRule: true,
      itemProps: {
        label: '峰电价1',
        name: 'peak_price',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '平电量1',
        name: 'usual_volume',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'usual_volume'),
      // },
    },
    {
      noRule: true,
      itemProps: {
        label: '平电价1',
        name: 'usual_price',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '谷电量1',
        name: 'valley_volume',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'valley_volume'),
      // },
    },
    {
      noRule: true,
      itemProps: {
        label: '谷电价1',
        name: 'valley_price',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '尖电量2',
        name: 'tip_volume2',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'tip_volume2'),
      // },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '尖电价2',
        name: 'tip_price2',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'tip_price2'),
      // },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '峰电量2',
        name: 'peak_volume2',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'peak_volume2'),
      // },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '峰电价2',
        name: 'peak_price2',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'peak_price2'),
      // },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '平电量2',
        name: 'usual_volume2',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'usual_volume2'),
      // },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '平电价2',
        name: 'usual_price2',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'usual_price2'),
      // },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '谷电量2',
        name: 'valley_volume2',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'valley_volume2'),
      // },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '谷电价2',
        name: 'valley_price2',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'valley_price2'),
      // },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '其他电量',
        name: 'other_volume',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'other_volume'),
      // },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '其他电价',
        name: 'other_price',
      },
      // comProps: {
      //   onChange: e => onUnitChange(e, 'other_price'),
      // },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际MD',
        name: 'max_md',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '小计金额',
        name: 'calcMoeny',
      },
    },
    {
      formType: 'InputNumber',
      itemProps: {
        label: '代征费用',
        name: 'levy_fee',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '无功电量',
        name: 'idle_volume',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '功率因数实际值',
        name: 'power_factor_real',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
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
      formType: 'InputNumber',
      itemProps: {
        label: '力率（%）',
        name: 'power_factor_adjust',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '力率调整',
        name: 'amount_adjust',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '应付账款',
        name: 'amount',
      },
    },
    {
      noRule: true,
      formType: 'MonthPicker',
      itemProps: {
        label: '年月',
        name: 'year_month',
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
        className={`billForm`}
      ></SmartForm>

      <SmartForm
        flexRow={2}
        {...props}
        config={config}
        init={dataInit}
        init={{
          ...dataInit,

          // power_factor: '0.85',
          // idle_volume: 10,
          // levy_fee: 100,
        }}
        onFieldChange={onFormFieldChange}
      ></SmartForm>
    </div>
  );
};

ClientReportForm.defaultProps = {};

export default ClientReportForm;
