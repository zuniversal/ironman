import React from 'react';
import './style.less';
import {
  Form,
  Input,
  Cascader,
  Select,
  Row,
  Checkbox,
  Button,
  AutoComplete,
  Collapse,
} from 'antd';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import UploadCom from '@/components/Widgets/UploadCom';
import {
  regoins,
  clientLevelConfig,
  customerTypeConfig,
  repairSourceConfig,
  enterpriseScaleConfig,
  enterpriseNatureConfig,
  industryConfig,
  assetScaleConfig,
  corverAreaConfig,
  voltageLevelConfig,
  electricTypeConfig,
} from '@/configs';
import {
  tips,
  renderCheckboxOp,
  renderSelectOp,
  getItem,
  objNum2str,
} from '@/utils';
import {
  SettingOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { getLabel } from '@/common/SmartForm';
import { REQUIRE } from '@/constants';
import debounce from 'lodash/debounce';

import useHttp from '@/hooks/useHttp';
import { getServiceStaff } from '@/services/userManage';
import { getList as getTagList } from '@/services/tags';
import { getList as getOrganize } from '@/services/organize';
import { recursiveHandle } from '@/models/organize';
import { getRegion, getRegionOne } from '@/services/common';
import { formatSelectList, filterObjSame } from '@/utils';

const { Panel } = Collapse;
const { Option } = Select;

const checkOneCom = <span className={`dangerText`}>只能勾选1个！</span>;
const contactCheckboxData = [
  { label: checkOneCom, value: 1 },
  // { label: '是否', value: false,  },
];

const checkboxData = [
  { label: '', value: 1 },
  // { label: '是否', value: false,  },
];
// const checkboxData = { label: '是', value: true,  }

const rowLayout = {
  labelCol: {
    xs: { span: 0 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};

const addrLayout = {
  labelCol: {
    sm: { span: 4 },
  },
  wrapperCol: {
    sm: { span: 20 },
  },
};

const addrLayout1 = {
  labelCol: {
    sm: { span: 12 },
  },
  wrapperCol: {
    sm: { span: 12 },
  },
};

const addrLayout2 = {
  labelCol: {
    sm: { span: 6 },
  },
  wrapperCol: {
    sm: { span: 18 },
  },
};

const formLayouts = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }, //
  },
};

const CollapseCom = props => {
  const { com, header = '', extra } = props;
  console.log(' CollapseCom   props,   ： ', props);
  return (
    <Collapse
      defaultActiveKey={['1']}
      expandIconPosition={'left'}
      className={`collapseCom`}
    >
      <Panel header={header} key="1" extra={extra}>
        {com}
      </Panel>
    </Collapse>
  );
};

const formListLayout = {
  labelCol: {
    sm: { span: 10 }, //
  },
  wrapperCol: {
    sm: { span: 14 }, //
  },
};

const rules = (params, extra) => {
  const { items, label, formType } = params;
  const message = getLabel(label, formType);
  // console.log(' rules   params, extra,  ,   ： ', params, extra, message, label, formType,  );
  return [
    {
      required: true,
      message: label + REQUIRE,
    },
  ];
};

export const SelectCom = props => {
  console.log(' SelectCom ： ', props);
  const {
    formType = 'Input',
    itemProps = {},
    comProps = {},
    selectData,
  } = props;
  const selectProps = {
    allowClear: true,
    filterOption: true,
    showSearch: true,
    optionFilterProp: 'children',
    ...comProps,
  };

  if (formType === 'Search') {
    // selectProps.optionFilterProp = 'children';
    if (props.selectSearch) {
      // 注意 不要对 onSelect 方法 修改 否则会导致 字段无法设置值
      // selectProps.onChange = debounce(props.selectSearch, 1500);
    }
  }

  return <Select {...selectProps}>{renderSelectOp(selectData)}</Select>;
};

