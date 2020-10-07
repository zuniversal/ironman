import React from 'react';
import './style.less';
import { Form, Input } from 'antd';

// 通用的操作列组件
const ActionCol = props => {
  const {
    edit,
    remove,
    extra,
    record,
    onRemove,
    showQRCode,
    noDefault,
    tableProps,
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
          <a onClick={() => remove({ record })}>删除</a>
        </>
      )}
      {!props.noDefault && props.isQRCode && (
        <a onClick={() => showQRCode({ action: 'QRCode', record })}>
          生成二维码
        </a>
      )}
      {/* {extra} */}
      {extra(props)}
    </span>
  );
}; //

export default ActionCol;
