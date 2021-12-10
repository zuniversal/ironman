import React from 'react';

import SmartForm from '@/common/SmartForm';
import WeakDetailImg from '@/components/Widgets/WeakDetailImg';
import UploadCom from '@/components/Widgets/UploadCom';
import { knowledgeTypeConfig } from '@/configs';

const choiceRadios = [
  { label: '是', value: true, key: 'yes' },
  { label: '否', value: false, key: 'no' },
];

const NewsKnowForm = props => {
  const config = [
    {
      itemProps: {
        label: '标题',
        name: 'title',
      },
    },
    {
      itemProps: {
        label: '摘要',
        name: 'abstract',
      },
    },
    {
      formType: 'TextArea',
      itemProps: {
        label: '政策内容',
        name: 'text',
      },
      comProps: {
        rows: 8,

        autoSize: {
          minRows: 8,
          maxRows: 10,
        },
      },
    },
    {
      formType: 'Search',
      selectData: knowledgeTypeConfig,
      itemProps: {
        label: '类型',
        name: 'knowledge_type',
      },
    },
    {
      formType: 'Search',
      selectSearch: props.getKnowledgeCateAsync,
      selectData: props.knowledgeCateList,
      itemProps: {
        label: '知识库类别',
        name: 'knowledge_warehouse_type',
      },
    },
    {
      formType: 'Radio',
      radioData: choiceRadios,
      itemProps: {
        label: '关键知识点',
        name: 'is_key_knowledge',
      },
    },
    // {
    //   noRule: true,
    //   itemProps: {
    //     label: '类型',
    //     name: 'cover_picture',
    //   },
    // },
    <UploadCom
      label={'上传封面'}
      key={'cover_picture'}
      action={'/api/v1/upload'}
      name={'cover_picture'}
      // extra={''}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
      }}
      init={props.init}
      formAction={props.action}
    ></UploadCom>,
  ];

  return <SmartForm config={config} {...props}></SmartForm>;
};

NewsKnowForm.defaultProps = {};

export default NewsKnowForm;
