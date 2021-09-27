import { format2Null } from '@/utils';

export const formatClientFormData = data => {
  const contactValidates = [
    'phone',
    'tel',
    'email',
    'qq',
    'wechat',
    'comments',
    'tags',
  ];
  const adminValidates = ['nickname', 'phone', 'email', 'wechat'];
  const enterpriseValidates = [
    'legal_person',
    'legal_person_phone',
    'tax_num',
    'bank_account_name',
    'bank_name',
    'postcode',
    'scale',
    'nature',
    'industry',
    'asset',
    'covered_area',
    'parent_enterprise_id',
  ];
  const houseNoValidates = [
    'transformer_capacity',
    'real_capacity',
    'voltage_level',
    'type',
    'ep_factor',
    'trusteeship_num',
    'longitude',
    'latitude',
  ];

  const clientInfoValidates = [
    'type',
    'last_service_staff_id',
    'service_staff_id',
    'service_organization_id',
  ];

  const {
    enterprise,
    electricity_user = [],
    customer_admin = [],
    contacts = [],
    ...rest
  } = data;
  console.log(
    ' formatClientFormData   data,   ： ',
    data,
    enterprise,
    electricity_user,
    customer_admin,
    contacts,
    rest,
  );
  const data1 = format2Null(rest, clientInfoValidates);
  const data2 = format2Null(enterprise, enterpriseValidates);
  const data5 = contacts.map(v => format2Null(v, contactValidates));
  const data4 = customer_admin.map(v => format2Null(v, adminValidates));
  const data3 = electricity_user.map(v => format2Null(v, houseNoValidates));
  const newData = {
    ...data1,
    enterprise: data2,
    contacts: data5,
    customer_admin: data4,
    electricity_user: data3,
  };
  console.log(
    ' formatClientFormData data1 ：',
    data1,
    data2,
    data3,
    data4,
    data5,
    newData,
  );
  return newData;
};
