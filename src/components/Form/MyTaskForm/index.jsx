import React from 'react';
import './style.less';
import { Form, Select, Input, Row, Checkbox, Button, Collapse } from 'antd';

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

import useHttp from '@/hooks/useHttp';
import { getServiceStaff } from '@/services/userManage';
import { getList as getTagList } from '@/services/tags';
import { getList as getOrganize } from '@/services/organize';
import { recursiveHandle } from '@/models/organize';
import { formatSelectList, filterObjSame } from '@/utils';

const { Panel } = Collapse;
const { Option } = Select;

function callback(key) {
  console.log(key);
}

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
      onChange={callback}
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
                return v.type !== 'rowText' && !v.rowTitle ? (
                  <Form.Item
                    {...field}
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
              return formItem;
            })}
          </Row>
        );
      }}
    </Form.List>
  );
  return formListCom;
};

FormListCom.defaultProps = {};

const MyTaskForm = props => {
  console.log(' MyTaskForm ： ', props, props.init);

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
  console.log(' userList ： ', userList); //

  const regionConfig = [
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: props.provinceList,
      itemProps: {
        label: '省',
        // name: 'province',
        name: ['enterprise', 'province'],
        ...addrLayout1,
      },
      comProps: {
        className: 'w-135',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: props.citytList,
      itemProps: {
        label: '市',
        // name: 'city',
        name: ['enterprise', 'city'],
        ...addrLayout2,
      },
      comProps: {
        className: 'w-135',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: props.countryList,
      itemProps: {
        label: '县',
        // name: 'area',
        name: ['enterprise', 'area'],
        ...addrLayout2,
      },
      comProps: {
        className: 'w-135',
      },
    },
  ];

  const onRegionChange = params => {
    console.log(
      ' %c onRegionChange 组件 params ： ',
      `color: #333; font-weight: bold`,
      params,
    );
  };

  const houseNoRegionConfig = [
    {
      noRule: true,
      flexRow: 3,
      formType: 'Search',
      selectData: props.provinceList,
      itemProps: {
        label: '省',
        name: 'province',
        // ...addrLayout1,
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
      selectData: props.citytList,
      itemProps: {
        label: '市',
        name: 'city',
        // ...addrLayout2,
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
      selectData: props.countryList,
      itemProps: {
        label: '县',
        name: 'area',
        // ...addrLayout2,
      },
      onComChange: props.onHouseNoRegionChange,
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

  const clientInfoConfig = [
    // {
    //   flexRow: 1,
    //   itemProps: {
    //     label: '客户名称',
    //     name: 'name',
    //     ...addrLayout,
    //   },
    //   comProps: {
    //     className: 'rowInput ',
    //   },
    // },
    {
      noRule: true,
      flexRow: 3,
      formType: 'plainText',
      colCls: 'plainTextItem',
      itemProps: {
        label: '提交人:',
        name: '',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'plainText',
      colCls: 'plainTextItem',
      itemProps: {
        label: '联系电话:',
        name: '',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'plainText',
      colCls: 'plainTextItem',
      itemProps: {
        label: '提交时间:',
        name: '',
      },
    },
    {
      noRule: true,
      flexRow: 3,
      formType: 'plainText',
      colCls: 'plainTextItem',
      itemProps: {
        label: '所属计划:',
        name: '',
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
    // ...(action === 'detail' ? [] : regionConfig),
    {
      flexRow: 1,
      // formType: 'Search',
      // selectSearch: props.getGeoAsync,
      // selectData: props.geoList,
      itemProps: {
        label: '联系地址',
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
        label: '户号',
        name: ['enterprise', ''],
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
      itemProps: {
        label: '户号',
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
      label={'门脸图'}
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
  // config.push(...attach);

  const adminConfig = [
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
  ];

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
      // opType: 'option',
      checkboxData: checkboxData,
      itemProps: {
        label: '催款联系人',
        name: 'is_urge',
        valuePropName: 'checked',
      },
      onComChange: props.onCollectorChange,
      extraParams: {
        form: props.propsForm,
      },
    },
    {
      noRule: true,
      formType: 'Checkbox',
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
    {
      // noRule: true,
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
        contact: [{}],
        ...objNum2str(props.init, [
          'service_organization_id',
          'service_staff_id',
          'last_service_staff_id',
          'service_enterprise_id',
          'tags',
        ]),
      }}
      formLayouts={formLayouts}
      flexRow={2}
    ></SmartForm>
  );

  console.log(' configconfig ： ', config);

  const copy2Admin = params => {
    const { index } = params;
    const res = props.propsForm.getFieldsValue();
    console.log(' copy2Admin   params,   ： ', params, res);
    const { contact, customer_admin } = res;
    const copyItem = contact[index];
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

  const clientContactFormConfig = [
    { label: '', name: '', rowTitle: true },
    ...clientContactConfig.map(v => ({ ...v.itemProps, ...v })),
  ];
  const ClientContactItem = (
    <FormListCom
      {...{
        rowText: { label: '联系人', name: '', rowTitle: true },
        config: clientContactFormConfig,
        name: 'contact',
        extra: ContactExtra,
        isDisabledAll: action === 'detail',
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
        rowText: { label: '客户管理员', name: '', rowTitle: true },
        config: adminFormConfig,
        name: 'customer_admin',
        isDisabledAll: action === 'detail',
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
  config.push(AdminCollapseCom);

  return (
    <div className="myTaskForm">
      <Form.Provider>{formCom}</Form.Provider>
    </div>
  );
};

export default MyTaskForm;