export const getWidget = props => {
  const { label, LabelCom, CustomCom, plainText, index } = props;

  const { formType = 'Input', itemProps = {}, comProps = {} } = props;

  if (props.onComChange) {
    comProps.onChange = (...e) =>
      props.onComChange(...e, { index, ...props.extraParams });
    // if (formType === 'Search') {
    //   comProps.onSelect = (...e) => props.onComChange(...e, {index, ...props.extraParams})
    // }
  }

  const selectProps = {
    allowClear: true,
    filterOption: true,
    showSearch: true,
    optionFilterProp: 'children',
    ...comProps,
  };

  if (formType === 'Search') {
    // selectProps.optionFilterProp = 'children';
    if (props.selectSearch) {
      // 注意 不要对 onSelect 方法 修改 否则会导致 字段无法设置值
      // selectProps.onChange = debounce(props.selectSearch, 1500);
    }
  }

  const formItemMap = {
    rowText: label,
    Label: LabelCom,
    CustomCom: CustomCom,
    plainText: (
      <span className={`plainText`} {...comProps}>
        {plainText}
      </span>
    ),
    Checkbox: renderCheckboxOp(props.checkboxData, {
      opType: props.opType,
      isDisabledAll: props.isDisabledAll,
      comProps: comProps,
    }),
    CheckboxItem: <Checkbox {...comProps} />,
    // Checkbox: <Checkbox>是1</Checkbox>,
    // Input: <Input className={'w-200'} disabled={props.isDisabledAll} {...comProps} />,
    Input: <Input disabled={props.isDisabledAll} {...comProps} />,
    // InputNumber: <InputNumber allowClear maxLength={32} {...comProps} />,
    Select: (
      <Select {...selectProps} disabled={props.isDisabledAll}>
        {renderSelectOp(props.selectData)}
      </Select>
    ),
    Search: (
      <Select {...selectProps} disabled={props.isDisabledAll}>
        {renderSelectOp(props.selectData)}
      </Select>
    ),
    // Select: <SelectCom {...props} comProps={comProps} disabled={props.isDisabledAll}></SelectCom>,
    // Search: <SelectCom {...props} comProps={comProps} disabled={props.isDisabledAll}></SelectCom>,
  };

  const formItemCom = formItemMap[formType];
  return formItemCom;
};

const FormListCom = props => {
  const { config = [], name, rowText, ...rest } = props;
  console.log(' FormListCom   props,   ： ', props);
  const formListCom = (
    <Form.List name={name} key={name}>
      {(fields, { add, remove }) => {
        console.log(' dataInit  fieldsfields ： ', fields);
        return (
          <Row gutter={24} className={`formRow`}>
            {rowText && !props.isDisabledAll && (
              <div
                className={`rowHeader fsb w100  ${
                  rowText.label ? 'formItems' : ''
                } ${rowText.rowTitle ? 'rowTitle' : 'rowItem'}`}
              >
                <div className={``}>{rowText.label ? rowText.label : ''}</div>
                {/* {props.renderHeaderRight && props.renderHeaderRight({ add, remove, })} */}
                <Button
                  shape="circle"
                  icon={<PlusOutlined />}
                  type="primary"
                  onClick={() => add()}
                ></Button>
              </div>
            )}
            {fields.map((field, index) => {
              const actionBtn = props.isDisabledAll ? null : (
                <div className="btnWrapper">
                  {/* <Button shape="circle" icon={<PlusOutlined />} type="primary" onClick={add} >新增</Button>
                <Button shape="circle" icon={<PlusOutlined />} onClick={remove}>删除</Button> */}
                  {props.extra
                    ? props.extra({
                        add,
                        remove: () => remove(field.name),
                        fields,
                        field,
                        index,
                      })
                    : null}
                  {/* <Button
                    shape="circle"
                    icon={<PlusOutlined />}
                    type="primary"
                    onClick={() => add()}
                  ></Button> */}
                  {/* {(!props.isLimitOne && fields.length > 1) && (
                  )} */}
                  <Button
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={() => {
                      console.log(
                        ' 删除 ： ',
                        field,
                        fields,
                        props,
                        props.form.getFieldsValue(),
                        props.removeCb,
                      ); //
                      if (props.removeCb) {
                        props.removeCb({
                          field,
                        });
                      }
                      remove(field.name);
                    }}
                  ></Button>
                </div>
              );
              const formItem = config.map((v, i) => {
                const { comProps = {} } = v;
                return v.type !== 'rowText' && !v.rowTitle ? (
                  <Form.Item
                    {...field}
                    {...v.itemProps}
                    key={`${index}-${i}`}
                    label={v.label}
                    colon={false}
                    name={[field.name, v.name]}
                    fieldKey={[field.fieldKey, v.name]}
                    className={`formItems listFormItem  ${
                      v.type !== 'rowText' ? 'ant-col ant-col-12' : ''
                    } ${v.formItemCls ?? ''}`}
                    rules={
                      v.noRule || v.noRuleAll
                        ? undefined
                        : rules({ items: v, ...v })
                    }
                    {...(v.type !== 'rowText' ? formListLayout : {})}
                  >
                    {/* <Input className={'w-200'} {...comProps} /> */}
                    {getWidget({ ...v, ...rest, index })}
                  </Form.Item>
                ) : (
                  <div
                    className={`rowHeader fsb w100  ${
                      v.label ? 'formItems' : ''
                    } ${v.rowTitle ? 'rowTitle' : 'rowItem'}`}
                    key={`${index}-${i}`}
                  >
                    <div className={``}>
                      {v.label ? v.label + (index + 1) : ''}
                    </div>

                    {props.renderHeaderRight
                      ? props.renderHeaderRight({
                          add,
                          remove: () => remove(field.name),
                        })
                      : actionBtn}
                  </div>
                );
              });
              return formItem;
            })}
          </Row>
        );
      }}
    </Form.List>
  );
  return formListCom;
};

