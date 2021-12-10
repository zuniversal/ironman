import React from 'react';
import SmartForm from '@/common/SmartForm';
import WeakDetailImg from '@/components/Widgets/WeakDetailImg';

const choiceRadios = [
  { label: '是', value: true, key: 'yes' },
  { label: '否', value: false, key: 'no' },
];

const KnowledgeCateForm = props => {
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

  return <SmartForm config={config} {...props}></SmartForm>;
};

KnowledgeCateForm.defaultProps = {};

export default KnowledgeCateForm;
