import React from 'react';
import './style.less';
import { Form, Input } from 'antd';

// 通用的操作列组件
const formatData = (record, rowKey) => {
  const data = {...record, d_id: record[rowKey] ? record[rowKey] : {},} 
  return data 
}

const ActionCol = props => {
  const {
    edit,
    remove,
    extra,
    onRemove,
    showQRCode,
    noDefault,
    tableProps,
    text,
    record,
    index,
  } = props;
  // console.log(' ActionCol props ： ', props);
  return (
    <span>
      {!props.noDefault && (
        <>
          <a
            onClick={() => {
              console.log(' record ： ', record, edit); //
              edit({ action: 'edit', ...record });
            }}
          >
            编辑
          </a>
          {/* <a onClick={() => remove({action: 'remove', record})}>删除</a> */}
          <a onClick={() => remove({ record: formatData(record, props.rowKey, ), })}>删除</a>
        </>
      )}
      {!props.noDefault && props.isQRCode && (
        <a onClick={() => showQRCode({ action: 'QRCode', record })}>
          生成二维码
        </a>
      )}
      {/* {extra} */}
      {extra(text, record, index, props)}
    </span>
  );
}; //

export default ActionCol;