FormListCom.defaultProps = {
  // renderHeaderRight: () => {},
};

const ClientForm = props => {
  console.log(' ClientForm ： ', props, props.init);

  const { action, getCapture, addUserAsync } = props;

  const { enterprises = [] } = getItem('userInfo');
  const enterpriseList = formatSelectList(enterprises);

  const { data: userList } = useHttp(getServiceStaff, {
    format: res => formatSelectList(res, 'nickname'),
  });
  const { data: tagsList } = useHttp(getTagList, {
    format: res => formatSelectList(res),
  });
  const { data: organizeList } = useHttp(
    () => getOrganize({ page_size: 1000 }),
    {
      format: res => recursiveHandle(res),
    },
  );
  console.log(' userList ： ', tagsList, userList); //

  const { data: provinceList, req: getProvinceAsync } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
  });
  const { data: cityList, req: getCityAsync } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
    noMountFetch: true,
  });
  const { data: countryList, req: getCountryAsync } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
    noMountFetch: true,
  });

  const { data: cityList2, req: getCityAsync2 } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
    noMountFetch: true,
  });
  const { data: countryList2, req: getCountryAsync2 } = useHttp(getRegion, {
    // format: res => formatItemSelect(res),
    formatKey: 'name',
    formatVal: 'name',
    noMountFetch: true,
  });

  const adminItem = {
    formType: 'Dynamic',
    // noLabel: true,
    itemProps: {
      // label: '',
      label: '用户名',
      name: 'customer_admin', //
      className: 'noMargin',
    },
    comProps: {
      extra: true,
      labelCol: {
        xs: { span: 0 },
        sm: { span: 0 }, //
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 24 }, //
      },
      // noRule: true,
      // formType: 'DynamicArr',
      config: [
        {
          itemProps: {
            label: '用户名',
            name: 'nickname',
          },
          comProps: {
            className: 'w-320',
          },
        },
        {
          itemProps: {
            label: '密码',
            name: 'password',
          },

          // noRule: true,
        },
        {
          itemProps: {
            label: '手机号',
            name: 'phone',
          },

          // noRule: true,
        },
      ],
      itemProps: {
        name: 'nickname',
        label: '用户名',
      },
      comProps: {
        className: 'w-320',
      },
    },
  };

  const regionConfig = [
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      // selectData: props.provinceList,
      selectData: provinceList,
      itemProps: {
        label: '省',
        // name: 'province',
        name: ['enterprise', 'province'],
        ...addrLayout1,
      },
      comProps: {
        className: 'w-135',
        onChange: (...arg) => onRegionChange('adcode', ...arg),
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      // selectData: props.
      selectData: cityList,
      itemProps: {
        label: '市',
        // name: 'city',
        name: ['enterprise', 'city'],
        ...addrLayout2,
      },
      comProps: {
        className: 'w-135',
        onChange: (...arg) => onRegionChange('city_code', ...arg),
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      // selectData: props.countryList,
      selectData: countryList,
      itemProps: {
        label: '县',
        // name: 'area',
        name: ['enterprise', 'area'],
        ...addrLayout2,
      },
      comProps: {
        className: 'w-135',
        onChange: (...arg) => onRegionChange('district', ...arg),
      },
    },
  ];

  const onRegionChange = (changeKey, params, item) => {
    console.log(
      ' onRegionChange   changeKey, params, item,   ： ',
      changeKey,
      params,
      item,
    );
    props.propsForm.setFieldsValue({
      enterprise: {
        [changeKey]: item.adcode,
      },
    });
  };

  const onAreaChange = async params => {
    console.log('    onAreaChange ： ', params, props);
    const { form } = params;
    if (params.value.enterprise?.province) {
      console.log(' onFieldChange 清空 province ： ');
      const resetParams = {
        enterprise: {
          city: null,
          area: null,
        },
      };
      props.propsForm.setFieldsValue(resetParams);
      const { city, area, ...data } = params.formData.enterprise;
      console.log(' onFieldChange 搜索 province ： ', params.value.province);
      // getCityAsync(() => getDistrict(data));
      getCityAsync(() =>
        getRegionOne({
          keywords: params.value?.enterprise?.province,
        }),
      );
      return;
    }
    if (params.value.enterprise?.city) {
      console.log(' onFieldChange 清空 city ： ');
      const resetParams = {
        enterprise: {
          area: null,
        },
      };
      props.propsForm.setFieldsValue(resetParams);
      const { area, ...data } = params.formData.enterprise;
      console.log(' onFieldChange 搜索 city ： ', params.value.city);
      // getCountryAsync(() => getDistrict(data));
      getCountryAsync(() =>
        getRegionOne({
          keywords: params.value?.enterprise?.city,
        }),
      );
      return;
    }
    if (params.value.enterprise?.area) {
      console.log(' onFieldChange 清空 area ： ');
      const res = formatSelectList(
        (
          await getRegionOne({
            keywords: params.value?.enterprise?.area,
          })
        ).list,
        'name',
      );
      const adcode = res[0]?.adcode;
      const city_code = res[0]?.citycode;
      const [longitude, latitude] = res[0]?.center?.split(',');
      const { province, city, area } = params.formData.enterprise;
      const address = province + city + area;
      console.log(
        '  res await 结果  ：',
        res,
        adcode,
        city_code,
        address,
        params,
      );
      if (adcode) {
        props.propsForm.setFieldsValue({
          // enterprise: { adcode, city_code, address, longitude, latitude, },
          enterprise: { address, longitude, latitude },
        });
      }
      return;
    }
  };

  const onHouseNoRegionChange = async (value, item, params) => {
    console.log(
      ' onHouseNoRegionChange value, item, params ： ',
      value,
      item,
      params,
    ); //
    const { index, name } = params;
    const formData = props.propsForm.getFieldsValue();
    const { electricity_user } = formData;
    const changeItem = electricity_user[index];
    console.log(
      ' onHouseNoRegionChange changeItem, index, electricity_user ： ',
      formData,
      changeItem,
      index,
      electricity_user,
    ); //
    const { province, city, area } = changeItem;

    if (name === 'province') {
      console.log(' onHouseNoRegionChange onFieldChange 清空 province ： ');
      const resetParams = {
        city: null,
        area: null,
        ad_code: item.adcode,
      };
      const resetData = electricity_user.map((v, i) =>
        index === i ? { ...v, ...resetParams } : v,
      );
      console.log(
        ' onHouseNoRegionChange resetData  electricity_user.map v ： ',
        resetData,
      );
      props.propsForm.setFieldsValue({ electricity_user: resetData });
      getCityAsync2(() =>
        getRegionOne({
          keywords: province,
        }),
      );
      return;
    }
    if (name === 'city') {
      console.log(' onHouseNoRegionChange onFieldChange 清空 city ： ');
      const resetParams = {
        area: null,
        city_code: item.adcode,
      };
      const resetData = electricity_user.map((v, i) =>
        index === i ? { ...v, ...resetParams } : v,
      );
      console.log(
        ' onHouseNoRegionChange resetData  electricity_user.map v ： ',
        resetData,
      );
      props.propsForm.setFieldsValue({ electricity_user: resetData });
      getCountryAsync2(() =>
        getRegionOne({
          keywords: city,
        }),
      );
      return;
    }
    if (name === 'area') {
      console.log(' onHouseNoRegionChange onFieldChange 清空 area ： ');
      // const res = formatSelectList(
      //   (
      //     await getRegionOne({
      //       keywords: area,
      //     })
      //   ).list,
      //   'name',
      // );
      // console.log(' onHouseNoRegionChange res ： ', res,  )//
      // const city_code = res[0]?.citycode;
      // const district = item.adcode;
      // const {adcode} = res[0];
      // const [longitude, latitude] = res[0]?.center?.split(',');
      // // const { province, city, area } = params.formData.enterprise;
      // // const address = province + city + area;
      const district = item.adcode;
      const [longitude, latitude] = item?.center?.split(',');
      if (district) {
        const resetData = electricity_user.map((v, i) =>
          index === i
            ? {
                ...v,
                longitude,
                latitude,
                district,
                addr: v.province + v.city + v.area,
              }
            : v,
        );
        console.log(
          ' onHouseNoRegionChange resetData  electricity_user.map v ： ',
          resetData,
        );
        props.propsForm.setFieldsValue({ electricity_user: resetData });
      }
      return;
    }
  };

  const onFieldChange = params => {
    console.log(' onFieldChange  ： ', params, props);
    onAreaChange(params);
  };

  const houseNoRegionConfig = [
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: provinceList,
      itemProps: {
        label: '省',
        name: 'province',
        // ...addrLayout1,
      },
      onComChange: onHouseNoRegionChange,
      extraParams: {
        form: props.propsForm,
        name: 'province',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: cityList2,
      itemProps: {
        label: '市',
        name: 'city',
        // ...addrLayout2,
      },
      onComChange: onHouseNoRegionChange,
      extraParams: {
        form: props.propsForm,
        name: 'city',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: countryList2,
      itemProps: {
        label: '县',
        name: 'area',
        // ...addrLayout2,
      },
      onComChange: onHouseNoRegionChange,
      extraParams: {
        form: props.propsForm,
        name: 'area',
      },
    },
  ];

  const areaConfig = [
    // {
    //   formType: 'Cascader',
    //   itemProps: {
    //     label: '区域',
    //     name: 'region',
    //   },
    //   comProps: {
    //     options: regoins,
    //   },
    // },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '区域',
    //     name: 'areas',
    //   },
    //   comProps: {
    //     disabled: true,
    //   },
    // },
    {
      colCls: 'hidden',
      noRule: true,
      flexRow: 3,
      itemProps: {
        label: '城市编码',
        name: ['enterprise', 'city_code'],
        ...addrLayout1,
        // hidden: true,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      // noRule: true,
      flexRow: 3,
      noRule: true,
      itemProps: {
        label: '行政区域编码',
        // name: 'adcode',
        name: ['enterprise', 'adcode'],
        ...addrLayout1,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      // noRule: true,
      flexRow: 3,
      noRule: true,
      itemProps: {
        label: '经度',
        // name: 'longitude',
        name: ['enterprise', 'longitude'],
        ...addrLayout2,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      // noRule: true,
      flexRow: 3,
      noRule: true,
      itemProps: {
        label: '纬度',
        // name: 'latitude',
        name: ['enterprise', 'latitude'],
        ...addrLayout2,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
  ];

  const houseNoConfig = [
    {
      itemProps: {
        label: '户号',
        name: 'number',
      },
    },
    {
      flexRow: 1,
      itemProps: {
        label: '地址',
        name: 'addr',
        ...addrLayout,
      },
      // comProps: {
      //   onChange: props.onAddrChange,
      // },
      // onComChange: (e) => props.onAddrChange({e, propsForm: props.propsForm, }),
      // onComChange: props.onAddrChange,
      extraParams: {
        form: props.propsForm,
      },
    },
    ...(action === 'detail' ? [] : houseNoRegionConfig),
    // ...houseNoRegionConfig,
    {
      itemProps: {
        label: '区域编码',
        name: 'ad_code',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '城市编码',
        name: 'city_code',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '经度',
        name: 'longitude',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '纬度',
        name: 'latitude',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '变压器容量',
        name: 'transformer_capacity',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际容量',
        name: 'real_capacity',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: voltageLevelConfig,
      itemProps: {
        label: '电压等级',
        name: 'voltage_level',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: electricTypeConfig,
      itemProps: {
        label: '用电类型',
        name: 'type',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '电功率考核因素',
        name: 'ep_factor',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '托管电站数',
        name: 'trusteeship_num',
      },
    },
  ];

  const clientInfoConfig = [
    {
      formType: 'rowText',
      itemProps: {
        label: '基本信息',
        className: 'w100',
      },
    },
    {
      flexRow: 1,
      itemProps: {
        label: '客户名称',
        name: 'name',
        ...addrLayout,
      },
      comProps: {
        className: 'rowInput ',
      },
    },
    {
      flexRow: 1,
      formType: 'Search',
      // selectData: props.enterpriseList,
      selectData: enterpriseList,
      itemProps: {
        label: '服务企业',
        name: 'service_enterprise_id',
        ...addrLayout,
      },
      comProps: {
        className: 'rowInput ',
      },
    },
    ...(props.action === 'detail'
      ? [
          {
            noRule: true,
            itemProps: {
              label: '客户编码',
              name: 'code',
            },
          },
        ]
      : []),
    {
      formType: 'Select',
      selectData: clientLevelConfig,
      itemProps: {
        label: '客户等级',
        name: 'level',
      },
    },
    {
      // noRule: true,
      formType: 'Search',
      selectData: customerTypeConfig,
      itemProps: {
        label: '客户类型',
        name: 'type',
      },
      comProps: {
        mode: 'multiple',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: props.getUserAsync,
      // selectData: props.userList,
      selectData: userList,
      itemProps: {
        label: '上一任客户代表',
        name: 'last_service_staff',
        name: 'last_service_staff_id',
      },
      comProps: {
        disabled: action !== 'add',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: props.getUserAsync,
      // selectData: props.userList,
      selectData: userList,
      itemProps: {
        label: '客户代表',
        name: 'service_staff',
        name: 'service_staff_id',
      },
    },

    // {
    //   noRule: true,
    //   formType: 'Search',
    //   // selectSearch: props.getOrganizeAsync,
    //   selectData: props.organizeList,
    //   itemProps: {
    //     label: '组织',
    //     name: 'service_organization_id',
    //   },
    // },
    {
      noRule: true,
      formType: 'TreeSelect',
      itemProps: {
        label: '组织',
        name: 'service_organization_id',
      },
      comProps: {
        // treeData: props.organizeList,
        treeData: organizeList,
      },
    },
  ];

  const enterpriseConfig = [
    {
      formType: 'rowText',
      itemProps: {
        label: '公司基本信息',
        className: 'w100',
      },
    },

    {
      flexRow: 1,
      itemProps: {
        label: '公司名字',
        name: ['enterprise', 'name'],
        ...addrLayout,
      },
      comProps: {
        className: 'rowInput ',
      },
    },
    // {
    //   formType: 'Select',
    //   selectData: clientLevelConfig,
    //   itemProps: {
    //     label: '客户等级',
    //     name: ['enterprise', 'level'],
    //   },
    // },
    ...(action === 'detail' ? [] : regionConfig),
    {
      flexRow: 1,
      // formType: 'Search',
      itemProps: {
        label: '详细地址',
        name: ['enterprise', 'address'],
        ...addrLayout,
      },
      comProps: {
        className: 'rowInput ',
        // onChange: props.onAddressChange,
      },
    },
    ...areaConfig,
    {
      formType: 'rowText',
      itemProps: {
        label:
          'Tips: 选择省市区后自动填写行政区域编码，输入地址后自动填写经纬度！',
        className: 'w100 textCenter',
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '法人',
        name: ['enterprise', 'legal_person'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '法人联系方式',
        name: ['enterprise', 'legal_person_phone'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '税号',
        name: ['enterprise', 'tax_num'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '银行开户名',
        name: ['enterprise', 'bank_account_name'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '银行',
        name: ['enterprise', 'bank_name'],
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '邮编',
        name: ['enterprise', 'postcode'],
      },
    },

    {
      noRule: true,
      formType: 'Select',
      selectData: enterpriseScaleConfig,
      itemProps: {
        label: '企业规模',
        name: ['enterprise', 'scale'],
      },
    },
    {
      noRule: true,
      formType: 'Select',
      selectData: enterpriseNatureConfig,
      itemProps: {
        label: '企业性质',
        name: ['enterprise', 'nature'],
      },
    },
    {
      noRule: true,
      formType: 'Select',
      selectData: industryConfig,
      itemProps: {
        label: '所属行业',
        name: ['enterprise', 'industry'],
      },
    },
    {
      noRule: true,
      formType: 'Select',
      selectData: assetScaleConfig,
      itemProps: {
        label: '资产规模',
        name: ['enterprise', 'asset'],
      },
    },
    // {
    //   // formType: 'Select',
    //   itemProps: {
    //     label: '总面积',
    //     name: 'total_area',
    //   },
    //
    // },
    {
      noRule: true,
      formType: 'Select',
      selectData: corverAreaConfig,
      itemProps: {
        label: '占地面积',
        name: ['enterprise', 'covered_area'],
      },
    },
    {
      // formType: 'Select',
      // selectData: ,
      noRule: true,
      itemProps: {
        label: '父级企业',
        name: ['enterprise', 'parent_enterprise_id'],
      },
    },
  ];

  const config = [
    ...clientInfoConfig,
    ...enterpriseConfig,
    <UploadCom
      label={'企业Logo'}
      key={'logo'}
      action={'/api/v1/upload'}
      name={'logo'}
      extra={'支持扩展名:pdf、jpg、png'}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
        multiple: true,
      }}
      init={props.init}
      formAction={props.action}
      noRule
      formItemCls={'ant-col-12'}
    ></UploadCom>,
  ].map(v => ({
    ...v,
    comProps: { className: `w-200 ${v.comProps?.className}`, ...v.comProps },
  }));

  const attach = [
    // <UploadCom
    //   label={'附件'}
    //   key={'attach'}
    //   isInputUpload
    //   text={'上传文件'}
    //   contentClass={'dfc'}
    //   action={'/api/v1/upload'}
    //   name={'file'}
    //   extra={'支持扩展名:pdf、jpg、png'}
    //   // formItemProps={{

    //   // }}
    //   init={props.init}
    // ></UploadCom>,
    <UploadCom
      isInputUpload
      contentClass={'dfc'}
      label={'附件'}
      key={'file'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={'支持扩展名:pdf、jpg、png'}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
        multiple: true,
      }}
      init={props.init}
      formItemProps={{
        rules: null,
      }}
      formAction={props.action}
      formItemCls={'w100'}
    ></UploadCom>,
  ];

  config.push(...attach);

  const adminConfig = [
    // {
    //   itemProps: {
    //     label: 'id',
    //     name: 'id',
    //     hidden: true,
    //     noEdit: false,
    //   },
    // },
    {
      noRule: true,
      itemProps: {
        label: 'id',
        name: 'id',
      },
      formItemCls: 'hiddenmp',
    },
    {
      // noRule: true,
      itemProps: {
        label: '姓名',
        name: 'nickname',
      },
    },
    {
      itemProps: {
        label: '账号',
        name: 'username',
      },
    },
    {
      noRule: action !== 'add',
      itemProps: {
        label: '密码',
        name: 'password',
      },
    },
    {
      // noRule: true,
      itemProps: {
        label: '手机号',
        name: 'phone',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '邮箱',
        name: 'email',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '微信',
        name: 'wechat',
      },
    },
    {
      noRule: true,
      formType: 'Search',
      selectData: tagsList,
      itemProps: {
        label: '职位',
        name: 'tags',
      },
      comProps: {
        mode: 'multiple',
      },
    },
  ];

  const clientContactConfig = [
    {
      noRule: true,
      itemProps: {
        label: 'id',
        name: 'id',
      },
      formItemCls: 'hiddenmp',
    },
    {
      itemProps: {
        label: '联系人名字',
        name: 'name',
      },
    },
    {
      noRule: true,
      formType: 'Checkbox',
      formType: 'CheckboxItem',
      // opType: 'option',
      checkboxData: contactCheckboxData,
      itemProps: {
        label: '催款联系人',
        name: 'is_urge',
        valuePropName: 'checked',
      },
      comProps: {
        children: checkOneCom,
      },
      extraParams: {
        form: props.propsForm,
      },
    },
    {
      noRule: true,
      formType: 'Checkbox',
      formType: 'CheckboxItem',
      // opType: 'option',
      checkboxData: checkboxData,
      itemProps: {
        label: '离职',
        name: 'is_quit',
        valuePropName: 'checked',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '联系人手机',
        name: 'phone',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '联系人电话',
        name: 'tel',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '邮箱',
        name: 'email',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: 'qq',
        name: 'qq',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '微信',
        name: 'wechat',
      },
    },
    // action === 'detail' ? {
    //   noRule: true,
    //   itemProps: {
    //     label: '职位',
    //     name: 'tags',
    //   },
    // } : {
    //   // noRule: true,
    //   formType: 'Select',
    //   selectSearch: props.getTagsAsync,
    //   selectData: props.tagsList,
    //   itemProps: {
    //     label: '职位',
    //     name: 'tags',
    //   },
    //   comProps: {
    //     mode: 'multiple',
    //   },
    // },
    {
      noRule: true,
      formType: 'Search',
      // selectSearch: props.getTagsAsync,
      // selectData: props.tagsList,
      selectData: tagsList,
      itemProps: {
        label: '职位',
        name: 'tags',
      },
      comProps: {
        mode: 'multiple',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '备注',
        name: 'comments',
      },
    },
  ];

  const formCom = (
    <SmartForm
      config={config}
      isDisabledAll={action === 'detail'}
      {...props}
      init={{
        // customer_admin: [{}],
        // contacts: [{}],
        // contacts: [],
        // electricity_user: [{}],
        // enterprise: { address: '泉港区' },
        ...objNum2str(props.init, [
          // 'service_organization_id',
          'service_staff_id',
          'last_service_staff_id',
          'service_enterprise_id',
          'tags',
        ]),
        // customer_admin: [
        //   {
        //     nickname: 'nickname1',
        //     username: 'username1',
        //     password: 'password1',
        //     phone: 'phone1',
        //     email: 'email1',
        //     wechat: 'wechat1',
        //   },
        //   {
        //     nickname: 'nickname2',
        //     username: 'username2',
        //     password: 'password2',
        //     phone: 'phone2',
        //     email: 'email2',
        //     wechat: 'wechat2',
        //   },
        // ],
        // contacts: [
        //   {
        //     is_urge: [true],
        //     is_quit: [true],
        //   },
        // ],
        // electricity_user: [
        //   {},
        // ],
        // customer_admin: [{}],
      }}
      formLayouts={formLayouts}
      flexRow={2}
      onFieldChange={onFieldChange}
    ></SmartForm>
  );

  console.log(' configconfig ： ', config);

  const copy2Admin = params => {
    const { index } = params;
    const res = props.propsForm.getFieldsValue();
    console.log(' copy2Admin   params,   ： ', params, res);
    const { contacts, customer_admin } = res;
    const copyItem = contacts[index];
    if (Object.keys(copyItem).length > 0) {
      const newAdminData = [
        ...customer_admin,
        {
          nickname: copyItem.name,
          phone: copyItem.phone,
          email: copyItem.email,
        },
      ];
      console.log('  res ：', res, copyItem, newAdminData);
      tips('信息复制成功！');
      props.propsForm.setFieldsValue({
        customer_admin: newAdminData,
      });
    }
  };
  const ContactExtra = params => {
    console.log(' ContactExtra   params,   ： ', params);
    return (
      <Button type="primary" onClick={() => copy2Admin(params)}>
        生成管理员
      </Button>
    );
  };
  const copy2HouseNo = params => {
    const { index } = params;
    const res = props.propsForm.getFieldsValue();
    console.log(' copy2HouseNo   params,   ： ', params, res);
    const { enterprise, electricity_user } = res;
    const item = electricity_user[index];
    const matchItem = {
      ...item,
      city_code: enterprise.city_code,
      ad_code: enterprise.adcode,
      latitude: enterprise.latitude,
      longitude: enterprise.longitude,
    };
    console.log(' item ： ', item, enterprise, matchItem);
    const setFields = {
      electricity_user: electricity_user.map((v, i) =>
        index === i ? matchItem : v,
      ),
    };
    console.log('  res ：', res, item, setFields);
    tips('地址信息复制成功！');
    props.propsForm.setFieldsValue(setFields);
  };
  const HouseNoExtra = params => {
    console.log(' HouseNoExtra   params,   ： ', params);
    return (
      <Button type="primary" onClick={() => copy2HouseNo(params)}>
        复制公司地址信息
      </Button>
    );
  };

  const clientContactFormConfig = [
    { label: '', name: '', rowTitle: true },
    ...clientContactConfig.map(v => ({ ...v.itemProps, ...v })),
  ];
  const ClientContactItem = (
    <FormListCom
      {...{
        form: props.propsForm,
        rowText: { label: '联系人', name: '', rowTitle: true },
        config: clientContactFormConfig,
        name: 'contacts',
        extra: ContactExtra,
        isDisabledAll: action === 'detail',
        removeCb: ({ field }) => {
          const { name } = field;
          const { contacts } = props.propsForm.getFieldsValue();
          const item = contacts[name];
          console.log(
            ' itemitemitem 删除客户 ： ',
            item,
            field,
            contacts,
            props.propsForm.getFieldsValue(),
          ); //
          if (item && item.id) {
            props.removeContactAsync({
              customer_id: props.init.id,
              contact_id: item.id,
            });
          }
        },
      }}
    ></FormListCom>
  );
  const ClientContactCollapseCom = (
    <CollapseCom
      com={ClientContactItem}
      header={'联系人列表'}
      key={'ContactCollapseCom'}
    ></CollapseCom>
  );
  config.push(ClientContactCollapseCom);

  const adminFormConfig = [
    { label: '', name: '', rowTitle: true },
    ...adminConfig.map(v => ({ ...v.itemProps, ...v })),
  ];
  const AdminItem = (
    <FormListCom
      {...{
        form: props.propsForm,
        removeCb: 'remove',
        rowText: { label: '客户管理员', name: '', rowTitle: true },
        config: adminFormConfig,
        name: 'customer_admin',
        isDisabledAll: action === 'detail',
        removeCb: ({ field }) => {
          const { name } = field;
          const { customer_admin } = props.propsForm.getFieldsValue();
          const item = customer_admin[name];
          console.log(
            ' itemitemitem 删除客户 ： ',
            item,
            field,
            customer_admin,
            props.propsForm.getFieldsValue(),
          ); //
          if (item && item.id) {
            props.removeClientAdminAsync({
              customer_id: props.init.id,
              user_id: item.id,
            });
          }
        },
      }}
    ></FormListCom>
  );
  const AdminCollapseCom = (
    <CollapseCom
      com={AdminItem}
      header={'客户管理员列表'}
      key={'AdminCollapseCom'}
    ></CollapseCom>
  );
  // if (action !== 'detail') config.push(AdminCollapseCom);
  config.push(AdminCollapseCom);

  const houseNoFormConfig = [
    { label: '', name: '', rowTitle: true },
    // { label: '电压表', name: '', type: 'rowText' },
    ...houseNoConfig.map(v => ({ ...v.itemProps, ...v })),
  ];
  const HouseNoItem = (
    <FormListCom
      {...{
        form: props.propsForm,
        rowText: { label: '户号', name: '', rowTitle: true },
        config: houseNoFormConfig,
        name: 'electricity_user',
        extra: HouseNoExtra,
        isDisabledAll: action === 'detail',
      }}
    ></FormListCom>
  );
  const HouseNoCollapseCom = (
    <CollapseCom
      com={HouseNoItem}
      header={'户号列表'}
      key={'HouseNoCollapseCom'}
    ></CollapseCom>
  );
  if (action === 'add') config.push(HouseNoCollapseCom);

  return (
    <div className="clientForm">
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          console.log(' name, values, forms ： ', name, values, forms);
        }}
      >
        {formCom}
      </Form.Provider>
    </div>
  );
};

FormListCom.defaultProps = {};

export default ClientForm;
// export default React.memo(ClientForm,
//   (prev, next) => {
//    console.log('ClientForm memo ', prev, next, prev.init === next.init, prev.init, next.init, Object.keys(prev.init).length === Object.keys(next.init).length);
//   //  return Object.keys(prev.init).length === Object.keys(next.init).length
//    return true
// });
