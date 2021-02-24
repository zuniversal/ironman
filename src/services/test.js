import {
  get,
  post,
  put,
  remove,
  noTipsGet,
  noTipsPost,
  noTipsPut,
  noTipsRemove,
} from '@/utils/request';

export const getList = p => noTipsGet('customer', p);
export const getItem = p => noTipsGet(`customer/${p.d_id}`, p);
export const addItem = p => post('customer', p);
export const editItem = p => put(`customer/${p.d_id}`, p);
export const removeItem = p => remove(`customer/${p.d_id}`, p);

// const url = 'https://api.github.com/user?access_token=d1dc3982f9c5143680c7258e3a5090d15246ad2f'
const url = 'https://www.mocky.io/v2/5cc8019d300000980a055e76';
export const test = async p => await noTipsGet(url, p);
