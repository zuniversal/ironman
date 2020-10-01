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
  Tabs,
} from 'antd';

import SmartForm from '@/common/SmartForm'; //
import InputCom from '@/components/Widgets/InputCom'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

const TabPanes = () => (
  <div className="w100">
    <Tabs defaultActiveKey="1" onChange={callback}>
      <TabPane tab={'电源编号1'} key="1">
        {/* 电源编号 121 */}
      </TabPane>
      <TabPane tab={'电源编号2'} key="2">
        {/* 电源编号 122 */}
      </TabPane>
    </Tabs>
  </div>
);

const formLayouts = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 9 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 15 }, //
  },
};

const subFormLayouts = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 }, //
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 }, //
  },
};

const InspectRecordForm = props => {
  console.log(' InspectRecordForm ： ', props); //
  const { formBtn, ...rest } = props; //

  const config = [
    {
      noRule: true,
      itemProps: {
        label: '户名',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '户号',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '客户名称',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '电压等级',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '总存量',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '电源编号',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '巡检人员',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '巡检时间',
      },
      comProps: {
        disabled: true,
      },
    },
    {
      itemProps: {
        label: '温度',
      },
    },
    {
      itemProps: {
        label: '湿度',
      },
    },
    {
      itemProps: {
        label: '天气',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '房屋土建1',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '电缆沟及盖板',
      },
    },
    {
      itemProps: {
        label: '护网',
      },
    },
    {
      itemProps: {
        label: '地面裂縫',
      },
    },
    {
      itemProps: {
        label: '门窗',
      },
    },
    {
      itemProps: {
        label: '房屋渗水',
      },
    },
    {
      itemProps: {
        label: '电缆夹屋孔洞',
      },
    },

    {
      formType: 'rowText',
      itemProps: {
        label: '安全工器具状况/上次试验日期',
        className: 'w100',
      },
    },
    {
      itemProps: {
        label: '高压试电笔(1年)',
      },
    },
    {
      itemProps: {
        label: '接地线(4年)',
      },
    },
    {
      itemProps: {
        label: '绝缘毯(4年)',
      },
    },
    {
      itemProps: {
        label: '绝缘手套(半年)',
      },
    },
    {
      itemProps: {
        label: '绝縐鞋(半年)',
      },
    },
    {
      itemProps: {
        label: '灭火器压力(半年)',
      },
    },

    {
      formType: 'CustomCom',
      CustomCom: <TabPanes></TabPanes>,
      itemProps: {
        label: '',
        className: 'w100',
      },
    },

    {
      noRule: true,
      itemProps: {
        label: '电压等级',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '总容量',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际总容量',
      },
    },

    {
      noRule: true,
      formType: 'rowText',
      itemProps: {
        label: '电表读数',
        className: 'w100',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '表号',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '倍事',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '考核功率因数',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '总有功(02)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '峰(03)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平1 (41)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平2 (42)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '谷(05)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '峰MD1(61)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平1MD(62)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '平2MD(63)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '谷MD(64)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '最大MD ',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '本月申报MD',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '无功1 (07)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '无功2 (08)',
      },
    },
    {
      noRule: true,
      itemProps: {
        label: '实际功率因数',
      },
    },

    {
      noRule: true,
      formType: 'rowText',
      itemProps: {
        label: '高压进制线',
        className: 'w100',
      },
    },

    {
      flexRow: 4,
      noRule: true,
      formType: 'Label',
      itemProps: {
        label: ' ',
      },
      LabelCom: '电压表',
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'AB',
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'BC',
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'CA',
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      flexRow: 4,
      noRule: true,
      formType: 'Label',
      itemProps: {
        label: ' ',
      },
      LabelCom: '显示器',
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'A',
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'B',
      },
      comProps: {
        className: 'w-78',
      },
    },
    {
      noRule: true,
      flexRow: 4,
      itemProps: {
        label: 'C',
      },
      comProps: {
        className: 'w-78',
      },
    },
  ];

  const configs = config.map(v => ({
    ...v,
    comProps: { className: 'w-200', ...v.comProps },
  }));
  console.log(' configs  config.map v ： ', configs);

  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' InspectRecordForm '}>
      <SmartForm
        flexRow={2}
        // config={config}
        config={configs}
        formProps={formProps}
        // init={init}
        // init={{}}

        formLayouts={formLayouts}
        {...rest}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

InspectRecordForm.defaultProps = {};

export default InspectRecordForm;
