import React from 'react';
import './style.less';
import SmartPdf from '@/common/SmartPdf';

const config = [
  {
    label: '名称',
    name: 'name',
  },
  {
    label: '电站',
    name: 'stationName',
  },
  {
    label: '客户',
    name: 'customerName',
  },
  {
    label: '登记日期',
    name: '',
  },
  {
    label: '状态',
    name: 'status',
  },
  {
    label: '巡检人',
    name: 'teamName',
  },
  {
    label: '巡检组长',
    name: 'teamheadman',
  },
  {
    label: '缺陷描述',
    name: 'content',
  },
  {
    label: '使用耗材',
    name: '',
  },
  {
    formType: 'Image',
    label: '图片',
    name: '',
  },
  {
    formType: 'TextArea',
    label: '备注',
    name: 'remark',
  },
];

const WeakFormPdf = props => <SmartPdf config={config} {...props}></SmartPdf>;

export default WeakFormPdf;
