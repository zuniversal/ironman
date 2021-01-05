import React, { useState } from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import {
  // notifyTypeConfig,
  expandLoadTreeList,
} from '@/configs'; //
import { formatConfig } from '@/utils'; //
import { splitLine } from '@/common/SmartEcharts/charts/common';

const selectData = [
  { label: '应用内通知', value: 'app' },
  { label: '短信', value: 'msg' },
  { label: '邮件', value: 'email' },
];

const innerItem = {
  label: 'APP与运维管理平台',
  value: 2,
  key: 2,
};

const clientItem = {
  label: '小程序与客户平台',
  value: 2,
  key: 2,
};

const notifyTypeConfig = [
  {
    label: '短信',
    value: 0,
    key: 0,
  },
  {
    label: '邮件',
    value: 1,
    key: 1,
  },
];

const loadData = e => {
  console.log(' loadData   e,   ： ', e);
};

const genTreeNode = (parentId, isLeaf = false) => {
  const random = Math.random()
    .toString(36)
    .substring(2, 6);
  return {
    id: random,
    pId: parentId,
    value: random,
    title: isLeaf ? 'Tree Node' : 'Expand to load',
    isLeaf,
  };
};

const createTreeNode = (parentId, v, isLeaf = false) => {
  const random = Math.random()
    .toString(36)
    .substring(2, 6);
  return {
    ...v,
    // id: random,
    pId: parentId,
    value: v.id,
    title: v.nickname,
    key: `${v.id}`,
    // isLeaf: !(v.children.length > 0),
    isLeaf: true,
  };
};

// 注意 radio 设置了初始值 配置项的 value 值类型必须一致
const choiceRadios = [
  { label: '内部通知', value: 0, key: '0' },
  { label: '客户通知', value: 1, key: '1' },
];

const MsgForm = props => {
  console.log(' MsgForm ： ', props); //
  const { formBtn, organizeList, flatOrganizeList, ...rest } = props; //
  // const [ treeData, setTreeData ] = useState(expandLoadTreeList)
  const [treeData, setTreeData] = useState(organizeList);
  // const [treeData, setTreeData] = useState(flatOrganizeList);

  const { type = 0 } = props.init;
  const [msgType, setMsgType] = useState(type);

  const msgDeptCol = [
    {
      noRule: true,
      formType: 'TreeSelect',
      itemProps: {
        label: '通知人员',
        name: 'department',
      },
      comProps: {
        // treeData: props.organizeList,
        // treeData: expandLoadTreeList,
        treeData: treeData,
        onChange: e => {
          console.log(' onChange ： ', e); //
        },
        onTreeExpand: organizationIds => {
          console.log(' onTreeExpand ： ', organizationIds, props, treeData); //
          // if (organizationIds.length > 0) {
          //   props.getUserManageAsync({
          //     organization_id: organizationIds[organizationIds.length - 1],
          //   })
          // }
        },
        onSelect: e => {
          console.log(' onSelect ： ', e); //
        },
        onSearch: e => {
          console.log(' onChange ： ', e); //
        },
        // loadData: treeNode => {
        //   console.log(' loadData ： ', treeNode); //
        //   const { id } = treeNode.props;
        //   const item = id.split('-');
        //   const paramId = item[item.length - 1];
        //   console.log(' paramId ： ', item, paramId); //
        //   return props
        //     .getUserManageAsync({
        //       organization_id: paramId,
        //     })
        //     .then(res => {
        //       console.log(
        //         ' loadData res  ： ',
        //         res,
        //         treeData,
        //         treeNode,
        //         treeNode.props,
        //         id,
        //       );
        //       setTreeData(
        //         // treeData.concat([
        //         //   createTreeNode(id, false),
        //         // ])
        //         treeData.concat(res.map(v => createTreeNode(id, v))),
        //         // [...treeData,
        //         //   ...res.map((v) => createTreeNode(id, v))
        //         // ]
        //       );
        //       console.log(' treeDatatreeData ： ', treeData, res); //
        //       // return treeData
        //     });
        //   return new Promise((resolve, reject) => {
        //     //   props.getUserManageAsync({
        //     //     organization_id: organizationIds[organizationIds.length - 1],
        //     //   })
        //     const { id } = treeNode.props;
        //     console.log(
        //       '  Promise ： ',
        //       treeData,
        //       treeNode,
        //       treeNode.props,
        //       id,
        //     );
        //     setTimeout(() => {
        //       setTreeData(
        //         treeData.concat([
        //           genTreeNode(id, false),
        //           genTreeNode(id, true),
        //         ]),
        //       );
        //       resolve();
        //     }, 300);
        //   });
        // },
        multiple: true,
        treeCheckable: true,
        treeDefaultExpandAll: false,
        treeDataSimpleMode: true,
      },
    },
  ];
  const msgClientCol = [
    {
      formType: 'Search',
      selectData: props.clientList,
      itemProps: {
        label: '通知人员',
        name: 'customer',
      },
      comProps: {
        mode: 'multiple',
      },
    },
  ];

  const onTypeChange = e => {
    console.log('  onTypeChange   e, 改变设置  ： ', e, e.target.value);
    setMsgType(e.target.value);
  };

  // const msgType = props.propsForm.getFieldValue('type');
  const notifyCol = msgType == 0 ? msgDeptCol : msgClientCol;
  const methodItem = msgType == 0 ? innerItem : clientItem;
  console.log(' msgType ： ', msgType, methodItem); //

  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '消息内容',
        name: 'content',
      },
    },
    {
      formType: 'Radio',
      itemProps: {
        label: '通知类型',
        name: 'type',
      },
      comProps: {
        onChange: onTypeChange,
      },
      radioData: choiceRadios,
    },
    {
      formType: 'Checkbox',
      itemProps: {
        label: '通知方法',
        name: 'send_type',
      },
      checkboxData: [
        // msgType == 0 ? innerItem : clientItem,
        methodItem,
        ...notifyTypeConfig,
      ],
    },

    ...notifyCol,

    // {
    //   formType: 'Checkbox',
    //   checkboxData: notifyTypeConfig,
    //   itemProps: {
    //     label: '通知方法',
    //     name: 'send_type',
    //   },
    // },

    // {
    //   noRule: true,
    //   formType: 'TreeSelect',
    //   // formType: 'Search',
    //   selectSearch: props.getUserManageAsync,
    //   selectData: props.userList,
    //   itemProps: {
    //     label: '通知人员',
    //     name: 'reciever',
    //   },
    //   comProps: {
    //     mode: 'multiple',
    //     // loadData: props.loadData,
    //     // onTreeExpand: loadData,
    //     treeData: expandLoadTreeList,
    //     onChange: (e) => {
    //       console.log(' onChange ： ', e   )//
    //     },
    //     onTreeExpand: (e) => {
    //       console.log(' onTreeExpand ： ', e   )//
    //     },
    //     onSelect: (e) => {
    //       console.log(' onSelect ： ', e   )//
    //     },
    //     onSearch: (e) => {
    //       console.log(' onChange ： ', e   )//
    //     },

    //   },
    // },
  ];

  return (
    <div className={' MsgForm '}>
      <SmartForm
        config={config}
        {...rest}
        init={{
          type: 0,
          ...props.init,
        }}
      ></SmartForm>

      {formBtn}
    </div>
  );
};

MsgForm.defaultProps = {
  init: {},
};

export default MsgForm;
