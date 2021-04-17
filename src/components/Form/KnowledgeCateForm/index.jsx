import React from 'react';
import './style.less';

import SmartForm from '@/common/SmartForm';
import WeakDetailImg from '@/components/Widgets/WeakDetailImg';

const choiceRadios = [
  { label: '是', value: true, key: 'yes' },
  { label: '否', value: false, key: 'no' },
];

const KnowledgeCateForm = props => {
  console.log(' KnowledgeCateForm ： ', props);

  const config = [
    {
      itemProps: {
        label: '名称',
        name: 'name',
      },
    },
    {
      formType: 'Radio',
      radioData: choiceRadios,
      itemProps: {
        label: '推荐到首页',
        name: 'is_hot',
      },
    },
  ];

  return (
    <div className={' KnowledgeCateForm '}>
      <SmartForm config={config} {...props}></SmartForm>

      {/* {formBtn} */}
    </div>
  );
};

KnowledgeCateForm.defaultProps = {};

export default KnowledgeCateForm;
