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
import { num2Str, recursiveKeys } from '@/utils';

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
        autoExpandParent
        showLine
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
