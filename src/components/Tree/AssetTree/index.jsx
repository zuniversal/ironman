import React, { useState } from 'react';
import './style.less';
import AssetsForm from '@/components/Form/AssetsForm';
import {
  EditOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Tree, Input, Row, Col, Button, Tooltip } from 'antd';

const treeData = [
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
  const [searchValue, setSearchValue] = useState('');

  const edit = item => {
    console.log(' edit   ,   ： ', item, props);
    props.showFormModal({
      action: 'add',
    });
  };

  const onPressEnter = (e, o) => {
    console.log(' onPressEnter   e, o,   ： ', e, o);
  };

  const actionCom = (
    <>
      <EditOutlined
        onClick={() =>
          props.editItems({
            action: 'editItems',
            item,
            formTypes: 'addConfig',
          })
        }
      />
      <EditOutlined
        onClick={() =>
          props.editItems({
            action: 'editItems',
            item,
            formTypes: 'config',
          })
        }
      />
      <EditOutlined
        onClick={() =>
          props.editItems({
            action: 'editItems',
            item,
            formTypes: null,
          })
        }
      />
      <PlusCircleOutlined
        onClick={() =>
          props.showFormModal({
            action: 'addItem',
            item,
          })
        }
      />
      <MinusCircleOutlined
        onClick={() =>
          props.handleAction({
            action: 'handleWeak',
          })
        }
      />
    </>
  );

  const loop = data =>
    data.map(item => {
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
          <span className={`treeNode`}>{item.title}</span>
        );
      const inputCom = <Input value={item.title} onPressEnter={onPressEnter} />;
      // <Tooltip title="回车保存">

      // </Tooltip>

      const title = (
        <div className={`treeRow`}>
          {titleText}
          {actionCom}
        </div>
      );

      if (item.children) {
        return { title, key: item.key, children: loop(item.children) };
      }

      return {
        title: (
          <>
            {inputCom}
            {actionCom}
          </>
        ),
        key: item.key,
      };
    });

  const onChange = e => {
    console.log('  onChange  ：', e, searchValue);
    setSearchValue(e.target.value);
  };

  const onSelect = (e, o) => {
    console.log('  onSelect  ：', e, o, searchValue);
    // setSearchValue(e.target.value)
  };

  const empty = (
    <>
      <div className={`btnWrapper clearFix`}>
        <div className={`f-r`}>
          <Button
            type="primary"
            onClick={() => props.showFormModal({ action: 'add' })}
          >
            新增
          </Button>
        </div>
      </div>
      <div className={`dfc`}>该处资产现在为空，请添加资产</div>
    </>
  );

  return (
    <div className={`assetTree`}>
      <Row>
        <Col span={8}>
          <Input
            onChange={onChange}
            className={`searchInput`}
            suffix={<SearchOutlined />}
          />
          <Tree
            expandedKeys={['0-0-0', '0-0-1']}
            autoExpandParent={true}
            treeData={loop(treeData)}
            onSelect={onSelect}
          />
        </Col>
        <Col span={16} className={`dfc`}>
          {props.formTypes ? (
            <AssetsForm
              flexRow={2}
              formTypes={props.formTypes}
              key={props.formTypes}
            >
              <div className={`dfc`}>
                <Button
                  type="primary"
                  onClick={() => props.showFormModal({ action: 'add' })}
                  className={`m-l-10`}
                >
                  保存
                </Button>
              </div>
            </AssetsForm>
          ) : (
            <>
              该处资产现在为空，请添加资产
              <Button
                type="primary"
                onClick={() => props.showFormModal({ action: 'add' })}
                className={`m-l-10`}
              >
                新增
              </Button>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

AssetTree.defaultProps = {};

export default AssetTree;
