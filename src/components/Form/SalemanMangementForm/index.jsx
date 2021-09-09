import React, { useEffect } from 'react';
import SmartForm from '@/common/SmartForm';
import UploadCom from '@/components/Widgets/UploadCom';
import useHttp from '@/hooks/useHttp';
import { getList } from '@/services/clientList';
import { getList as getRoleList } from '@/services/role';
import { userStatusConfig } from '@/configs';

const genderRadios = [
  { label: '男', value: 1, key: '1' },
  { label: '女', value: 0, key: '0' },
];

const choiceRadios = [
  { label: '是', value: true, key: 'yes' },
  { label: '否', value: false, key: 'no' },
];

const SalemanMangementForm = props => {
  console.log(' SalemanMangementForm ： ', props); //
  const { data: roleList, req: getRoleListAsync } = useHttp(getRoleList, {
    // format: res => formatSelectList(res, 'manufacturer'),
  });

  const config = [
    {
      itemProps: {
        label: '姓名',
        name: 'username',
      },
    },
    {
      itemProps: {
        label: '工号',
        name: '',
      },
    },
    {
      formType: 'Search',
      selectData: roleList,
      itemProps: {
        label: '角色',
        name: 'role_ids',
      },
    },
    {
      formType: 'Radio',
      itemProps: {
        label: '性别',
        name: 'gender',
      },
      radioData: genderRadios,
    },
    {
      itemProps: {
        label: '所属子公司',
        name: '',
      },
    },
    {
      itemProps: {
        label: '邮箱',
        name: 'email',
      },
    },
    {
      itemProps: {
        label: '手机',
        name: 'phone',
      },
    },
    {
      // formType: 'Search',
      // selectData: ,
      itemProps: {
        label: '证件类型',
        name: 'cert',
      },
    },
    {
      itemProps: {
        label: '证件号码',
        name: 'cert_number',
      },
    },
    {
      formType: 'DatePicker',
      itemProps: {
        label: '入职时间',
        name: 'join_date',
      },
    },
    {
      formType: 'Search',
      selectData: userStatusConfig,
      itemProps: {
        label: '状态',
        name: 'status',
      },
    },
    <UploadCom
      label={'个人照片'}
      key={'head_img'}
      action={'/api/v1/upload'}
      name={'head_img'}
      extra={'支持扩展名:pdf、jpg、png'}
      uploadProps={{
        disabled: props.isDisabledAll || props.action === 'detail',
        accept: 'image/png,image/jpeg,image/pdf,application/pdf',
        multiple: true,
      }}
      init={props.init}
      formAction={props.action}
      noRule
    ></UploadCom>,
    {
      formType: 'Radio',
      itemProps: {
        label: '新建法拉第平台用户',
        name: '',
      },
      radioData: choiceRadios,
    },
  ];

  const { gender } = props.init; //

  return (
    <SmartForm
      config={config}
      {...props}
      init={{
        ...props.init,
        gender: gender != undefined ? `${gender}` : 1,
      }}
    ></SmartForm>
  );
};

export default SalemanMangementForm;
