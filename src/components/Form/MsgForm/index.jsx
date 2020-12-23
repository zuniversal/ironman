import React, { useState } from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm'; //
import { notifyTypeConfig, expandLoadTreeList } from '@/configs'; //
import { formatConfig } from '@/utils'; //
import { splitLine } from '@/common/SmartEcharts/charts/common';

const selectData = [
  { label: '应用内通知', value: 'app' },
  { label: '短信', value: 'msg' },
  { label: '邮件', value: 'email' },
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

const MsgForm = props => {
  console.log(' MsgForm ： ', props); //
  const { formBtn, flatOrganizeList, organizeList, ...rest } = props; //
  // const [ treeData, setTreeData ] = useState(expandLoadTreeList)
  // const [ treeData, setTreeData ] = useState(organizeList)
  const [treeData, setTreeData] = useState(flatOrganizeList);

  const config = [
    {
      formType: 'TextArea',
      itemProps: {
        label: '消息内容',
        name: 'content',
      },
    },
    {
      formType: 'Checkbox',
      itemProps: {
        label: '通知方法',
        name: 'send_type',
      },
      comProps: {
        options: notifyTypeConfig,
      },
      checkboxData: notifyTypeConfig,
    },
    // {
    //   formType: 'Checkbox',
    //   checkboxData: notifyTypeConfig,
    //   itemProps: {
    //     label: '通知方法',
    //     name: 'send_type',
    //   },
    // },
    {
      noRule: true,
      formType: 'TreeSelect',
      itemProps: {
        label: '通知人员',
        name: 'reciever',
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
        loadData: treeNode => {
          console.log(' loadData ： ', treeNode); //
          const { id } = treeNode.props;
          const item = id.split('-');
          const paramId = item[item.length - 1];
          console.log(' paramId ： ', item, paramId); //
          return props
            .getUserManageAsync({
              organization_id: paramId,
            })
            .then(res => {
              console.log(
                ' loadData res  ： ',
                res,
                treeData,
                treeNode,
                treeNode.props,
                id,
              );
              setTreeData(
                // treeData.concat([
                //   createTreeNode(id, false),
                // ])
                treeData.concat(res.map(v => createTreeNode(id, v))),
                // [...treeData,
                //   ...res.map((v) => createTreeNode(id, v))
                // ]
              );
              console.log(' treeDatatreeData ： ', treeData, res); //
              // return treeData
            });
          return new Promise((resolve, reject) => {
            //   props.getUserManageAsync({
            //     organization_id: organizationIds[organizationIds.length - 1],
            //   })
            const { id } = treeNode.props;
            console.log(
              '  Promise ： ',
              treeData,
              treeNode,
              treeNode.props,
              id,
            );
            setTimeout(() => {
              setTreeData(
                treeData.concat([
                  genTreeNode(id, false),
                  genTreeNode(id, true),
                ]),
              );
              resolve();
            }, 300);
          });
        },
        multiple: true,
        treeCheckable: true,
        treeDefaultExpandAll: false,
        treeDataSimpleMode: true,
      },
    },
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
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

MsgForm.defaultProps = {};

export default MsgForm;
