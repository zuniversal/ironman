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

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import UploadCom from '@/components/Widgets/UploadCom'; //
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
} from '@/configs'; //
import { tips, renderCheckboxOp, renderSelectOp } from '@/utils'; //
import SmartFormTable from '@/common/SmartFormTable';
import ReduxTable from '@/common/ReduxTable';

import {
  SettingOutlined,
  PlusOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { getLabel } from '@/common/SmartForm';
import { REQUIRE, SELECT_TXT } from '@/constants';
import debounce from 'lodash/debounce';

const { Panel } = Collapse;
const { Option } = Select;

function callback(key) {
  console.log(key);
}

const genExtra = () => (
  <SettingOutlined
    onClick={event => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }}
  />
);

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
  const { com, header = '', extra } = props; //
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

// const collapseCom = (
//   <Collapse
//     defaultActiveKey={['1']}
//     onChange={callback}
//     expandIconPosition={'left'}
//   >
//     <Panel header="This is panel header 1" key="1" extra={genExtra()}>
//       <div>text</div>
//     </Panel>
//     <Panel header="This is panel header 2" key="2">
//       <div>text</div>
//     </Panel>
//     <Panel header="This is panel header 3" key="3">
//       <div>text</div>
//     </Panel>
//   </Collapse>
// );
// config.push(collapseCom);

