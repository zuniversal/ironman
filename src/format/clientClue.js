import { format2Null, tips } from '@/utils';
import { houseNoImgConfig } from '@/configs';

const contactValidates = [
  'phone',
  'tel',
  'email',
  'qq',
  'wechat',
  'comments',
  'tags',
];
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

export const formatClientClueData = (res, extraData) => {
  const { action, itemDetail } = extraData;

  const { ele_user } = res;
  const { province, city, area, ...enterprise } = res.enterprise;
  console.log(' enterprise ： ', enterprise);

  const params = {
    ...res,
    content: {
      ...res,
      base: {
        name: res.name,
        level: res.level,
      },
      enterprise: format2Null(enterprise, enterpriseValidates),
      contacts: res.contacts.map(v => ({
        ...format2Null(v, contactValidates),
        // is_urge: v.is_urge && v.is_urge.length > 0 ? true : false,
        // is_quit: v.is_quit && v.is_quit.length > 0 ? true : false,
        is_urge: v.is_urge ? true : false,
        is_quit: v.is_quit ? true : false,
      })),
      ele_user: ele_user.map(v => {
        houseNoImgConfig.forEach(({ key, type }) => {
          if (v[key]) {
            if (v[key] && v[key].fileList && v[key].fileList.length > 0) {
              const fileList = v[key].fileList;
              console.log(' fileList ： ', fileList);
              v[key] =
                type === 'array'
                  ? fileList.map(v => v.response.url)
                  : fileList[fileList.length - 1].response.url;
              // .join(',');
            } else {
              v[key] = null;
            }
          } else {
            v[key] = null;
          }
        });
        const { province, city, area, ...rest } = v;
        console.log(' res  houseNoImgConfig.map v ： ', res);
        return format2Null(rest, houseNoValidates);
      }),
    },
    address: res.enterprise.address,
    longitude: res.enterprise.longitude,
    latitude: res.enterprise.latitude,
    adcode: res.enterprise.adcode,
    city_code: res.enterprise.city_code,
    district: res.enterprise.district,
  };
  if (res.file) {
    if (res.file && res.file.fileList && res.file.fileList.length > 0) {
      const fileList = res.file.fileList;
      console.log(' fileList ： ', fileList);
      params.content.enterprise.file = fileList
        .map(v => v.response.url)
        .join(',');
    } else {
      params.content.enterprise.file = null;
    }
  } else {
    params.content.enterprise.file = null;
  }
  if (res.logo) {
    if (res.logo && res.logo.fileList && res.logo.fileList.length > 0) {
      const fileList = res.logo.fileList;
      console.log(' fileList ： ', fileList);
      params.content.enterprise.logo = fileList
        .map(v => v.response.url)
        .join(',');
    } else {
      params.content.enterprise.logo = null;
    }
  } else {
    params.content.enterprise.logo = null;
  }
  console.log(' paramsparams222 ： ', params, res);
  if (res.streetscape_img) {
    if (
      res.streetscape_img &&
      res.streetscape_img.fileList &&
      res.streetscape_img.fileList.length > 0
    ) {
      const fileList = res.streetscape_img.fileList;
      console.log(' fileList ： ', fileList);
      params.content.enterprise.streetscape_img = fileList
        .map(v => v.response.url)
        .join(',');
    } else {
      params.content.enterprise.streetscape_img = null;
    }
  } else {
    params.content.enterprise.streetscape_img = null;
  }

  delete params.contacts;
  delete params.ele_user;
  delete params.enterprise;
  delete params.file;
  delete params.logo;
  delete params.streetscape_img;
  delete params.content.file;
  delete params.content.logo;
  delete params.content.streetscape_img;

  if (action === 'edit') {
    params.id = itemDetail.id;
  }

  return params;
};

export const formatClientClueDetail = (payload, extraData) => {
  console.log(' formatClientClueDetail data ： ', payload, extraData); //
  const { file, logo, streetscape_img } = payload.content.enterprise;

  return {
    ...payload,
    ...payload.content,
    file: file ? file.split(',') : [],
    logo: logo ? logo.split(',') : [],
    streetscape_img: streetscape_img ? streetscape_img.split(',') : [],
  };
};
