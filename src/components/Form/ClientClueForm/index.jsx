import React, { isValidElement } from 'react';
import './style.less';
import {
  Form,
  Select,
  Input,
  Row,
  Checkbox,
  Button,
  Collapse,
  Divider,
} from 'antd';

import SmartForm, { SearchForm } from '@/common/SmartForm';
import UploadCom from '@/components/Widgets/UploadCom';
import {
  clientClueLevelConfig,
  customerTypeConfig,
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
  formatSelectList,
} from '@/utils';
import {
  SettingOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { getLabel } from '@/common/SmartForm';
import { REQUIRE } from '@/constants';

import useHttp from '@/hooks/useHttp';
import { getServiceStaff } from '@/services/userManage';
import { getList as getTagList } from '@/services/tags';
import { getList as getOrganize } from '@/services/organize';
import { getDistrict } from '@/services/client';
import { getRegion, getRegionOne } from '@/services/common';
import { recursiveHandle } from '@/models/organize';

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
    sm: { span: 8 }, //
  },
  wrapperCol: {
    sm: { span: 16 }, //
  },
};

const smallLayout = {
  labelCol: {
    sm: { span: 10 }, //
  },
  wrapperCol: {
    sm: { span: 14 }, //
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
    CheckboxItem: <Checkbox disabled={props.isDisabledAll} {...comProps} />,
    Input: <Input disabled={props.isDisabledAll} {...comProps} />,
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
                  {props.extra
                    ? props.extra({
                        add,
                        remove: () => remove(field.name),
                        fields,
                        field,
                        index,
                      })
                    : null}
                  <Button
                    shape="circle"
                    icon={<MinusOutlined />}
                    onClick={() => remove(field.name)}
                  ></Button>
                </div>
              );
              const formItem = config.map((v, i) => {
                const { comProps = {} } = v;
                // console.log(' isValidElement(v) ： ', isValidElement(v), v )//
                if (typeof v === 'function') {
                  return v({ v, i, field });
                }

                if (isValidElement(v)) {
                  return v;
                }

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
                    }`}
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
              return (
                <>
                  {formItem}
                  {index !== fields.length - 1 && (
                    <Divider className={`divider`} />
                  )}
                </>
              );
            })}
          </Row>
        );
      }}
    </Form.List>
  );
  return formListCom;
};

FormListCom.defaultProps = {};

const formatItemSelect = data =>
  data.map(v => ({
    label: v,
    value: v,
  }));

const useHouseNoConfig = props => {
  console.log(' useHouseNoConfig   props,   ： ', props);
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

  const houseNoRegionConfig = [
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: provinceList,
      itemProps: {
        label: '省',
        name: 'province',
      },
      onComChange: props.onHouseNoRegionChange,
      extraParams: {
        form: props.propsForm,
        name: 'province',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: cityList,
      itemProps: {
        label: '市',
        name: 'city',
      },
      onComChange: props.onHouseNoRegionChange,
      extraParams: {
        form: props.propsForm,
        name: 'city',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: countryList,
      itemProps: {
        label: '县',
        name: 'area',
      },
      onComChange: props.onHouseNoRegionChange,
      extraParams: {
        form: props.propsForm,
        name: 'area',
      },
    },
  ];

  return {
    houseNoConfig,
  };
};

const ClientClueForm = props => {
  console.log(' ClientClueForm ： ', props, props.init);

  const { action } = props;

  // const {houseNoConfig,  } = useHouseNoConfig(props)

  const { enterprises = [] } = getItem('userInfo');

  const { data: userList } = useHttp(getServiceStaff, {
    format: res => formatSelectList(res, 'nickname'),
  });
  const { data: tagsList } = useHttp(getTagList, {
    format: res => formatSelectList(res),
  });
  console.log(' userList ： ', userList, provinceList); //

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
  console.log(
    ' userList ： ',
    userList,
    provinceList,
    props.propsForm.getFieldsValue(),
  ); //

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
      // const res = await props.getGeoAsync({ address: params.value?.area, })
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
      // const district = item.adcode;
      // const [longitude, latitude] = item?.center?.split(',');
      if (adcode) {
        props.propsForm.setFieldsValue({
          // enterprise: { adcode, city_code, address, longitude, latitude, },
          enterprise: {
            longitude,
            latitude,
            address,
            // address: v.province + v.city + v.area,
          },
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
    const { ele_user } = formData;
    const changeItem = ele_user[index];
    console.log(
      ' onHouseNoRegionChange changeItem, index, ele_user ： ',
      formData,
      changeItem,
      index,
      ele_user,
    ); //
    const { province, city, area } = changeItem;

    if (name === 'province') {
      console.log(' onHouseNoRegionChange onFieldChange 清空 province ： ');
      const resetParams = {
        city: null,
        area: null,
        adcode: item.adcode,
      };
      const resetData = ele_user.map((v, i) =>
        index === i ? { ...v, ...resetParams } : v,
      );
      console.log(
        ' onHouseNoRegionChange resetData  ele_user.map v ： ',
        resetData,
      );
      props.propsForm.setFieldsValue({ ele_user: resetData });
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
      const resetData = ele_user.map((v, i) =>
        index === i ? { ...v, ...resetParams } : v,
      );
      console.log(
        ' onHouseNoRegionChange resetData  ele_user.map v ： ',
        resetData,
      );
      props.propsForm.setFieldsValue({ ele_user: resetData });
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
        const resetData = ele_user.map((v, i) =>
          index === i
            ? {
                ...v,
                longitude,
                latitude,
                // adcode, city_code,
                district,
              }
            : v,
        );
        console.log(
          ' onHouseNoRegionChange resetData  ele_user.map v ： ',
          resetData,
        );
        props.propsForm.setFieldsValue({ ele_user: resetData });
      }
      return;
    }
  };

  const onHouseNoAreaChange = async params => {
    console.log('    onHouseNoAreaChange ： ', params, props);
    const { form, changeKey, value } = params;
    if (changeKey !== 'ele_user') {
      return;
    }
    const { ele_user } = value;
    const { province, city, area } = ele_user.filter(v => v)[0];

    console.log(
      ' onHouseNoAreaChange ele_user ： ',
      ele_user,
      province,
      ele_user.filter(v => v),
    ); //

    if (province) {
      console.log(' onFieldChange 清空 province ： ');
      getCityAsync2(() =>
        getRegionOne({
          keywords: province,
        }),
      );
      return;
    }
    if (city) {
      console.log(' onFieldChange 清空 city ： ');
      getCountryAsync2(() =>
        getRegionOne({
          keywords: city,
        }),
      );
      return;
    }
    if (area) {
      console.log(' onFieldChange 清空 area ： ');
      const res = formatSelectList(
        (
          await getRegion({
            subdistrict: '1',
            keywords: area,
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
          enterprise: { address, longitude, latitude },
        });
      }
      return;
    }
  };

  const onFieldChange = params => {
    console.log(' onFieldChange  ： ', params, props);
    onAreaChange(params);
    // onHouseNoAreaChange(params);
  };

  const regionConfig = [
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: provinceList,
      itemProps: {
        label: '省',
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
      selectData: cityList,
      itemProps: {
        label: '市',
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
      selectData: countryList,
      itemProps: {
        label: '县',
        name: ['enterprise', 'area'],
        ...addrLayout2,
      },
      comProps: {
        className: 'w-135',
        onChange: (...arg) => onRegionChange('district', ...arg),
      },
    },
  ];

  const areaConfig = [
    {
      colCls: 'hidden',
      noRule: true,
      itemProps: {
        label: 'district',
        name: ['enterprise', 'district'],
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      colCls: 'hidden',
      // noRule: true,
      itemProps: {
        label: '城市编码',
        name: ['enterprise', 'city_code'],
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      flexRow: 3,
      // noRule: true,
      itemProps: {
        label: '行政区域编码',
        name: ['enterprise', 'adcode'],
        ...addrLayout1,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      flexRow: 3,
      // noRule: true,
      itemProps: {
        label: '经度',
        name: ['enterprise', 'longitude'],
        ...addrLayout2,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
    {
      flexRow: 3,
      // noRule: true,
      itemProps: {
        label: '纬度',
        name: ['enterprise', 'latitude'],
        ...addrLayout2,
      },
      comProps: {
        disabled: true,
        className: 'w-135',
      },
    },
  ];

  const houseNoRegionConfig = [
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: provinceList,
      itemProps: {
        label: '省',
        name: 'province',
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
      },
      onComChange: onHouseNoRegionChange,
      extraParams: {
        form: props.propsForm,
        name: 'area',
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
    // {
    //   flexRow: 1,
    //   itemProps: {
    //     label: '地址',
    //     name: 'addr',
    //     ...addrLayout,
    //   },
    //   onComChange: props.onAddrChange,
    //   extraParams: {
    //     form: props.propsForm,
    //   },
    // },
    ...(props.action === 'detail' ? [] : houseNoRegionConfig),
    // ...houseNoRegionConfig,
    {
      itemProps: {
        label: '区域编码',
        name: 'adcode',
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
    ({ field }) => {
      // console.log(' UploadCom props.init, props.init?.ele_user, field,  ', props.init, props.init?.ele_user, field, props.init?.ele_user[field.name], props.init?.ele_user[field.name]['circuit_imgs']);
      return (
        <UploadCom
          label={'一次线路图'}
          key={'circuit_imgs'}
          action={'/api/v1/upload'}
          name={[field.name, 'circuit_imgs']}
          extra={'支持扩展名:pdf、jpg、png'}
          uploadProps={{
            disabled: props.isDisabledAll || props.action === 'detail',
            accept: 'image/png,image/jpeg,image/pdf,application/pdf',
            multiple: true,
          }}
          init={props.init?.ele_user[field.name]?.circuit_imgs ?? []}
          formAction={props.action}
          noRule
          formItemCls={'ant-col-12'}
          formItemLayout={formListLayout}
        ></UploadCom>
      );
    },
    ({ field }) => (
      <UploadCom
        label={'电站全貌'}
        key={'station_imgs'}
        action={'/api/v1/upload'}
        name={[field.name, 'station_imgs']}
        extra={'支持扩展名:pdf、jpg、png'}
        uploadProps={{
          disabled: props.isDisabledAll || props.action === 'detail',
          accept: 'image/png,image/jpeg,image/pdf,application/pdf',
          multiple: true,
        }}
        init={props.init?.ele_user[field.name]?.station_imgs ?? []}
        formAction={props.action}
        noRule
        formItemCls={'ant-col-12'}
        formItemLayout={formListLayout}
      ></UploadCom>
    ),
    ({ field }) => (
      <UploadCom
        label={'电费账单'}
        key={'bill_imgs'}
        action={'/api/v1/upload'}
        name={[field.name, 'bill_imgs']}
        extra={'支持扩展名:pdf、jpg、png'}
        uploadProps={{
          disabled: props.isDisabledAll || props.action === 'detail',
          accept: 'image/png,image/jpeg,image/pdf,application/pdf',
          multiple: true,
        }}
        init={props.init?.ele_user[field.name]?.bill_imgs ?? []}
        formAction={props.action}
        noRule
        formItemCls={'ant-col-12'}
        formItemLayout={formListLayout}
      ></UploadCom>
    ),
  ];

  const clientInfoConfig = [
    {
      formType: 'rowText',
      itemProps: {
        label: '客户信息',
        className: 'w100',
      },
    },
    {
      colCls: 'hidden',
      noRule: true,
      itemProps: {
        label: 'id',
        name: 'id',
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
      formType: 'Select',
      selectData: clientClueLevelConfig,
      itemProps: {
        label: '客户等级',
        name: 'level',
      },
    },
    // {
    //   formType: 'Search',
    //   selectData: customerTypeConfig,
    //   itemProps: {
    //     label: '客户类型',
    //     name: 'type',
    //   },
    //   comProps: {
    //     mode: 'multiple',
    //   },
    // },
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
    ...(action === 'detail' ? [] : regionConfig),
    {
      flexRow: 1,
      itemProps: {
        label: '详细地址',
        name: ['enterprise', 'address'],
        ...addrLayout,
      },
      comProps: {
        className: 'rowInput ',
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
        label: '联系方式',
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
      label={'企业LOGO'}
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
      // formItemCls={'fixWidth'}
    ></UploadCom>,
    <UploadCom
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
      formAction={props.action}
      noRule
      formItemCls={'ant-col-12'}
      // formItemCls={'fixWidth'}
    ></UploadCom>,
    <UploadCom
      label={'门脸图'}
      key={'streetscape_img'}
      action={'/api/v1/upload'}
      name={'streetscape_img'}
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
      // formItemCls={'fixWidth'}
    ></UploadCom>,
  ].map(v => ({
    ...v,
    comProps: { className: `w-200 ${v.comProps?.className}`, ...v.comProps },
  }));

  const clientContactConfig = [
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
      checkboxData: contactCheckboxData,
      itemProps: {
        label: '催款联系人',
        name: 'is_urge',
        valuePropName: 'checked',
      },
      comProps: {
        children: checkOneCom,
      },
      onComChange: props.onCollectorChange,
      extraParams: {
        form: props.propsForm,
      },
    },
    {
      noRule: true,
      formType: 'Checkbox',
      formType: 'CheckboxItem',
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
        label: '电话',
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
        label: 'QQ',
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
        contacts: [{}],
        ele_user: [{}],
        ...props.init,
        level: props.init?.level ?? clientClueLevelConfig[0].value,
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
    const { enterprise, ele_user } = res;
    const item = ele_user[index];
    const matchItem = {
      ...item,
      city_code: enterprise.city_code,
      adcode: enterprise.adcode,
      latitude: enterprise.latitude,
      longitude: enterprise.longitude,
      district: enterprise.district,
    };
    console.log(' item ： ', item, enterprise, matchItem);
    const setFields = {
      ele_user: ele_user.map((v, i) => (index === i ? matchItem : v)),
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
        rowText: { label: '联系人', name: '', rowTitle: true },
        config: clientContactFormConfig,
        name: 'contacts',
        // extra: ContactExtra,
        isDisabledAll: action === 'detail' && !props.noDisabledContact,
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

  const houseNoFormConfig = [
    { label: '', name: '', rowTitle: true },
    ...houseNoConfig.map(v =>
      isValidElement(v) || typeof v === 'function'
        ? v
        : { ...v.itemProps, ...v },
    ),
  ];
  const HouseNoItem = (
    <FormListCom
      {...{
        form: props.propsForm,
        rowText: { label: '户号', name: '', rowTitle: true },
        config: houseNoFormConfig,
        name: 'ele_user',
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
  config.push(HouseNoCollapseCom);

  return (
    <div className="clientClueForm">
      <Form.Provider>{formCom}</Form.Provider>
    </div>
  );
};

export default ClientClueForm;
