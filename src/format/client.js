import { format2Null, tips } from '@/utils';

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

export const formatClientData = (res, extraData) => {
  const { action, itemDetail } = extraData;

  const params = {
    ...res,
    contacts: res.contacts.map(v => ({
      ...v,
      is_urge: v.is_urge ? true : false,
      is_quit: v.is_quit ? true : false,
    })),
    customer_admin:
      res.customer_admin && !!res.customer_admin.length
        ? res.customer_admin.map(v => ({
            ...v,
            password: v.password ?? null,
          }))
        : [],
  };

  if (res.file) {
    if (res.file && res.file.fileList && res.file.fileList.length > 0) {
      const fileList = res.file.fileList;
      console.log(' fileList ： ', fileList);
      params.file = fileList.map(v => v.response.url).join(',');
    } else {
      params.file = null;
    }
  } else {
    params.file = null;
  }
  if (res.file) {
    if (res.logo && res.logo.fileList && res.logo.fileList.length > 0) {
      const fileList = res.logo.fileList;
      console.log(' fileList ： ', fileList);
      params.logo = fileList.map(v => v.response.url).join(',');
    } else {
      params.logo = null;
    }
  } else {
    params.logo = null;
  }
  params.enterprise.file = params.file;
  params.enterprise.logo = params.logo;

  params.enterprise.parent_enterprise_id = null;
  delete params.file;
  delete params.logo;
  delete params.last_service_staff_id;
  if (action === 'edit') {
    params.id = itemDetail.id;
    params.enterprise.id = itemDetail.enterprise.id;
    params.enterprise_id = itemDetail.enterprise.id;
    delete params.contract;
    delete params.electricity_user;
  }

  const {
    enterprise,
    electricity_user,
    customer_admin,
    contacts,
    ...rest
  } = params;
  console.log(
    ' formatClientFormData   data,   ： ',
    params,
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
  const data3 = electricity_user?.map(v => format2Null(v, houseNoValidates));
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

export const formatClientDetail = (payload, extraData) => {
  console.log(' formatClientDetail data ： ', payload, extraData); //
  const {
    file,
    service_staff_id,
    service_staff_name,
    last_service_staff_id,
    last_service_staff_name,
    service_enterprise_id,
    service_enterprise_name,
    service_organization_id,
    service_organization_name,
    enterprise,
    contacts,
    customer_admin,
  } = payload;

  return {
    ...payload,
    file: enterprise.file?.split(','),
    logo: enterprise.logo?.split(','),
    service_staff_id: service_staff_id ? `${service_staff_id}` : null,
    last_service_staff_id: last_service_staff_id
      ? `${last_service_staff_id}`
      : null,
    service_enterprise_id: service_enterprise_id
      ? `${service_enterprise_id}`
      : null,

    service_staff: `${service_staff_id}`,
    last_service_staff: `${last_service_staff_id}`,
    // service_organization_id: service_organization_name ?? '',
    customer_admin: customer_admin.map(v => ({ ...v, tags: v.tags ?? [] })),
    contacts: contacts.map(v => ({
      ...v,
      is_urge: [v.is_urge],
      is_quit: [v.is_quit],
      tags: v.tags.map(v => `${v.id}`) ?? [],
    })),
  };
};
