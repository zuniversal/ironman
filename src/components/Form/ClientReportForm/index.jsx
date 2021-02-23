import React, { useState } from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { electricTypeConfig } from '@/configs'; //

// 小计金额=所有的电量*电价的和
// 总有功=峰平谷尖+其他电量的和
// 实际考核功率因素=总有功/开根号（无功绝对值的平方+总有功的平方）
// 力率调整=（小计金额-代征费用）*力率
// 总金额=小计金额+力率调整

// 力率就是调整电费那一栏 分为3档
// 然后计算出实际考核功率因素之后，根据容量取对应的调整电费值就是力率
// 调整电费的取值标准看考核功率因素，考核功率因素是0.85就取0.85的标准，是0.9就取0.9的标准

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
      // selectData: electricTypeConfig,
      selectData: props.electricBillList,
      itemProps: {
        label: '电价类型',
        name: 'type',
      },
    },
  ];

  const [dataInit, setDataInit] = useState({
    ...props.init,
  });

  const onUnitChange = (e, keys) => {
    console.log(' onUnitChange ： ', keys, e.target.value, props, dataInit); //

    const formValues = props.propsForm.getFieldsValue();
    const calcRes = calcMoeny(formValues);
    const calcTotalPowerRes = calcTotalPower(formValues);

    // const cos = powerData.total_active_power / powerData.reactive_power_1
    // console.log('  cos ：', cos,  )//
    props.propsForm.setFieldsValue({
      calcMoeny: calcRes,
    });
  };

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
        // name: 'magnification',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '电源编号',
        name: 'electrical_id',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '电价类型',
        // name: 'bill_type',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '装接总容量',
        // name: '',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '实际总容量',
        name: 'capacity',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '申报MD',
        name: 'report_md',
      },
      comProps: {},
    },
    {
      itemProps: {
        label: '基本电价单价',
        name: 'basic_price',
      },
      comProps: {},
    },
    {
      itemProps: {
        label: '尖电量1',
        name: 'tip_volume',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'tip_volume'),
      },
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
      itemProps: {
        label: '峰电量1',
        name: 'peak_volume',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'peak_volume'),
      },
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
      itemProps: {
        label: '平电量1',
        name: 'usual_volume',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'usual_volume'),
      },
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
      itemProps: {
        label: '谷电量1',
        name: 'valley_volume',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'valley_volume'),
      },
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
      itemProps: {
        label: '尖电量2',
        name: 'tip_volume2',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'tip_volume2'),
      },
    },
    {
      itemProps: {
        label: '尖电价2',
        name: 'tip_price2',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'tip_price2'),
      },
    },
    {
      itemProps: {
        label: '峰电量2',
        name: 'peak_volume2',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'peak_volume2'),
      },
    },
    {
      itemProps: {
        label: '峰电价2',
        name: 'peak_price2',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'peak_price2'),
      },
    },
    {
      itemProps: {
        label: '平电量2',
        name: 'usual_volume2',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'usual_volume2'),
      },
    },
    {
      itemProps: {
        label: '平电价2',
        name: 'usual_price2',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'usual_price2'),
      },
    },
    {
      itemProps: {
        label: '谷电量2',
        name: 'valley_volume2',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'valley_volume2'),
      },
    },
    {
      itemProps: {
        label: '谷电价2',
        name: 'valley_price2',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'valley_price2'),
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '其他电量',
        name: 'other_volume',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'other_volume'),
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '其他电价',
        name: 'other_price',
      },
      comProps: {
        onChange: e => onUnitChange(e, 'other_price'),
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际MD',
        name: 'max_md',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '小计金额',
        name: 'calcMoeny',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '代征费用',
        name: 'levy_fee',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '无功电量',
        name: 'idle_volume',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '功率因数实际值',
        name: 'power_factor_real',
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
        name: 'power_factor_adjust',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '力率调整',
        name: 'amount_adjust',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '应付账款',
        name: 'amount',
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
        config={config}
        {...props}
        init={dataInit}
        init={{
          tip_volume: 1,
          tip_price: 1,
          peak_volume: 1,
          peak_price: 1,
          usual_volume: 1,
          usual_price: 1,
          valley_volume: 1,
          valley_price: 1,
          tip_volume2: 1,
          tip_price2: 1,
          peak_volume2: 1,
          peak_price2: 1,
          usual_volume2: 1,
          usual_price2: 1,
          valley_volume2: 1,
          valley_price2: 1,
          other_volume: 1,
          other_price: 1,
        }}
      ></SmartForm>
    </div>
  );
};

ClientReportForm.defaultProps = {};

export default ClientReportForm;
