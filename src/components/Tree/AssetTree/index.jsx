import React, { useState, useMemo } from 'react';
import './style.less';
import AssetsForm from '@/components/Form/AssetsForm';
import {
  EditOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
  SearchOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { Tree, Input, Row, Col, Button, Tooltip, Form } from 'antd';
import { recursiveResetAssets } from '@/models/assets'; //

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
          //   formTypes: 'addConfig',
          //   form: props.form,
          // })
          props.addTreeNode(props.selectItem)
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
const recursiveHandle2 = (data = [], params = {}) => {
  console.log('treeData  recursiveHandle   ,   ： ', data, params);
  const { indexes, parent_id } = params;
  // return data.map((v, i) => ({...v,}));
  return data.map((v, i) => {
    const item = {
      ...v,
      parent_id,
      isEdit: false,
      isNew: false,
      indexes: [...(indexes ?? []), i],
    };
    // if (v.children) {
    //   item.children = recursiveHandle(v.children, [...(indexes ?? []), i])
    // }
    item.children = item.children
      ? recursiveHandle(v.children, {
          indexes: [...(indexes ?? []), i],
          parent_id: v.key,
        })
      : [];
    return item;
  });
};

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
// const treeDatas = recursiveHandle(datas);

const addTreeAttr = ({ treeData, val, attr, item, i }) => {
  console.log(' addTreeAttr   e, item, i,   ： ', treeData, val, item, i);
  const { indexes = [] } = item;
  const [index0, index1, index2] = indexes;
  const copyData = [...treeData];
  console.log('  对吗  indexes.length ', indexes);
  const newTreeNode = {
    // indexes: [...indexes, children.length],
    isNew: true,
    isEdit: false,
    title: '资产名',
    children: [],
  };
  switch (indexes.length) {
    case 1:
      copyData[index0].children = [
        ...copyData[index0].children,
        {
          ...newTreeNode,
          pid: copyData[index0].pid,
          key: `${item.key}-${copyData[index0].children.length}`,
          indexes: [...indexes, copyData[index0].children.length],
        },
      ];
      break;
    case 2:
      console.log(
        ' copyData[index0].children[index1].children  ： ',
        copyData[index0].children[index1].children,
      ); //
      copyData[index0].children[index1].children = [
        ...copyData[index0].children[index1].children,
        {
          ...newTreeNode,
          pid: copyData[index0].children[index1].pid,
          key: `${item.key}-${copyData[index0].children[index1].children.length}`,
          indexes: [
            ...indexes,
            copyData[index0].children[index1].children.length,
          ],
        },
      ];
      break;
    case 3:
      copyData[index0].children[index1].children[index2].children = [
        ...copyData[index0].children[index1].children[index2].children,
        {
          ...newTreeNode,
          pid: copyData[index0].children[index1].children[index2].pid,
          key: `${item.key}-${copyData[index0].children[index1].children[index2].children.length}`,
          indexes: [
            ...indexes,
            copyData[index0].children[index1].children[index2].children.length,
          ],
        },
      ];
      break;
    default:
      break;
  }
  console.log(' copyData ： ', copyData); //
  return copyData;
};
const editTreeAttr = ({ treeData, val, attr, item, i }) => {
  console.log(' editTreeAttr   e, item, i,   ： ', treeData, val, item, i);
  const { indexes } = item;
  const [index0, index1, index2] = indexes;
  const copyData = [...treeData];
  console.log('  对吗  indexes.length ', indexes);
  switch (indexes.length) {
    case 1:
      copyData[index0][attr] = val;
      break;
    case 2:
      copyData[index0].children[index1][attr] = val;
      break;
    case 3:
      copyData[index0].children[index1].children[index2][attr] = val;
      break;
    default:
      break;
  }
  console.log(' copyData ： ', copyData); //
  return copyData;
};

const AssetTree = props => {
  const [form] = Form.useForm();

  const [searchValue, setSearchValue] = useState('');
  // const [ treeData, setTreeData ] = useState(recursiveHandle(treeDatas))
  // const [ treeData, setTreeData ] = useState(treeDatas)
  const { treeData } = props; //

  console.log(' AssetTree ： ', props); //
  console.log(' treeData ： ', treeData); //

  const onPressEnter = (e, o) => {
    console.log(' onPressEnter   e, o,   ： ', e, o);
  };
  const onInputChange = (e, item, i) => {
    console.log(' onInputChange   e, item, i,   ： ', e, item, i);
    console.log(' e.target.value ： ', e.target.value); //
    const treeDatas = editTreeAttr({
      treeData,
      val: e.target.value,
      attr: 'title',
      item,
      i,
    });
    console.log(' treeDatas ： ', treeDatas); //
    // setTreeData(treeDatas)
    props.editTreeNode({
      treeDatas,
      selectItem: props.selectItem,
      action: 'edit',
    });
  };

  const addTreeNode = (item, i) => {
    console.log(' addTreeNode   item, i,   ： ', item, i);
    const treeDatas = addTreeAttr({
      treeData,
      val: true,
      attr: 'isEdit',
      item,
      i,
    });
    console.log(' treeDatas ： ', treeDatas); //
    // setTreeData(treeDatas)
    props.addTreeNode({ treeDatas, selectItem: item, form, action: 'add' });
  };
  const editTreeNode = (item, i) => {
    console.log(' editTreeNode   item, i,   ： ', item, i);
    const treeDatas = editTreeAttr({
      treeData,
      val: true,
      attr: 'isEdit',
      item,
      i,
    });
    console.log(' treeDatas ： ', treeDatas); //
    // setTreeData(treeDatas)
    props.editTreeNode({ treeDatas, selectItem: item, action: 'edit' });
  };

  // const saveTreeData = () => {
  //   console.log(' saveTreeData   ,   ： ', treeData,  )
  //   setTreeData(recursiveHandle(treeData))
  // }

  const onChange = e => {
    console.log('  onChange  ：', e, searchValue);
    setSearchValue(e.target.value);
  };

  const onClick = (selectItem, e) => {
    console.log(
      '  onClickonClick  ：',
      selectItem,
      e,
      selectItem.equipment_data_id ? '数据' : '无数据',
    );
    // props.editItems({
    //   action: 'add',
    //   selectItem,
    //   formTypes: 'addConfig',
    // })
    // return
    selectItem.equipment_data_id
      ? props.getItemAsync({
          action: 'edit',
          selectItem,
          formTypes: 'addConfig',
          d_id: selectItem.id,
          form,
        })
      : props.editItems({
          action: 'add',
          selectItem,
          formTypes: 'addConfig',
          form,
        });
  };
  const onSelect = (selectItem, e) => {
    console.log('  onSelect  ：', e, selectItem);
    props.editItems({
      action: 'editItems',
      // item,
      selectItem,
      formTypes: 'addConfig',
    });
    // setSearchValue(e.target.value)
    // props.onSelectTreeNode()
  };

  const actionCom = ({ item, i, props }) => (
    <>
      {/* <EditOutlined
        onClick={() => onClick(item, )
          // props.editItems({
          //   action: 'editItems',
          //   item,
          //   formTypes: 'config',
          // })
        }
      /> */}
      {item.isEdit || item.isNew ? (
        <Tooltip title="保存资产结构">
          <FileOutlined
            onClick={() => {
              console.log(' 保存资产结构 ： '); //
              console.log(
                ' 保存资产结构 ： ',
                recursiveHandle(treeData),
                props,
                item,
                props.selectItem,
              ); //
              // props.saveTreeNodeAsync({
              //   action: 'saveTreeNodeAsync',
              //   // treeDatas: recursiveHandle(treeData),
              //   // item,
              //   // customer_id: props.searchInfo.customer_id,
              //   ...props.searchInfo,
              //   pid: item.pid,
              //   name: item.title,
              // })
              // if (props.selectItem.isEdit) {
              //   props.saveTreeNodeAsync({
              //     ...props.searchInfo,
              //     pid: props.selectItem.id,
              //     name: item.title,
              //   })
              // } else {
              props.saveTreeNodeAsync({
                ...props.searchInfo,
                pid: props.selectItem.id,
                name: item.title,
              });
              // }
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="编辑资产结构">
          {/* <EditOutlined onClick={() => editTreeNode(item, i)} /> */}
          <EditOutlined onClick={() => onClick(item)} />
        </Tooltip>
      )}
      {/* <EditOutlined
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
            formTypes: null,
          })
        }
      /> */}
      {!item.isNew && item.indexes.length < 3 && (
        <Tooltip title="新增资产结构">
          <PlusCircleOutlined
            onClick={e => {
              console.log(' preventDefault item, i ： ', item, i, e); //
              e.preventDefault();
              const treeDatas = [...treeData];
              addTreeNode(item, i);
              return;
              setTreeData([...treeData, { title: '0-3', key: '0-3' }]);
              return;
              props.showFormModal({
                action: 'addItem',
                item,
              });
            }}
          />
        </Tooltip>
      )}
      {!item.isNew && (
        <Tooltip title="删除资产结构">
          <MinusCircleOutlined
            onClick={() =>
              props.onRemove({
                action: 'onRemove',
                record: {
                  id: item.id,
                },
              })
            }
          />
        </Tooltip>
      )}
    </>
  );

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
          <span className={`treeNode`}>{item.title}</span>
        );
      const inputCom = (
        <Input
          className={`assetNameInput`}
          value={item.title}
          onChange={e => props.onInputChange(e, item, i)}
        />
      );

      const title = (
        <div
          className={`treeRow`}
          // onClick={e => onClick(item, e)}
        >
          {item.isNew && '新增：'}
          {item.isEdit && '编辑：'}
          {item.isNew || item.isEdit ? inputCom : titleText}
          {/* {item.isEdit ? inputCom : titleText} */}
          {actionCom({ item, i, props })}
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
      <Input
        onChange={onChange}
        className={`searchInput`}
        suffix={<SearchOutlined />}
      />
      <Tree
        // expandedKeys={['0-0-0', '0-0-1']}
        // expandedKeys={expandedKeys}
        autoExpandParent={true}
        treeData={loop(treeData, {
          ...props,
          onInputChange,
          searchValue,
        })}
        // onSelect={onSelect}
        className={`assetTree`}
      />
      {/* <div className={`dfc saveBtn`}>
        <Button
          type="primary"
          onClick={() => props.showFormModal({ action: 'add' })}
          // onClick={() => saveTreeData()}
        >
          保存
        </Button>
      </div> */}
    </>
  );

  const saveBtns = forms => {
    console.log(' saveBtn ： ', forms); //
    return (
      <div className={`dfc`}>
        <Button
          type="primary"
          onClick={() => {
            console.log(' formform ： ', forms, form); //
          }}
          className={`m-l-10`}
        >
          保存
        </Button>
      </div>
    );
  };

  const onSave = async params => {
    console.log(' onSave ： ', params, props, form);
    // const { form,  } = params;
    try {
      const res = await form.validateFields();
      console.log('  res await 结果  ：', res);
      const params = {
        ...res,
        production_date: res.production_date.format('YYYY-MM-DD'),
        operation_date: res.operation_date.format('YYYY-MM-DD'),
      };
      console.log(' params ： ', params); //
      if (props.action === 'edit') {
        props.editItemAsync({
          d_id: props.itemDetail.id,
          ...params,
        });
        return;
      }
      // if (props.action === 'add') {
      // }
      props.addItemAsync({
        ...props.searchInfo,
        pid: props.selectItem.id,
        name: props.selectItem.title || params.name,
        data: {
          ...params,
        },
      });
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  const saveBtn = (
    <div className={`dfc`}>
      <Button type="primary" onClick={onSave} className={`m-l-10`}>
        保存
      </Button>
    </div>
  );

  return (
    <div className={`assetTree`}>
      <Row>
        <Col span={8} className={`treeStruct`}>
          {treeNodes}
        </Col>
        {/* <Col span={16} className={`dfc`}> */}
        <Col span={16} className={``}>
          {props.action ? (
            // {props.formTypes ? (
            // {Object.keys(props.itemDetail).length ? (
            <>
              {!Object.keys(props.itemDetail).length && (
                <EmptyAsset
                  editItems={props.editItems}
                  addTreeNode={addTreeNode}
                  selectItem={props.selectItem}
                  form={form}
                ></EmptyAsset>
              )}
              <AssetsForm
                flexRow={2}
                init={{
                  ...props.itemDetail,
                  type: '1201',
                  name: 'name',
                  manufacturer: 'manufacturer',
                  model: 'model',
                  production_code: 'production_code',
                  voltage: 1,
                  current: 1,
                  production_date: '2020-12-12',
                  operation_date: '2020-12-12',
                  service_life: 1,
                  capacity: 'capacity',
                  // real_capacity: 'real_capacity',
                }}
                init={{
                  ...props.itemDetail,
                }}
                propsForm={form}
                action={props.action}
                formTypes={props.formTypes}
                // key={props.itemDetail.id}
                // key={props.itemDetail.id || props.formTypes}
                // renderFormBtn={saveBtn}
                // key={props.itemDetail}
              >
                {saveBtn}
              </AssetsForm>
            </>
          ) : (
            <EmptyAsset
              editItems={props.editItems}
              addTreeNode={addTreeNode}
              selectItem={props.selectItem}
              form={form}
            ></EmptyAsset>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default AssetTree;
