import React, { useState } from 'react';
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
  Tree,
} from 'antd';

import SmartForm from '@/common/SmartForm'; //

const { TabPane } = Tabs;

const treeData = [
  {
    title: '系统管理',
    key: 'sys',
    children: [
      {
        title: '用户管理',
        key: 'user',
      },
      {
        title: '角色管理',
        key: 'role',
      },
    ],
  },

  {
    title: '运维管理',
    key: 'om',
    children: [
      {
        title: '巡检运维',
        key: 'check',
      },
    ],
  },
];

// const callback = (key,  ) => {
//   // console.log(' callback   key,  ,   ： ', key,    )

// }

const RoleTab = props => {
  console.log(' RoleTab   props,  ,   ： ', props);
  const [expandedKeys, setExpandedKeys] = useState(['sys', 'om']);
  const [checkedKeys, setCheckedKeys] = useState(['sys']);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = expandedKeys => {
    console.log('onExpand', expandedKeys);

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeys => {
    console.log('onCheck', checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeys);
  };

  const tabConfig = [
    { tab: '菜单权限' },
    { tab: '操作权限', disabled: true },
    { tab: '字典权限', disabled: true },
  ];

  return (
    <Tabs defaultActiveKey="1">
      {tabConfig.map((v, i) => (
        <TabPane tab={v.tab} key={v.tab} disabled={v.disabled}>
          <Tree
            checkable
            onExpand={onExpand}
            expandedKeys={expandedKeys}
            autoExpandParent={autoExpandParent}
            onCheck={onCheck}
            checkedKeys={checkedKeys}
            onSelect={onSelect}
            selectedKeys={selectedKeys}
            treeData={treeData}
          />
        </TabPane>
      ))}
    </Tabs>
  );
};

export const config = [
  {
    itemProps: {
      label: '角色名',
      name: 'name',
    },
  },
];

const RoleForm = props => {
  console.log(' RoleForm ： ', props); //
  const { formBtn, ...rest } = props; //
  const formProps = {
    // layout: 'vertical',
    // layout: 'inline',
  };

  return (
    <div className={' RoleForm '}>
      <SmartForm
        // flexRow={6}
        config={config}
        formProps={formProps}
        // init={init}
        // init={{}}

        {...rest}
      ></SmartForm>

      <RoleTab></RoleTab>
    </div>
  );
};

RoleForm.defaultProps = {};

export default RoleForm;
