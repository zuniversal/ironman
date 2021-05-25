import React, { useState, useMemo } from 'react';
import './style.less';
import AssetsForm from '@/components/Form/AssetsForm';
import {
  EditOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
  FileOutlined,
  FolderOpenOutlined,
} from '@ant-design/icons';
import { Tree, Input, Row, Col, Button, Tooltip, Form } from 'antd';
import { recursiveResetAssets } from '@/models/assets'; //
import { num2Str } from '@/utils';

const { DirectoryTree } = Tree;

const EmptyAsset = props => {
  console.log('EmptyAsset     ,   ： ', props);
  return (
    <div className={`dfc`}>
      该处资产现在为空，请添加资产
      <Button
        type="primary"
        onClick={() =>
          // props.editItems({
          //   action: 'editItems',
          //   // item,
          //   form: props.form,
          // })
          // props.addTreeNode(props.selectItem)
          props.changeAction({
            action: 'edit',
          })
        }
        className={`m-l-10`}
      >
        新增
      </Button>
    </div>
  );
};

const AssetForm = props => (
  <AssetsForm
    flexRow={2}
    formBtn={props.renderFormBtn}
    key={props.init.id}
    {...props}
  ></AssetsForm>
);

const recursiveHandle = recursiveResetAssets;

export const recursiveKeys = (data = [], allKeys = []) => {
  // console.log('treeData  recursiveKeys   ,   ： ', data, allKeys);
  // return data.map((v, i) => ({...v,}));
  data.forEach((v, i) => {
    allKeys.push(v.key);
    if (v.children) {
      recursiveKeys(v.children, allKeys);
    }
  });
};
const datas = [
  {
    title: '0-0',
    key: '0-0',
    children: [
      {
        title: '0-0-0',
        key: '0-0-0',
        children: [
          { title: '0-0-0-0', key: '0-0-0-0' },
          { title: '0-0-0-1', key: '0-0-0-1' },
          { title: '0-0-0-2', key: '0-0-0-2' },
        ],
      },
      {
        title: '0-0-1',
        key: '0-0-1',
        children: [
          { title: '0-0-1-0', key: '0-0-1-0' },
          { title: '0-0-1-1', key: '0-0-1-1' },
          { title: '0-0-1-2', key: '0-0-1-2' },
        ],
      },
      {
        title: '0-0-2',
        key: '0-0-2',
      },
    ],
  },
  {
    title: '0-1',
    key: '0-1',
    children: [
      { title: '0-1-0-0', key: '0-1-0-0' },
      { title: '0-1-0-1', key: '0-1-0-1' },
      { title: '0-1-0-2', key: '0-1-0-2' },
    ],
  },
  {
    title: '0-2',
    key: '0-2',
  },
];

const AssetTree = props => {
  const [form] = Form.useForm();
  const [searchValue, setSearchValue] = useState('');
  const { treeData } = props; //

  console.log(' AssetTree ： ', props); //

  const onChange = e => {
    console.log('  onChange  ：', e, searchValue);
    setSearchValue(e.target.value);
  };

  const onClick = (selectItem, e) => {
    console.log(
      '  onClickonClick  ：',
      selectItem,
      e,
      props,
      selectItem.equipment_data_id ? '数据' : '无数据',
    );
    let d_id;
    if (selectItem.equipment_data_id) {
      console.log(' 111 ： '); //
      d_id = selectItem.id;
    }
    if (
      selectItem.children.length > 0 &&
      selectItem.children[0]?.equipment_data_id
    ) {
      console.log(' 222 ： '); //
      d_id = selectItem.children[0].id;
    }

    if (
      selectItem.children.length > 0 &&
      selectItem.children[0].children.length > 0 &&
      selectItem.children[0].children.length > 0 &&
      selectItem.children[0].children[0].equipment_data_id
    ) {
      console.log(' 333 ： '); //
      d_id = selectItem.children[0].children[0].id;
    }
    console.log(' d_id ： ', d_id); //
    props.getAssetDetailAsync({
      selectItem,
      d_id,
      subAssetList: selectItem.children,
    });
    props.setActiveKey(null);
  };

  const loop = (data, props) => {
    // console.log('  treeData loop ： ', data); //
    const { searchValue } = props;

    return data.map((item, i) => {
      const index = item.title.indexOf(searchValue);
      const beforeStr = item.title.substr(0, index);
      const afterStr = item.title.substr(index + searchValue.length);
      // console.log(' index, beforeStr, afterStr ： ', index, beforeStr, afterStr, item )//
      const titleText =
        index > -1 ? (
          <span className={`treeNode`}>
            {beforeStr}
            <span className="site-tree-search-value">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          // <span className={`treeNode`}>{item.title}</span>
          <span className={`treeNode`}>
            {item.title} - {item.equipment_data_id} - {item.key}
          </span>
        );

      const title = (
        <div className={`treeRow`} onClick={e => onClick(item, e)}>
          {titleText}
        </div>
      );

      // console.log(' treeData  item ： ', item); //
      if (item.children) {
        return { title, key: item.key, children: loop(item.children, props) };
      }
      return {
        title,
        key: item.key,
      };
    });
  };

  const expandedKeys = [];
  recursiveKeys(treeData, expandedKeys);
  // console.log('  expandedKeys ：', expandedKeys); //

  const treeNodes = (
    <>
      {/* <DirectoryTree */}
      <Tree
        // expandedKeys={['0-0-0', '0-0-1']}
        expandedKeys={[]}
        autoExpandParent={true}
        showLine={true}
        treeData={loop(treeData, {
          ...props,
          searchValue,
        })}
        className={`assetTree`}
      />
    </>
  );

  return <div className={`assetTree`}>{treeNodes}</div>;
};

export default AssetTree;
