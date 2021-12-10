import React, {
  Component,
  PureComponent,
  lazy,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import './style.less';
import { Input, Button, Select, InputNumber } from 'antd';

import SmartTable from '@/common/SmartTable';
import { tips, renderSelectOp } from '@/utils';
import debounce from 'lodash/debounce';
import { INPUT_TXT, SELECT_TXT } from '@/constants';

export const InputCom = props => {
  const {
    text,
    record,
    config,
    keys,
    index,
    // formType = 'Input',
  } = props;
  const {
    formType = 'Input',
    itemProps = {},
    comProps = {},
    selectData,
    ph,
    placeholder,
  } = config;

  const realComProps = {
    ...comProps,
    defaultValue: text,
    placeholder: itemProps?.label ? INPUT_TXT + itemProps?.label : placeholder,
    onChange: e =>
      props.modifyTableItem({
        action: 'edit',
        value: e.target.value,
        // keys: 'outline_number',
        keys: keys,
        text,
        ...record,
        index,
      }),
  };

  return <Input {...realComProps} />;
};

export const SelectCom = props => {
  const {
    text,
    record,
    config,
    // formType = 'Input',
  } = props;
  const {
    formType = 'Input',
    itemProps = {},
    comProps = {},
    selectData,
    ph,
    placeholder,
  } = config;

  const selectProps = {
    allowClear: true,
    ...comProps,
    filterOption: true,
    showSearch: true,
    optionFilterProp: 'children',
    defaultValue: text,
    placeholder: itemProps?.label ? SELECT_TXT + itemProps?.label : placeholder,
    onChange: value =>
      props.modifyTableItem({
        action: 'edit',
        value: value,
        // keys: 'outline_number',
        ...props,
        ...record,
      }),
  };

  if (formType === 'Search') {
    // selectProps.optionFilterProp = 'children';
    if (config.selectSearch) {
      selectProps.onSearch = debounce(config.selectSearch, 1500);
    }
  }

  return <Select {...selectProps}>{renderSelectOp(selectData)}</Select>;
};

SelectCom.defaultProps = {
  ph: '关键字',
  placeholder: '',
};

SelectCom.propTypes = {
  ph: PropTypes.string,
  placeholder: PropTypes.string,
};

export const getWidget = props => {
  // console.log(' ReduxTable  getWidget   props,   ： ', props);
  const {
    // comProps,
    label,
    LabelCom,
    CustomCom,
    text,
    plainText,
    keys,
    record,
    index,
  } = props;

  const { formType = 'Input', itemProps = {}, comProps = {} } = props.config;

  const formItemMap = {
    rowText: label,
    Label: LabelCom,
    CustomCom: CustomCom,
    plainText: (
      <span className={`plainText`} {...comProps}>
        {plainText}
      </span>
    ),
    // Input: (
    //   <Input
    //     defaultValue={text}
    //     onChange={e =>
    //       props.modifyTableItem({
    //         action: 'edit',
    //         value: e.target.value,
    //         // keys: 'outline_number',
    //         keys: keys,
    //         text,
    //         ...record,
    //         index,
    //       })
    //     }
    //   />
    // ),
    Input: <InputCom {...props}></InputCom>,
    InputNumber: <InputNumber allowClear maxLength={32} {...comProps} />,
    // Select: selectCom(props),
    // Search: selectCom(props),
    Select: <SelectCom {...props}></SelectCom>,
    Search: <SelectCom {...props}></SelectCom>,
  };

  const formItemCom = formItemMap[formType];
  return formItemCom;
};

export const TableInput = props => {
  const { text, record, index, keys } = props;
  let txt = text;
  if (props.config.dataMap && !props.record.isEdit) {
    if (Array.isArray(text)) {
      console.log(' 映射 ： ', text, props); //
      txt = text.map(v => props.config.dataMap[v]).join(' , ');
    } else {
      txt = props.config.dataMap[text];
    }
  }
  // console.log(' TableInput mapText, dataMap ：', props, txt);

  return props.record.isEdit && !props.config.forShow
    ? getWidget(props)
    : txt ?? '';
};

// export const TableInput = props => {
//   const { text, record, index, keys, config } = props;
//   // console.log(
//   //   ' %c TableInput 组件 ： ',
//   //   `color: #333; font-weight: bold`,
//   //   props,
//   // );
//   // return props.record.isEdit && config.noEdit ? (
//   return props.record.isEdit && keys !== 'id' ? (
//     <Input
//       allowClear
//       defaultValue={text}
//       onChange={e =>
//         props.modifyTableItem({
//           action: 'edit',
//           value: e.target.value,
//           keys: keys,
//           text,
//           ...record,
//           index,
//         })
//       }
//     ></Input>
//   ) : (
//     text
//   );
// };

const ReduxTable = props => {
  const { edit, remove, config, isDisabledAll } = props;
  console.log(
    ' %c ReduxTable 组件 ： ',
    `color: #333; font-weight: bold`,
    props,
  );

  const columns = config.map(v => ({
    title: v.label,
    dataIndex: v.name,
    render: (text, record, index, config) => (
      <div className={`tableItem`}>
        <TableInput
          text={text}
          record={record}
          index={index}
          {...props}
          keys={v.name}
          // config={config}
          config={v}
        ></TableInput>
      </div>
    ),
  }));

  if (!isDisabledAll) {
    columns.push({
      title: '操作',
      dataIndex: 'action',
      className: 'actionCol',
      notTooltip: true,
      render: (text, record, index, config) => (
        <>
          {!props.hideSaveEdit && (
            <a
              onClick={() => {
                console.log(' record ：, ', props, config, record, edit);
                if (isDisabledAll) {
                  return;
                }

                // const fn = record.id && record.isEdit
                let fn = '';
                if (!record.id) {
                  fn = 'addTableItemAsync';
                  //  fn = record.isEdit
                  //  ? 'editTableItemAsync'
                  //  :'addTableItemAsync'
                } else {
                  fn = record.isEdit ? 'editTableItemAsync' : 'modifyTableItem';
                }

                // const fn = 'editTableItemAsync';
                props[fn]({
                  ...record,
                  index,
                  d_id: record.id,
                  action: 'edit',
                  // powerstation: props.init.id,
                });
              }}
            >
              {record.isEdit ? '保存' : '编辑'}
            </a>
          )}
          <a
            onClick={() => {
              console.log(' remove record ： ', props, record, index);
              if (isDisabledAll) {
                return;
              }
              const removeFn = record.id
                ? 'removeTableItemAsync'
                : 'modifyTableItem';
              // const removeFn = 'removeTableItemAsync';
              props[removeFn]({
                ...record,
                index,
                id: `${record.id}`,
                // action: record.id ? 'remove' : 'localRemove',
                action: 'remove',
              });
            }}
          >
            删除
          </a>
        </>
      ),
    });
  }

  return (
    <SmartTable
      columns={columns}
      noActionCol
      {...props}
      // dataSource={dataSource}
      rowKey={'key'}
      className={'reduxTable modalTable'}
      pagination={false}
      rowSelection={null}
      title={() => {
        return (
          <div className={`fje`}>
            {props.titleCom}
            {!isDisabledAll && !props.hideAdd && (
              <Button
                type="primary"
                onClick={() => {
                  if (isDisabledAll) {
                    return;
                  }
                  if (props.noLimitAdd) {
                    props.modifyTableItem({ action: 'add' });
                    return;
                  }
                  if (props.dataSource.filter(v => v.isEdit).length < 1) {
                    props.modifyTableItem({ action: 'add' });
                  } else {
                    tips('请先保存上一条数据！', 2);
                  }
                }}
                className={'add'}
              >
                {props.addText}
              </Button>
            )}
          </div>
        );
      }}
    ></SmartTable>
  );
};

ReduxTable.defaultProps = {
  dataSource: [],
  noLimitAdd: false,
  hideAdd: false,
  hideSaveEdit: false,
  modifyTableItem: () => {},
  addText: '新增',
};

export default ReduxTable;
