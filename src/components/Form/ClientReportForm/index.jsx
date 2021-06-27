import React, { useState, useEffect } from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm';
import { powerRateMap, billTypeConfig } from '@/configs';
import useHttp from '@/hooks/useHttp';
import { getBillType } from '@/services/electricBill';
import { formatSelectList, filterObjSame } from '@/utils';
import { Form } from 'antd';
import { INIT_BILL_TYPE } from '@/constants';

// ** 如果有改变计算公式涉及到的输入框的值 就以当前输入的值计算

// 应付账款 = 市场化差额退补 + 防疫优惠电费 + 其他金额 + 小计金额 + 利率调整
// 基本电费金额 = 基本电费计费 * 基本电价单价

// 小计金额=所有的电量*电价的和+ 基本电费
// 总有功=峰平谷尖+其他电量的和
// 实际考核功率因素=总有功 / 开根号（ 无功电量 绝对值的平方 + 总有功的平方 ）
// 力率调整 = （ 小计金额 - 代征费用 ） * 力率 / 100  +  基本电费
// 总金额 即 应付账款  = 小计金额 + 力率调整  +  基本电费

// 根据返回的 billing_method  这个 就是 基本电价计费方式 0和1不需要计算基本电费
// 基本电费 =
//   按变压器容量收费：
//     变压器实际总容量 * 基本电价；
//   按实际最大需量计费：
//     最大md （实际md） * 基本电价；
//   按合同最大需量计：
//     if 最大md - 申报md * 1.05 > 0:
//       基本电费 =（ 最大md - 申报md * 1.05 ） * 基本电价 * 2 + 申报md * 1.05 * 基本电价
//     else:
//       基本电费 = 申报md * 基本电价

// 力率就是调整电费那一栏 分为3档
// 然后计算出实际考核功率因素之后，根据容量 考核功率因数  取对应的调整电费值就是力率    功率因数考核值 （固定值 ） 匹配 调整电费 栏  三档对应的列就是 力率
// 调整电费的取值标准看考核功率因素，考核功率因素是0.85就取0.85的标准，是0.9就取0.9的标准

// 然后计算出实际考核功率因素之后  用这个值  去匹配  那个表格对应的   功率因素这一列 找到对应行
// 然后 用 考核功率因数   考核功率因素是0.85就取0.85的标准，是0.9就取0.9的标准    电费这一行去拿到对应的  力率 值

const billFormLayouts = {
  labelCol: {
    sm: { flexRow: 4 }, //
  },
  wrapperCol: {
    sm: { flexRow: 20 }, //
  },
};

const formLayouts = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 12 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 12 }, //
  },
};

export const priceSearchConfig = [
  'label',
  'peak_prise',
  'flat_prise',
  'base_prise',
  'tip_prise',
  'valley_prise',
];

export const priceConfig1 = [
  {
    label: '峰电价1',
    value: 'peak_prise',
  },
  {
    label: '谷电价1',
    value: 'valley_prise',
  },
  {
    label: '基本电价单价',
    value: 'base_prise',
  },
];

export const priceConfig2 = [
  {
    label: '平电价1',
    value: 'flat_prise',
  },
  {
    label: '尖电价1',
    value: 'tip_prise',
  },
];

const placeholderItem = {
  noRule: true,
  formType: 'plainText',
  itemProps: {
    label: '',
  },
};

export const placeholderItems = [placeholderItem, placeholderItem];

