import React from 'react';
import './style.less';
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
  Radio,
  Space,
  InputNumber,
} from 'antd';

import SmartForm, { SearchForm } from '@/common/SmartForm'; //
import UploadCom from '@/components/Widgets/UploadCom'; //
import { regoins, customerTypeConfig } from '@/configs'; //
import { formatConfig, reportRadioOp, tips } from '@/utils'; //

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

export const AdminForm = props => {
  console.log(' AdminForm ： ', props); //
  const { action, getCapture, addUserAsync } = props; //

  const [form] = Form.useForm();

  const config = [
    {
      formType: 'rowText',
      noRule: true,
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
                .length || props.isDisabledAll
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

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <SmartForm
      // flexRow={6}
      config={config}
      formProps={formProps}
      // init={init}
      // init={{}}
      name={'admin'}
      propsForm={form}
      noRuleAll
      formLayouts={rowLayout}
      noLabelLayout
      {...props}
    ></SmartForm>
  );
};

const ClientForm = props => {
  console.log(' ClientForm ： ', props); //

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
    {
      noRule: true,
      itemProps: {
        label: '经度',
        name: 'longitude',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '纬度',
        name: 'latitude',
      },
      comProps: {
        disabled: true,
      },
    },
  ];

  const config = [
    {
      formType: 'rowText',
      // noRule: true,
      itemProps: {
        label: '基本信息',
      },
    },
    {
      // formType: 'Search',
      // selectSearch: props.getXXXX,
      // selectData: props.XXXXList,
      itemProps: {
        label: '客户名称',
        name: 'name',
      },
    },
    {
      formType: 'Search',
      selectData: customerTypeConfig,
      itemProps: {
        label: '客户类型',
        name: 'type',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '客户代表',
        name: 'service_staff',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getUserAsync,
      selectData: props.userList,
      itemProps: {
        label: '客户代表2',
        name: 'last_service_staff',
      },
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '客户编码',
        name: 'code',
      },
    },

    {
      // formType: 'Select',
      itemProps: {
        label: '客户等级',
        name: 'level',
      },
    },

    {
      // formType: 'Select',
      itemProps: {
        label: '所属行业',
        name: 'industry',
      },
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '企业规模',
        name: 'scale',
      },
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '资产规模',
        name: 'asset',
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
      // formType: 'Select',
      itemProps: {
        label: '占地面积',
        name: 'covered_area',
      },
    },
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
      action={'logo'}
      action={'/api/v1/upload'}
      name={'logo'}
      extra={'支持扩展名:pdf、jpg、png'}
    ></UploadCom>,

    {
      formType: 'rowText',
      // noRule: true,
      itemProps: {
        label: '位置信息',
      },
    },
    {
      // formType: 'Select',
      itemProps: {
        label: '详细地址',
        name: 'address',
      },
    },
    ...(action !== 'add' ? areaConfig : []),
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

    {
      formType: 'rowText',
      noRule: true,
      itemProps: {
        label: '其他信息',
      },
    },
  ];

  const attach = [
    // {
    //   itemProps: {
    //     label: '附件',
    //     name: 'attach',
    //   },
    // },
    <UploadCom
      label={'附件'}
      key={'attach'}
      isInputUpload
      text={'上传文件'}
      contentClass={'dfc'}
      action={'/api/v1/upload'}
      name={'file'}
      extra={'支持扩展名:pdf、jpg、png'}
      // formItemProps={{

      // }}
    ></UploadCom>,
  ];

  const userCaptureInfo = [
    {
      itemProps: {
        label: '下属户号',
        name: 'owner',
        colon: false,
      },
      extra: (
        <Button
          onClick={() => {
            console.log(' getCapture ： ', getCapture); //
            return getCapture({ action: 'userCapture' });
          }}
          className="m-l-5"
        >
          用户画像
        </Button>
      ),
    },
    {
      itemProps: {
        label: '附件',
        name: 'attach',
      },
    },
  ];

  if (action === 'add') {
    config.push(...attach);
    // } else if (action === '') {
  } else if (action === 'edit' || action === 'detail') {
    config.push(...userCaptureInfo);
  }
  console.log(' configconfig ： ', config); //

  const { propsForm, ...restProps } = props;

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className="clientForm">
      <Form.Provider
        onFormFinish={(name, { values, forms }) => {
          console.log(' name, values, forms ： ', name, values, forms); //
        }}
      >
        <SmartForm
          // flexRow={4}
          config={config}
          formProps={formProps}
          // init={init}
          // init={{}}
          isDisabledAll={action === 'detail'}
          {...props}
        ></SmartForm>

        <AdminForm {...restProps}></AdminForm>
      </Form.Provider>
    </div>
  );
};

ClientForm.defaultProps = {};

export default ClientForm;
