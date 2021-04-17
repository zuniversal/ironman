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
import { DownOutlined } from '@ant-design/icons';

import SmartForm from '@/common/SmartForm';
import { treeList } from '@/configs';

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
    <Tabs defaultActiveKey="0">
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

const RoleForm = props => {
  const { formBtn, init, permsData = [], ...rest } = props;
  const { perms_codes = [] } = init;
  console.log(' RoleForm 1 ： ', props, perms_codes);

  const onSelect = (selectedKeys, info) => {
    console.log('onSelect', info);
  };

  const config = [
    {
      itemProps: {
        label: '角色名',
        name: 'name',
      },
    },
    {
      noRule: true,
      formType: 'TextArea',
      itemProps: {
        label: '描述',
        name: 'comments',
      },
    },
    // {
    //   formType: 'CustomCom',
    //   CustomCom: <RoleTab></RoleTab>,
    //   itemProps: {
    //     label: '',
    //   },
    // },
    // {
    //   formType: 'TreeSelect',
    //   itemProps: {
    //     label: '上级部门',
    //     name: 'parent_id',
    //   },
    //   comProps: {
    //     treeData: treeList,
    //   },
    // },

    // {
    //   noRule: true,
    //   formType: 'TreeSelect',
    //   itemProps: {
    //     label: '权限详情',
    //     name: 'perms_codes',
    //   },
    //   comProps: {
    //     treeData: props.permission,
    //     // treeData: treeList,
    //     // onChange: (e) => {
    //     //   console.log(' onChange ： ', e   )//
    //     // },
    //     // onTreeExpand: (organizationIds) => {
    //     //   console.log(' onTreeExpand ： ', organizationIds, props,   )//
    //     //   // if (organizationIds.length > 0) {
    //     //   //   props.getUserManageAsync({
    //     //   //     organization_id: organizationIds[organizationIds.length - 1],
    //     //   //   })
    //     //   // }
    //     // },
    //     // onSelect: (e) => {
    //     //   console.log(' onSelect ： ', e   )//
    //     // },
    //     // onSearch: (e) => {
    //     //   console.log(' onChange ： ', e   )//
    //     // },
    //     // loadData: (e) => {
    //     //   console.log(' loadData ： ', e   )//
    //     //   return new Promise((resolve, reject) => {
    //     //     console.log('  Promise ： ',  )
    //     //     //   props.getUserManageAsync({
    //     //     //     organization_id: organizationIds[organizationIds.length - 1],
    //     //     //   })
    //     //     resolve()
    //     //   })
    //     // },
    //     multiple: true,
    //     // treeCheckStrictly: true,
    //     treeCheckable: true,
    //   },
    // },

    {
      formType: 'CustomCom',
      CustomCom: <div>权限详情</div>,
    },
    {
      formType: 'CustomCom',
      CustomCom: (
        <Tree
          checkable
          // onExpand={onExpand}
          // expandedKeys={expandedKeys}
          // autoExpandParent={autoExpandParent}
          // onCheck={onCheck}
          // checkedKeys={checkedKeys}
          // onSelect={props.onPermsSelect}
          // onSelect={onSelect}
          // selectedKeys={perms_codes}
          defaultExpandedKeys={['all']}
          checkedKeys={props.permsData}
          // checkedKeys={[...permsData, 190000]}
          onCheck={props.onPermsCheck}
          treeData={props.permission}
          className={`roleAuthTree`}
          switcherIcon={<DownOutlined />}
          // checkStrictly
        />
      ),
      itemProps: {
        label: '',
      },
    },
  ];

  return (
    <div className={' RoleForm '}>
      <SmartForm config={config} {...props}></SmartForm>
    </div>
  );
};

RoleForm.defaultProps = {
  init: {},
};

export default RoleForm;