const calcAllMoenyVal = props => {
  const basic_volume = props.basic_volume ?? 0;
  const basic_price = props.basic_price ?? 0;
  const tip_volume = props.tip_volume ?? 0;
  const tip_price = props.tip_price ?? 0;
  const peak_volume = props.peak_volume ?? 0;
  const peak_price = props.peak_price ?? 0;
  const usual_volume = props.usual_volume ?? 0;
  const usual_price = props.usual_price ?? 0;
  const valley_volume = props.valley_volume ?? 0;
  const valley_price = props.valley_price ?? 0;
  const tip_volume2 = props.tip_volume2 ?? 0;
  const tip_price2 = props.tip_price2 ?? 0;
  const peak_volume2 = props.peak_volume2 ?? 0;
  const peak_price2 = props.peak_price2 ?? 0;
  const usual_volume2 = props.usual_volume2 ?? 0;
  const usual_price2 = props.usual_price2 ?? 0;
  const valley_volume2 = props.valley_volume2 ?? 0;
  const valley_price2 = props.valley_price2 ?? 0;
  const other_volume = props.other_volume ?? 0;

  return {
    basicMoney: Number((basic_volume * basic_price).toFixed(2)),
    tip_price_money: Number((tip_volume * tip_price).toFixed(2)),
    peak_price_money: Number((peak_volume * peak_price).toFixed(2)),
    usual_price_money: Number((usual_volume * usual_price).toFixed(2)),
    valley_price_money: Number((valley_volume * valley_price).toFixed(2)),
    tip_price2_money: Number((tip_volume2 * tip_price2).toFixed(2)),
    peak_price2_money: Number((peak_volume2 * peak_price2).toFixed(2)),
    usual_price2_money: Number((usual_volume2 * usual_price2).toFixed(2)),
    valley_price2_money: Number((valley_volume2 * valley_price2).toFixed(2)),
  };
};

const calcMoenyVal = props => {
  const tip_volume = props.tip_volume ? props.tip_volume : 0;
  const tip_price = props.tip_price ? props.tip_price : 0;
  const peak_volume = props.peak_volume ? props.peak_volume : 0;
  const peak_price = props.peak_price ? props.peak_price : 0;
  const usual_volume = props.usual_volume ? props.usual_volume : 0;
  const usual_price = props.usual_price ? props.usual_price : 0;
  const valley_volume = props.valley_volume ? props.valley_volume : 0;
  const valley_price = props.valley_price ? props.valley_price : 0;
  const tip_volume2 = props.tip_volume2 ? props.tip_volume2 : 0;
  const tip_price2 = props.tip_price2 ? props.tip_price2 : 0;
  const peak_volume2 = props.peak_volume2 ? props.peak_volume2 : 0;
  const peak_price2 = props.peak_price2 ? props.peak_price2 : 0;
  const usual_volume2 = props.usual_volume2 ? props.usual_volume2 : 0;
  const usual_price2 = props.usual_price2 ? props.usual_price2 : 0;
  const valley_volume2 = props.valley_volume2 ? props.valley_volume2 : 0;
  const valley_price2 = props.valley_price2 ? props.valley_price2 : 0;
  const other_volume = props.other_volume ? props.other_volume : 0;
  // const other_price = props.other_price ? props.other_price : 0;

  const calcRes =
    tip_volume * tip_price +
    peak_volume * peak_price +
    usual_volume * usual_price +
    valley_volume * valley_price +
    tip_volume2 * tip_price2 +
    peak_volume2 * peak_price2 +
    usual_volume2 * usual_price2 +
    valley_volume2 * valley_price2;
  // + other_volume * other_price;
  console.log(' calcMoenyVal   props,   ： ', props, calcRes);
  return calcRes;
};

const mdKeyConfig = ['peak_md', 'usual_md1', 'usual_md2', 'valley_md'];

const calcMaxMd = params => {
  const { changeKey, formValues } = params;
  const isChangeMdItem = mdKeyConfig.some(v => v == changeKey);
  console.log(' calcMaxMd   props,   ： ', params, isChangeMdItem);
  const maxMDValArr = [];
  mdKeyConfig.forEach(v => maxMDValArr.push(formValues[v]));
  const maxMDVal = Math.max(...maxMDValArr);
  console.log(' calcMaxMd   maxMDValArr,   ： ', maxMDValArr, maxMDVal);
  return isChangeMdItem ? maxMDVal : formValues.max_md;
};