export const AdminForm = props => {
  console.log(' AdminForm ： ', props); //
  const { action, getCapture, addUserAsync } = props; //

  const [form] = Form.useForm();

  const config = [
    {
      formType: 'rowText',
      itemProps: {
        label: '管理员信息',
      },
    },
    {
      formType: 'Dynamic',
      itemProps: {
        label: '',
        // label: '用户名',
        name: 'customer_admin', //
        className: 'noMargin',
      },
      comProps: {
        limit: 5,
        extra: true,
        filterSelect: true,
        rowExtra: true,
        extraChildren: (
          <Button
            onClick={() => {
              console.log(' props addUserAsync ： ', props); //
              // if (Object.keys(props.init).length) {
              console.log('  对吗  customer_admin.length ', props.init);
              // if (props.init.customer_admin.length) {
              addUserAsync({ ...props, propsForm: form });
              // } else {
              //   tips('无管理员初始数据！', 2);
              // }
              // }
            }}
            disabled={
              form.getFieldsError().filter(({ errors }) => errors.length)
                .length ||
              props.isDisabledAll ||
              action === 'detail'
            }
          >
            保存
          </Button>
        ),
        // noRule: true,
        // formType: 'DynamicArr',
        config: [
          {
            itemProps: {
              name: 'nickname',
              label: '用户名',
            },
            comProps: {
              className: 'w-320',
            },
          },
          {
            noRule: action !== 'add',
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
    },

    // {
    //   formType: 'PropsCom',
    //   PropsCom: props =>
    //     props.action !== 'detail' && (
    //       <div className="dfc">
    //         <Button
    //           type="primary"
    //           onClick={() => {
    //             console.log(' props addUserAsync ： ', props); //
    //             // if (Object.keys(props.init).length) {
    //             console.log('  对吗  customer_admin.length ', props.init);
    //             // if (props.init.customer_admin.length) {
    //             addUserAsync(props);
    //             // } else {
    //             //   tips('无管理员初始数据！', 2);
    //             // }
    //             // }
    //           }}
    //           disabled={
    //             form.getFieldsError().filter(({ errors }) => errors.length)
    //               .length
    //           }
    //         >
    //           保存管理员信息
    //         </Button>
    //       </div>
    //     ),
    //   itemProps: {
    //     label: ' ',
    //     // className: 'dfc',
    //   },
    // },
  ];

  return (
    <SmartForm
      config={config}
      // name={'admin'}
      propsForm={form}
      noRuleAll
      formLayouts={rowLayout}
      noLabelLayout
      isDisabledAll={action === 'detail'}
      {...props}
    ></SmartForm>
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
  console.log(' SelectCom ： ', props); //
  const {
    formType = 'Input',
    itemProps = {},
    comProps = {},
    selectData,
  } = props; //
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
  const { label, LabelCom, CustomCom, plainText, index } = props; //

  const { formType = 'Input', itemProps = {}, comProps = {} } = props;

  if (props.onComChange) {
    comProps.onChange = (...e) =>
      props.onComChange(...e, { index, ...props.extraParams });
    // if (formType === 'Search') {
    //   comProps.onSelect = (...e) => props.onComChange(...e, {index, ...props.extraParams})
    // }
  }
  console.log(' ReduxTable  getWidget   props,   ： ', props, comProps);

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
  const { config = [], name, rowText, ...rest } = props; //
  console.log(' FormListCom   props,   ： ', props);
  const formListCom = (
    <Form.List name={name} key={name}>
      {(fields, { add, remove }) => {
        console.log(' dataInit  fieldsfields ： ', fields); //
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
                  {fields.length > 1 && (
                    <Button
                      shape="circle"
                      icon={<MinusOutlined />}
                      onClick={() => remove(field.name)}
                    ></Button>
                  )}
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

FormListCom.defaultProps = {
  // renderHeaderRight: () => {},
};

const ClientForm = props => {
  console.log(' ClientForm ： ', props, props.init); //

  const { action, getCapture, addUserAsync } = props; //

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
        label: '省1',
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
      onComChange: props.onAddrChange,
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
        className: 'address ',
      },
    },
    // {
    //   formType: 'Checkbox',
    //   opType: 'option',
    //   checkboxData: checkboxData,
    //   itemProps: {
    //     label: '是否离职',
    //     name: 'is_quit',
    //     valuePropName: "checked",
    //   },
    // },
    {
      flexRow: 1,
      formType: 'Search',
      selectData: props.enterpriseList,
      itemProps: {
        label: '服务企业',
        name: 'service_enterprise_id',
        ...addrLayout,
      },
      comProps: {
        className: 'address ',
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
      selectData: props.userList,
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
      selectSearch: props.getUserAsync,
      selectData: props.userList,
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
        treeData: props.organizeList,
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
        className: 'address ',
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
      // selectSearch: props.getGeoAsync,
      // selectData: props.geoList,
      itemProps: {
        label: '详细地址',
        name: ['enterprise', 'address'],
        ...addrLayout,
      },
      comProps: {
        className: 'address ',
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

    // {
    //   itemProps: {
    //     label: '企业Logo',
    //     name: 'logo',
    //   },
    //
    // },
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

    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '位置信息',
    //     className: 'w100',
    //   },
    // },

    // ...(action !== 'add' ? areaConfig : []),
    // adminItem,

    // {
    //   formType: 'rowText',
    //   noRule: true,
    //   itemProps: {
    //     label: '管理员信息',
    //   },
    // },

    // {
    //   formType: 'Dynamic',
    //   itemProps: {
    //     // label: '',
    //     label: '用户名',
    //     name: 'admin',
    //     className: 'noMargin',
    //   },
    //   comProps: {
    //     extra: true,
    //     itemProps: {
    //       name: 'nickname', //
    //       label: '用户名',
    //     },
    //     comProps: {
    //       className: 'w-320',
    //     },
    //   },
    // },

    // {
    //   // formType: 'Select',
    //   itemProps: {
    //     label: '密码',
    //     name: 'password',
    //   },
    //
    //   noRule: true,
    // },
    // {
    //   // formType: 'Select',
    //   itemProps: {
    //     label: '手机号',
    //     name: 'phone',
    //   },
    //
    //   noRule: true,
    // },

    // {
    //   formType: 'PropsCom',
    //   PropsCom: props => (
    //     <div className="dfc">
    //       <Button
    //         type="primary"
    //         onClick={() => {
    //           console.log(' props addUserAsync ： ', props); //
    //           addUserAsync(props);
    //         }}
    //       >
    //         保存管理员信息
    //       </Button>
    //     </div>
    //   ),
    // },

    // {
    //   formType: 'CustomCom',
    //   CustomCom: <AdminForm {...props}></AdminForm>,
    // },

    // {
    //   formType: 'rowText',
    //   itemProps: {
    //     label: '其他信息',
    //   },
    // },
  ].map(v => ({
    ...v,
    comProps: { className: `w-200 ${v.comProps?.className}`, ...v.comProps },
  }));

  const attach = [
    // {
    //   itemProps: {
    //     label: '附件',
    //     name: 'attach',
    //   },
    // },
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

  const userCaptureInfo = [
    {
      noRule: true,
      formType: 'plainText',
      plainText: (
        <div className="textInput w-320 linking">
          {/* {props.init?.electricityuser} */}
          {props.init?.electricityuser?.map((v, i) => (
            <div
              className="linking"
              key={i}
              onClick={() => {
                props.showItemAsync({
                  action: 'houseNoDetailAsync',
                  d_id: v.id,
                });
              }}
            >
              {v.number}
            </div>
          ))}
        </div>
      ),
      itemProps: {
        label: '下属户号',
        name: 'electricityuser',
        colon: false,
      },
      extra: (
        <Button
          onClick={() => {
            console.log(' getCapture ： ', getCapture); //
            return getCapture && getCapture({ action: 'userCapture' });
          }}
          className="m-l-5"
        >
          用户画像
        </Button>
      ),
    },
    // {
    //   itemProps: {
    //     label: '附件',
    //     name: 'attach',
    //   },
    // },
  ];

  config.push(...attach);
  if (action === 'add') {
    // config.push(...attach);
    // } else if (action === '') {
    // } else if (action === 'edit' || action === 'detail') {
  } else if (action === 'detail') {
    // config.push(...userCaptureInfo);
  }

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
      // noRule: true,
      formType: 'Search',
      // selectSearch: props.getTagsAsync,
      selectData: props.tagsList,
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

  const dataSource =
    action === 'detail' ? props.init.customer_admin : props.tableData;

  const contactDataSource =
    action === 'detail' ? props.init.customer_admin : props.contactTableData;

  // const adminFormTable = [
  //   {
  //     formType: 'rowText',
  //     itemProps: {
  //       label: '管理员信息',
  //       className: 'w100',
  //     },
  //   },
  //   <ReduxTable
  //     key={'adminFormTable'}
  //     config={adminConfig.map(v => ({ ...v.itemProps, isEdit: true }))}
  //     addTableItemAsync={props.addTableItemAsync}
  //     editTableItemAsync={props.editTableItemAsync}
  //     removeTableItemAsync={props.removeTableItemAsync}
  //     modifyTableItem={props.modifyTableItem}
  //     dataSource={dataSource}
  //     isDisabledAll={!['add', 'edit'].includes(action)}
  //     noLimitAdd
  //     // hideSaveEdit={['add'].includes(action)}
  //   ></ReduxTable>,
  // ];

  // const clientContactFormTable = [
  //   {
  //     formType: 'rowText',
  //     itemProps: {
  //       label: '客户联系人信息',
  //       className: 'w100',
  //     },
  //   },
  //   <ReduxTable
  //     key={'clientContactFormTable'}
  //     config={clientContactConfig.map(v => ({ ...v.itemProps, isEdit: true }))}
  //     addTableItemAsync={props.addTableItemAsync}
  //     editTableItemAsync={props.editTableItemAsync}
  //     removeTableItemAsync={props.removeTableItemAsync}
  //     modifyTableItem={props.modifyTableItem}
  //     dataSource={contactDataSource}
  //     isDisabledAll={!['add', 'edit'].includes(action)}
  //     noLimitAdd
  //     // hideSaveEdit={['add'].includes(action)}
  //   ></ReduxTable>,
  // ];

  // config.push(...adminFormTable);
  // config.push(...clientContactFormTable);

  const formCom = (
    <SmartForm
      config={config}
      isDisabledAll={action === 'detail'}
      {...props}
      init={{
        // customer_admin: [{}],
        // contact: [{}],
        // electricity_user: [{}],
        // enterprise: { address: '泉港区' },
        ...props.init,
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
        // contact: [
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
    ></SmartForm>
  );

  const formCollapseCom = (
    <Collapse
      defaultActiveKey={['1']}
      onChange={callback}
      expandIconPosition={'left'}
    >
      <Panel header={'客户信息'} key="1" extra={genExtra()}>
        {formCom}
      </Panel>
    </Collapse>
  );
  console.log(' configconfig ： ', config); //

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
      console.log('  res ：', res, copyItem, newAdminData); //
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
    console.log(' item ： ', item, enterprise, matchItem); //
    const setFields = {
      electricity_user: electricity_user.map((v, i) =>
        index === i ? matchItem : v,
      ),
    };
    console.log('  res ：', res, item, setFields); //
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
  if (action !== 'detail') config.push(AdminCollapseCom);

  const houseNoFormConfig = [
    { label: '', name: '', rowTitle: true },
    // { label: '电压表', name: '', type: 'rowText' },
    ...houseNoConfig.map(v => ({ ...v.itemProps, ...v })),
  ];
  const HouseNoItem = (
    <FormListCom
      {...{
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
  if (action !== 'detail') config.push(HouseNoCollapseCom);

  const { propsForm, ...restProps } = props;

  return (
    <div className="clientForm">
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          console.log(' name, values, forms ： ', name, values, forms); //
        }}
      >
        {/* <Form
          name={'customer_admin'}
          init={{
            ...props.init,
            // customer_admin: [{}],

            customer_admin: props.tableData,
          }}
          form={props.propsForm}
          onFieldsChange={props.onAdminChange}
        >
          <SmartFormTable
            config={adminConfig.map(v => ({ ...v.itemProps, editing: true }))}
            name="customer_admin"
            key={'customer_admin'}
            // {...props}
            // save={props.saveAdmin}
            // remove={props.removeAdmin}
            form={props.propsForm}
            // data={props.adminList}
            data={props.tableData}
            modifyTableItem={props.modifyTableItem}
            save={props.addTableItemAsync}
            remove={props.removeTableItemAsync}
          />
        </Form> */}
        {/* <AdminForm {...restProps}></AdminForm> */}

        {/* {formCollapseCom} */}
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
