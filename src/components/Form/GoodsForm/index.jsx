import React from 'react';
import './style.less';
import SmartForm from '@/common/SmartForm'; //
import { regoins } from '@/configs'; //
import { formatConfig } from '@/utils'; //

export const config = [
  {
    itemProps: {
      label: '物料编号',
      name: 'code',
    },
  },
  {
    itemProps: {
      label: '物料名称',
      name: 'name',
    },
  },
  {
    itemProps: {
      label: '单价(元)',
      name: 'price',
    },
  },
];

const GoodsForm = props => {
  console.log(' GoodsForm ： ', props); //
  const { formBtn, ...rest } = props; //

  return (
    <div className={' GoodsForm '}>
      <SmartForm config={config} {...rest}></SmartForm>

      {formBtn}
    </div>
  );
};

GoodsForm.defaultProps = {};

export default GoodsForm;