const calcTotalPower = props => {
  const tip_volume = props.tip_volume ?? 0;
  const peak_volume = props.peak_volume ?? 0;
  const usual_volume = props.usual_volume ?? 0;
  const valley_volume = props.valley_volume ?? 0;
  const tip_volume2 = props.tip_volume2 ?? 0;
  const peak_volume2 = props.peak_volume2 ?? 0;
  const usual_volume2 = props.usual_volume2 ?? 0;
  const valley_volume2 = props.valley_volume2 ?? 0;
  const other_volume = props.other_volume ?? 0;

  const calcRes =
    tip_volume +
    peak_volume +
    usual_volume +
    valley_volume +
    tip_volume2 +
    peak_volume2 +
    usual_volume2 +
    valley_volume2;
  // + other_volume;
  console.log(' calcTotalPower   props,   ： ', props, calcRes);
  return calcRes;
};

const OptionsItem = props =>
  props.config.map((item, i) => (
    <div className={'row'} key={i}>
      <div className={'item opLabel'}>{item.label}：</div>
      <div className={'item opValue'}>{props.val[item.value]}</div>
    </div>
  ));

const ClientReportForm = props => {
  console.log(' ClientReportForm ： ', props);

  const initBillType =
    props.action === 'addElectricBillItemAsync' ? INIT_BILL_TYPE : null;

  const [dataInit, setDataInit] = useState({
    // tip_volume: 0,
    // tip_price: 0,
    // peak_volume: 0,
    // peak_price: 0,
    // usual_volume: 0,
    // usual_price: 0,
    // valley_volume: 0,
    // valley_price: 0,
    // tip_volume2: 0,
    // tip_price2: 0,
    // peak_volume2: 0,
    // peak_price2: 0,
    // usual_volume2: 0,
    // usual_price2: 0,
    // valley_volume2: 0,
    // valley_price2: 0,
    // other_volume: 0,
    // other_price: 0,

    // calcMoeny: 0,
    idle_volume: 0,
    levy_fee: 0,
    max_md: 0,
    report_md: 0,
    basic_price: 0,
    power_factor_adjust: 0,
    ...props.init,
    billing_method: '3',
    billing_type: initBillType,
    amount_adjust: props.init.amount_adjust ?? 0,

    refund_and_supplement_of_difference:
      props.init.refund_and_supplement_of_difference ?? 0,
    epidemic_discount: props.init.epidemic_discount ?? 0,
    other_amount: props.init.other_amount ?? 0,
    peak_md: props.init.peak_md ?? 0,
    usual_md1: props.init.usual_md1 ?? 0,
    usual_md2: props.init.usual_md2 ?? 0,
    valley_md: props.init.valley_md ?? 0,
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
      // ...dataInit,
      ...props.propsForm.getFieldsValue(),
    };
    if (item) {
      setFields.basic_price = item.base_prise;
      setFields.tip_price = item.tip_prise;
      setFields.peak_price = item.peak_prise;
      setFields.usual_price = item.flat_prise;
      setFields.valley_price = item.valley_prise;
      setFields.tip_price2 = item.tip_prise;
      setFields.peak_price2 = item.peak_prise;
      setFields.usual_price2 = item.flat_prise;
      setFields.valley_price2 = item.valley_prise;
      // setFields.billing_type = item.name;
      setFields.billing_type = `${item.id}`;
    } else {
      setFields.basic_price = 0;
      setFields.tip_price = 0;
      setFields.peak_price = 0;
      setFields.usual_price = 0;
      setFields.valley_price = 0;
      setFields.tip_price2 = 0;
      setFields.peak_price2 = 0;
      setFields.usual_price2 = 0;
      setFields.valley_price2 = 0;
      setFields.billing_type = '';
    }
    console.log(' setFields ： ', setFields);
    props.propsForm.setFieldsValue(setFields);
    autoCalc();
  };

  const [form] = Form.useForm();

  const selectConfig = [
    {
      noRule: true,
      formType: 'Select',
      // selectData: billTypeConfig,
      selectData: props.electricBillList,
      selectData: props.electricBillList.map(v => ({
        ...v,
        label: (
          <div className={'optionWrapper'} {...v}>
            <div className={'label'}>{v.label}</div>
            <div className={'opInfo'}>
              <div className={'left'}>
                <OptionsItem val={v} config={priceConfig1}></OptionsItem>
                {/* {priceConfig1.map((item, i) => <div className={'row'} key={i}>
                <div className={'item opLabel'}>
                  {item.label}：
                </div>
                <div className={'item opValue'}>
                  {v[item.value]}
                </div>
              </div>)} */}
              </div>
              <div className={'right'}>
                <OptionsItem val={v} config={priceConfig2}></OptionsItem>
                {/* {priceConfig2.map((item, i) => <div className={'row'} key={i}>
                <div className={'item opLabel'}>
                  {item.label}：
                </div>
                <div className={'item opValue'}>
                  {v[item.value]}
                </div>
              </div>)} */}
              </div>
            </div>
          </div>
        ),
      })),
      itemProps: {
        label: '电价类型',
        name: 'type',
        className: 'priceTypeForm',
        ...billFormLayouts,
      },
      comProps: {
        className: 'priceType',
        optionFilterProp: 'label',
        filterOption: (input, option) => {
          // console.log('input, option ：', input, option, props,   )
          // const res = input.split(' ').some(v => option.children.props.children[0].props.children
          //   .toLowerCase()
          //   .includes(v.toLowerCase()));
          const res = input
            .split(' ')
            .some(v =>
              priceSearchConfig.some(key =>
                `${option.children.props[key]}`.includes(v.toLowerCase()),
              ),
            );
          // console.log('  res ：', input, option, res, );
          return res;
        },
      },
    },
  ];

  const onUnitChange = (e, keys) => {
    console.log(' onUnitChange ： ', keys, props, dataInit);
  };

  const factorRow = powerRateMap['0.90'];
  const factor = factorRow['0.90'];
  console.log(' factor ： ', factorRow, factor);

  // 如果有 changeKey 对应的改变键 那以输入的改变的该值进行设置
  const autoCalc = changeKey => {
    console.log(' autoCalc   ,   ： ', changeKey);
    const formValues = props.propsForm.getFieldsValue();
    const {
      power_factor,
      levy_fee,
      calcMoeny,
      power_factor_real,
      power_factor_adjust,
      amount_adjust,
      amount,
      billing_method,
      max_md,
      report_md,
      basic_volume,
      basic_price,
      idle_volume = 0,
      capacity,
      refund_and_supplement_of_difference,
      epidemic_discount,
      other_amount,
    } = formValues;

    // 旧版 基本电费计算公式
    let basePriceRes = 0;
    if (billing_method == '2') {
      basePriceRes = capacity * basic_price;
    } else if (billing_method == '3' || billing_method == '0') {
      basePriceRes = max_md * basic_price;
    } else if (billing_method == '4') {
      const subVal = max_md - report_md * 1.05;
      console.log(' subVal ： ', subVal);
      if (subVal > 0) {
        basePriceRes =
          subVal * basic_price * 2 + report_md * 1.05 * basic_price;
      } else {
        basePriceRes = report_md * basic_price;
      }
    } else {
      basePriceRes = 0;
    }

    const calcAllMoenyValRes = calcAllMoenyVal(formValues);
    console.log('  calcAllMoenyValRes ：', calcAllMoenyValRes); //

    // 小计金额=所有的电量*电价的和+ 基本电费
    // const calcRes = (calcMoenyVal(formValues) + Number(calcAllMoenyValRes.basicMoney) + basePriceRes).toFixed(2);
    const calcRes = (
      calcMoenyVal(formValues) + Number(calcAllMoenyValRes.basicMoney)
    ).toFixed(2);
    // 总有功=峰平谷尖+其他电量的和
    const calcTotalPowerRes = calcTotalPower(formValues);
    // 实际考核功率因素=总有功/开根号（ 无功电量 绝对值的平方+总有功的平方）
    const capcitySum =
      idle_volume * idle_volume + calcTotalPowerRes * calcTotalPowerRes;
    const calcRealFactorValue =
      changeKey === 'power_factor_real'
        ? power_factor_real
        : calcTotalPowerRes / Math.sqrt(capcitySum);
    const calcRealFactorRes = (isNaN(calcRealFactorValue)
      ? 0
      : calcRealFactorValue
    ).toFixed(2);
    // 拿到对应的  力率 栏 和 值
    // const factorRow = powerRateMap['0.90']
    const factorRow = powerRateMap[calcRealFactorRes];

    const initFields = {
      calcMoeny: calcRes,
      ...calcAllMoenyValRes,
    };
    const setFields = {
      ...initFields,
      calcMoeny: changeKey === 'calcMoeny' ? calcMoeny : calcRes,
      // power_factor_real:
      //   changeKey === 'power_factor_real'
      //     ? power_factor_real
      //     : calcRealFactorRes,
      power_factor_real: calcRealFactorRes,
      max_md: calcMaxMd({
        formValues,
        changeKey,
      }),
    };

    // 如果是初始化 计算 小计金额
    if (changeKey === 'init') {
      props.propsForm.setFieldsValue(initFields);
      console.log(' 初始化 计算  ： ', initFields);
      return;
    }

    console.log(
      ' calcRes, , , ,  ： ',
      billing_method,
      formValues,
      calcMoeny,
      calcRes,
      calcTotalPowerRes,
      capcitySum,
      power_factor_real,
      calcRealFactorValue,
      calcRealFactorRes,
      factorRow,
      basePriceRes,
      power_factor_adjust,
    );
    // if (power_factor && factorRow) {
    const factorRes =
      changeKey === 'power_factor_adjust'
        ? power_factor_adjust
        : (factorRow && factorRow[`${power_factor}`]) || power_factor_adjust;

    setFields.power_factor_adjust =
      changeKey === 'power_factor_adjust' ? power_factor_adjust : factorRes;

    // if (factorRes) {
    // 力率调整 = （ 小计金额 - 代征费用 ） * 力率 / 100  +  基本电费
    const amountAdjust =
      changeKey === 'amount_adjust'
        ? amount_adjust
        : (((Number(calcRes) - levy_fee) / 100) * factorRes).toFixed(2);

    // 总金额 即 应付账款  = 小计金额 + 力率调整  +  基本电费
    // 应付账款 = 市场化差额退补 + 防疫优惠电费 + 其他金额 + 小计金额 + 利率调整
    const amountRes = (
      Number(calcRes) +
      Number(amountAdjust) +
      Number(refund_and_supplement_of_difference) +
      Number(epidemic_discount) +
      Number(other_amount)
    ).toFixed(2);

    setFields.amount_adjust =
      changeKey === 'amount_adjust'
        ? amount_adjust
        : Number(amountAdjust)
        ? amountAdjust
        : amount_adjust;
    setFields.amount = changeKey === 'amount' ? amount : amountRes;

    console.log(
      ' power_factor, levy_fee, idle_volume ： ',
      Number(calcAllMoenyValRes.basicMoney),
      Number(calcRes),
      Number(amountAdjust),
      basePriceRes,
      power_factor,
      levy_fee,
      idle_volume,
      amountAdjust,
      amountRes,
      factorRes,
      refund_and_supplement_of_difference,
      epidemic_discount,
      other_amount,
    );
    // }
    // }
    props.propsForm.setFieldsValue(setFields);
  };

  // const getBillTypeReq = () => {
  //   console.log(' req   ,   ： ',   )
  // }
  const onBillTypeChange = e => {
    console.log(' onBillTypeChange   e,   ： ', e);
  };
  // const commonParams = {
  //   init: {},
  //   attr: 'bean',
  //   format: null,
  //   // format: res => formatSelectList(res),
  // };
  // const { data: billTypeList, req: getBillTypeAsync } = useHttp(
  //   () => getBillType({
  //     ele_user: props.init.electricity_user_id,
  //   }),
  //   {
  //     ...commonParams,
  //     // format: res => formatSelectList(res, 'power_number'),
  //   },
  // );
  // console.log(' billTypeList ： ', billTypeList,  )//
  const getBillTypeReq = async () => {
    console.log('  getBillTypeReq  ：', props); //
    const res = (
      await getBillType({
        ele_user: props.init.electricity_user_id,
        // ele_user: props.electricity_user_id,
      })
    ).bean;

    if (res) {
      const { billing_method, billing_type } = res;

      console.log(
        '  getBillTypeReq res await 结果  ：',
        res,
        billing_type && billing_type.name,
      ); //
      // return
      if (billing_type && billing_type.name) {
        props.propsForm.setFieldsValue({
          basic_price: billing_type.base_prise,
          tip_price: billing_type.tip_prise,
          peak_price: billing_type.peak_prise,
          usual_price: billing_type.flat_prise,
          valley_price: billing_type.valley_prise,
          tip_price2: billing_type.tip_prise,
          peak_price2: billing_type.peak_prise,
          usual_price2: billing_type.flat_prise,
          valley_price2: billing_type.valley_prise,
          // billing_type: billing_type.name,
          billing_type: `${billing_type.id}`,
        });
        form.setFieldsValue({ type: `${billing_type.id}` });
      }
      // if (billing_method) {
      //   form.setFieldsValue({ type: `${billing_method}` });
      // }
    }

    // autoCalc();
    autoCalc('init');
  };

  useEffect(() => {
    console.log(
      ' ClientReportForm ： ',
      props,
      dataInit,
      props.propsForm.getFieldsValue(),
    );
    // autoCalc();
    if (props.action === 'addElectricBillItemAsync') {
      onFieldChange({ value: { type: INIT_BILL_TYPE } });
    }
    getBillTypeReq();
  }, []);

  const onFormFieldChange = params => {
    console.log(
      ' onFormFieldChange,  , ： ',
      params,
      params.value,
      params.formData,
      props,
    );
    const changeKey = Object.keys(params.value)[0];
    console.log('  changeKey ：', changeKey);
    autoCalc(changeKey);
    // if (['amount_adjust'].includes(changeKey)) {
    // }
  };

  console.log(
    ' ClientReportFormClientReportForm ： ',
    props,
    dataInit,
    props.propsForm.getFieldsValue(),
  );

  const config = [
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      itemProps: {
        label: '客户名称',
        name: 'customer',
      },
      comProps: {
        disabled: true,
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      itemProps: {
        label: '倍率',
        name: 'magnification',
      },
      comProps: {
        disabled: true,
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      formType: 'Select',
      selectData: [
        {
          value: `${props.init.electrical_id}`,
          label: props.init.power_number,
        },
      ],
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      itemProps: {
        label: '电源编号',
        name: 'electrical_id',
      },
      comProps: {
        disabled: true,
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      formType: 'Select',
      selectData: props.electricBillList,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      itemProps: {
        label: '电价类型',
        name: 'billing_type',
      },
      comProps: {
        disabled: true,
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      itemProps: {
        label: '装接总容量',
        name: 'transformer_capacity',
      },
      comProps: {
        disabled: true,
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      itemProps: {
        label: '实际总容量',
        name: 'capacity',
      },
      comProps: {
        disabled: true,
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      formType: 'InputNumber',
      itemProps: {
        label: '功率因数实际值',
        name: 'power_factor_real',
      },
      comProps: {
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      formType: 'InputNumber',
      itemProps: {
        label: '功率因数考核值',
        name: 'power_factor',
      },
      comProps: {
        disabled: true,
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      formType: 'InputNumber',
      itemProps: {
        label: '力率（%）',
        name: 'power_factor_adjust',
      },
      comProps: {
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      formType: 'InputNumber',
      itemProps: {
        label: '无功电量',
        name: 'idle_volume',
      },
      comProps: {
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      formType: 'InputNumber',
      itemProps: {
        label: '契约限额',
        name: 'report_md',
      },
      comProps: {
        className: 'w-180 ',
      },
    },
    // {
    //   noRule: true,
    //   withFlex: true,
    //   flexRow: 2,
    //   colCls: 'dif w50',
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '申报MD',
    //     name: 'report_md',
    //   },
    //   comProps: {
    //     className: 'w-180 ',
    //   },
    // },
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      formType: 'InputNumber',
      itemProps: {
        label: '实际MD',
        name: 'max_md',
      },
      comProps: {
        className: 'w-180 ',
      },
    },
    {
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      formType: 'MonthPicker',
      itemProps: {
        label: '年月',
        name: 'year_month',
      },
      comProps: {
        disabled: true,
        className: 'w-180 ',
      },
    },
    // {
    //   noRule: true,
    //   withFlex: true,
    //   flexRow: 2,
    //   colCls: 'dif w50',
    //   formType: 'plainText',
    //   itemProps: {
    //     label: '',
    //   },
    //   comProps: {
    //     className: 'w-180 ',
    //   },
    // },

    // {
    //   colCls: 'hidden',
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '基本电价单价',
    //     name: 'basic_price',
    //   },
    //   comProps: {},
    // },

    {
      // colCls: 'hidden',
      noRule: true,
      noRule: true,
      withFlex: true,
      flexRow: 2,
      colCls: 'dif w50',
      formType: 'Select',
      selectData: billTypeConfig,
      itemProps: {
        label: '基本电价计费方式',
        name: 'billing_method',
      },
      comProps: {
        // disabled: true,
        onChange: onBillTypeChange,
        className: 'w-180 ',
      },
    },

    {
      formType: 'plainText',
      colCls: '',
      itemProps: {
        label: '电价分类',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      colCls: 'plainTextItem',
      itemProps: {
        label: '计费（千瓦时）',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      colCls: 'plainTextItem',
      itemProps: {
        label: '单价',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      colCls: 'plainTextItem',
      itemProps: {
        label: '金额',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      formType: 'plainText',
      itemProps: {
        label: '基本电价单价',
        label: '基本电费计费',
      },
    },
    // ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'basic_volume',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'basic_price',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'basicMoney',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      formType: 'plainText',
      itemProps: {
        label: '峰1',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'peak_volume',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'peak_price',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'peak_price_money',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '平1',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'usual_volume',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'usual_price',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'usual_price_money',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '谷1',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'valley_volume',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'valley_price',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'valley_price_money',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '尖1',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'tip_volume',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'tip_price',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'tip_price_money',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '峰2',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'peak_volume2',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'peak_price2',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'peak_price2_money',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '平2',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'usual_volume2',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'usual_price2',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'usual_price2_money',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '谷2',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'valley_volume2',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'valley_price2',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'valley_price2_money',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '尖2',
      },
    },
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'tip_volume2',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'tip_price2',
      },
      comProps: {
        disabled: true,
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '',
        name: 'tip_price2_money',
      },
      comProps: {
        disabled: true,
      },
    },

    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '尖电量1',
    //     name: 'tip_volume',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'tip_volume'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '尖电价1',
    //     name: 'tip_price',
    //   },
    //   comProps: {
    //     disabled: true,
    //   },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '峰电量1',
    //     name: 'peak_volume',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'peak_volume'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '峰电价1',
    //     name: 'peak_price',
    //   },
    //   comProps: {
    //     disabled: true,
    //   },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '平电量1',
    //     name: 'usual_volume',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'usual_volume'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '平电价1',
    //     name: 'usual_price',
    //   },
    //   comProps: {
    //     disabled: true,
    //   },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '谷电量1',
    //     name: 'valley_volume',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'valley_volume'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '谷电价1',
    //     name: 'valley_price',
    //   },
    //   comProps: {
    //     disabled: true,
    //   },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '尖电量2',
    //     name: 'tip_volume2',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'tip_volume2'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '尖电价2',
    //     name: 'tip_price2',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'tip_price2'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '峰电量2',
    //     name: 'peak_volume2',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'peak_volume2'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '峰电价2',
    //     name: 'peak_price2',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'peak_price2'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '平电量2',
    //     name: 'usual_volume2',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'usual_volume2'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '平电价2',
    //     name: 'usual_price2',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'usual_price2'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '谷电量2',
    //     name: 'valley_volume2',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'valley_volume2'),
    //   // },
    // },
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '谷电价2',
    //     name: 'valley_price2',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'valley_price2'),
    //   // },
    // },

    {
      formType: 'plainText',
      itemProps: {
        label: '峰md',
      },
    },
    ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'peak_md',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '平1md',
      },
    },
    ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'usual_md1',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '平2md',
      },
    },
    ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'usual_md2',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '谷md',
      },
    },
    ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'valley_md',
      },
    },

    {
      formType: 'plainText',
      itemProps: {
        label: '小计金额',
      },
    },
    ...placeholderItems,
    {
      noRule: props.action === 'editElectricBillItemAsync',
      formType: 'InputNumber',
      itemProps: {
        // label: '小计金额',
        label: '',
        name: 'calcMoeny',
      },
    },

    {
      formType: 'plainText',
      itemProps: {
        label: '代征费用',
      },
    },
    ...placeholderItems,
    {
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'levy_fee',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '力率调整',
      },
    },
    ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'amount_adjust',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '防疫优惠',
      },
    },
    ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'epidemic_discount',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '市场化差额退补',
      },
    },
    ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'refund_and_supplement_of_difference',
      },
    },
    {
      formType: 'plainText',
      itemProps: {
        label: '其他电费',
      },
    },
    ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'other_amount',
      },
    },

    // {
    //   formType: 'plainText',
    //   itemProps: {
    //     label: '其他电价',
    //   },
    // },
    // ...placeholderItems,
    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '',
    //     name: 'other_price',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'other_price'),
    //   // },
    // },
    {
      formType: 'plainText',
      itemProps: {
        label: '应付账款',
      },
    },
    ...placeholderItems,
    {
      noRule: true,
      formType: 'InputNumber',
      itemProps: {
        label: '',
        name: 'amount',
        tooltip: 'Tips: 键盘回车相当于点击确认按钮！',
      },
      comProps: {
        onPressEnter: () =>
          props.onOk({
            form: props.propsForm,
          }),
      },
    },

    // {
    //   noRule: true,
    //   formType: 'InputNumber',
    //   itemProps: {
    //     label: '其他电量',
    //     name: 'other_volume',
    //   },
    //   // comProps: {
    //   //   onChange: e => onUnitChange(e, 'other_volume'),
    //   // },
    // },
  ].map(v => ({
    ...v,
    // comProps: { className: 'w-240', ...v.comProps },
    comProps: { className: `w-90 ${v.comProps?.className}`, ...v.comProps },
  }));

  return (
    <div className={'clientReportForm'}>
      <SmartForm
        config={selectConfig}
        onFieldChange={onFieldChange}
        className={`billForm`}
        init={{
          // type: INIT_BILL_TYPE,
          type: initBillType,
        }}
        propsForm={form}
      ></SmartForm>

      <SmartForm
        flexRow={4}
        {...props}
        config={config}
        init={dataInit}
        init={{
          ...dataInit,

          // power_factor: '0.85',
          // idle_volume: 10,
          // levy_fee: 100,
        }}
        formLayouts={formLayouts}
        onFieldChange={onFormFieldChange}
      ></SmartForm>
    </div>
  );
};

ClientReportForm.defaultProps = {};

export default ClientReportForm;
