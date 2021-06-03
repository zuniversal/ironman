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
const { DirectoryTree } = Tree;

const SaveBtn = props => {
  const [status, setStatus] = useState(false);
  return (
    <div className={`dfc`}>
      {props.action === 'detail' ? (
        <Button
          type="primary"
          onClick={() =>
            props.changeAction({
              action: 'edit',
            })
          }
          className={`m-l-10`}
        >
          编辑
        </Button>
      ) : (
        <Button type="primary" onClick={props.onSave} className={`m-l-10`}>
          保存
        </Button>
      )}
    </div>
  );
};

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
            action: 'add',
          })
        }
        className={`m-l-10`}
      >
        新增
      </Button>
    </div>
  );
};

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

const addTreeAttr = ({ treeData, val, attr, item = {}, i }) => {
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
  return copyData;
};

const editTreeAttr = ({ treeData, val, attr, item = {}, i }) => {
  console.log(' editTreeAttr   e, item, i,   ： ', treeData, val, item, i);
  const { indexes = [] } = item;
  console.log(' indexes ： ', indexes); //
  const [index0, index1, index2] = indexes;
  const copyData = [...treeData];
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
      copyData[i][attr] = val;
      break;
  }
  return copyData;
};

const AssetTree = props => {
  const [form] = Form.useForm();

  const [searchValue, setSearchValue] = useState('');
  // const [ treeData, setTreeData ] = useState(recursiveHandle(treeDatas))
  // const [ treeData, setTreeData ] = useState(treeDatas)
  const { treeData } = props; //

  console.log(' AssetTree ： ', props, treeData); //

  const onInputChange = (e, item, i) => {
    console.log(' onInputChange   e, item, i,   ： ', e, item, i);
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
      action: item.isEdit ? '' : 'detail',
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
    // props.addTreeNode({ treeDatas, selectItem: item, form, action: 'add' });
    props.addTreeNode({ treeDatas, selectItem: item, form });
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
    // props.editTreeNode({ treeDatas, selectItem: item, action: 'detail' });
    props.editTreeNode({ treeDatas, selectItem: item, action: '' });
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
    // })
    // return
    selectItem.equipment_data_id
      ? props.getItemAsync({
          action: 'detail',
          selectItem,
          d_id: selectItem.id,
          form,
        })
      : props.editItems({
          // action: 'add',
          selectItem,
          form,
        });
  };
  const onSelect = (selectItem, e) => {
    console.log('  onSelect  ：', e, selectItem);
    props.editItems({
      action: 'editItems',
      // item,
      selectItem,
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
                props,
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
              // if (Object.keys(props.itemDetail).length) {
              if (item.isNew) {
                // props.saveTreeNodeAsync({
                //   ...props.searchInfo,
                //   pid: props.selectItem.id, // 新增发父级的id
                //   // pid: 0,
                //   name: item.title,
                // });
                props.addItemAsync({
                  action: 'saveTreeNodeAsync',
                  ...props.searchInfo,
                  pid: props.selectItem.id || 0,
                  name: item.title,
                });
                return;
              }

              if (props.selectItem.id) {
                const {
                  modular,
                  production_date,
                  operation_date,
                  ...rest
                } = props.itemDetail;
                props.editItemAsync({
                  ...props.searchInfo,
                  pid: props.selectItem.pid,
                  name: item.title,
                  data: Object.keys(props.itemDetail).length
                    ? {
                        ...rest,
                        production_date: production_date
                          ? production_date.format('YYYY-MM-DD')
                          : null,
                        operation_date: operation_date
                          ? operation_date.format('YYYY-MM-DD')
                          : null,
                      }
                    : undefined,
                  // d_id: item.id,
                  d_id: props.selectItem.id,
                });
                return;
              }
              // }
            }}
          />
        </Tooltip>
      ) : (
        <Tooltip title="编辑资产结构">
          <EditOutlined
            onClick={() => {
              editTreeNode(item, i);
              // onClick(item)
            }}
          />
          {/* <EditOutlined onClick={() => onClick(item)} /> */}
        </Tooltip>
      )}
      {/* <EditOutlined
        onClick={() =>
          props.editItems({
            action: 'editItems',
            item,
          })
        }
      />
      <EditOutlined
        onClick={() =>
          props.editItems({
            action: 'editItems',
            item,
          })
        }
      /> */}

      {/* 如果是资产目录 即 没有资产表单内容的行可以新增子节点 */}
      {!item.isNew && item.indexes.length < 3 && !item.equipment_data_id && (
        <Tooltip title="新增资产结构">
          <PlusCircleOutlined
            onClick={e => {
              console.log(' preventDefault item, i ： ', item, i, e); //
              e.preventDefault();
              // const treeDatas = [...treeData];
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
          <span className={`treeNode`} onClick={e => onClick(item, e)}>
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
          {item.isNew || item.isEdit ? (
            inputCom
          ) : (
            <span>
              {!item.equipment_data_id && <FolderOpenOutlined />}
              {titleText}
            </span>
          )}
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
  console.log('  expandedKeys ：', expandedKeys); //

  const treeNodes = (
    <>
      <Input
        onChange={onChange}
        className={`searchInput`}
        suffix={<SearchOutlined />}
      />
      {/* <DirectoryTree */}
      <Tree
        // expandedKeys={['0-0-0', '0-0-1']}
        defaultExpandedKeys={expandedKeys}
        defaultExpandAll
        autoExpandParent
        // showLine
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
        real_capacity: props.itemDetail.real_capacity ?? null,
      };
      console.log(' params ： ', params); //
      // if (props.action === 'edit') {
      //   props.editItemAsync({
      //     ...props.searchInfo,
      //     pid: props.selectItem.pid,
      //     name: props.selectItem.title || params.name,
      //     data: {
      //       ...params,
      //       real_capacity: null,
      //     },
      //     d_id: props.itemDetail.id,
      //     d_id: props.selectItem.id,
      //   });
      //   return;
      // }

      // props.addItemAsync({
      //   ...props.searchInfo,
      //   pid: props.selectItem.pid,
      //   name: props.selectItem.title || params.name,
      //   data: {
      //     ...params,
      //     real_capacity: null,
      //   },
      // });
      props.editItemAsync({
        ...props.searchInfo,
        pid: props.selectItem.pid,
        name: props.selectItem.title || params.name,
        data: {
          ...params,
          real_capacity: null,
        },
        d_id: props.selectItem.id,
      });
    } catch (error) {
      console.log(' error ： ', error);
    }
  };

  return (
    <div className={`assetTree`}>
      <Row>
        <Col span={6} className={`treeStruct`}>
          {treeNodes}
        </Col>
        {/* <Col span={16} className={`dfc`}> */}
        <Col span={18} className={``}>
          {treeData.length > 0 && (
            <div className={`fje addAssetWrapper`}>
              <Button
                type="primary"
                // onClick={() => {
                //   console.log(' 111111111 ： ', treeData   )//
                //   addTreeNode(treeData[0], 0)
                // }}
                onClick={props.addTreeStruct}
                className={`m-l-10`}
              >
                新增一级资产结构
              </Button>
              {/* <EmptyAsset
              editItems={props.editItems}
              addTreeNode={addTreeNode}
              selectItem={props.selectItem}
              changeAction={props.changeAction}
              form={form}
            ></EmptyAsset>  */}
            </div>
          )}
          {props.action ? (
            // {props.formTypes ? (
            // {Object.keys(props.itemDetail).length ? (
            <>
              {/* {props.selectItem?.children.length === 0 ? <AssetsForm */}
              {props.selectItem.id ? (
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
                  init={num2Str(props.itemDetail, ['type'])}
                  propsForm={form}
                  action={props.action}
                  changeWidth
                  // action={'detail'}
                  // key={props.itemDetail.id}
                  // key={props.itemDetail.id || props.formTypes}
                  // renderFormBtn={saveBtn}
                  // key={props.itemDetail}
                >
                  <SaveBtn
                    itemDetail={props.itemDetail}
                    onSave={onSave}
                    action={props.action}
                    changeAction={props.changeAction}
                  ></SaveBtn>
                </AssetsForm>
              ) : null}
            </>
          ) : null}
          {!props.action &&
          !Object.keys(props.itemDetail)?.length &&
          props.selectItem?.children?.length === 0 ? (
            <EmptyAsset
              changeAction={props.changeAction}
              addTreeNode={addTreeNode}
              selectItem={props.selectItem}
              form={form}
            ></EmptyAsset>
          ) : Object.keys(props.itemDetail).length ? (
            <div className={`assetTitle`}>{/* 资产详情 */}</div>
          ) : null}
        </Col>
      </Row>
    </div>
  );
};

export default AssetTree;
