import React from 'react';
import { Form, Input } from 'antd';
import { isDev } from '@/constants';

// 通用的操作列组件
const formatData = (record, rowKey) => {
  const data = { ...record, d_id: record[rowKey] ? record[rowKey] : {} };
  return data;
};

const ActionCol = props => {
  const {
    authInfo,
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

  const rowKey = props.uniqueKey ? props.uniqueKey : props.rowKey; //
  // console.log('  rowKey ：', props, rowKey, authInfo, authInfo.edit !== true, authInfo.edit == null )//

  return (
    <span>
      {!props.noDefault && (
        <>
          {!props.noEdit && (
            <a
              onClick={() => {
                // edit({ action: 'edit', ...record });
                console.log(' record ： ', props, record, edit);
                props.dataSource.length > 0
                  ? edit({
                      action: 'edit',
                      // ...record,
                      d_id: record[rowKey],
                    })
                  : props.showFormModal({
                      action: 'add',
                      ...record,
                    });
              }}
              // disabled={isDev ? false : authInfo.edit}
              disabled={
                isDev ? false : authInfo.edit !== true && authInfo.edit != null
              }
            >
              编辑
            </a>
          )}
          {/* <a onClick={() => remove({action: 'remove', record})}>删除</a> */}
          {!props.noRemove && (
            <a
              onClick={() => {
                console.log(' removeremove ： ', props);
                remove({ record: formatData(record, rowKey) });
              }}
              // disabled={isDev ? false : authInfo.delete}
              disabled={
                isDev
                  ? false
                  : authInfo.delete !== true && authInfo.delete != null
              }
            >
              删除
            </a>
          )}
        </>
      )}
      {/* {!props.noDefault && props.isQRCode && (
        <a onClick={() => showQRCode({ action: 'QRCode', record })}>
          生成二维码
        </a>
      )} */}
      {/* {extra} */}
      {extra(text, record, index, props)}
    </span>
  );
};

export default ActionCol;
