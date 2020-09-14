import {get, post, put, remove, noTipsGet, noTipsPost,  } from "@/utils/request"




export const getCustomer = p => noTipsGet('customer', p)
export const getCustomerDetail = p => noTipsGet('customer/', p)
export const addCustomer = p => noTipsPost('customer', p)
export const editCustomer = p => put('customer', p)
export const removeCustomer = p => remove('customer', p)







// const url = 'https://api.github.com/user?access_token=d1dc3982f9c5143680c7258e3a5090d15246ad2f'
const url = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
export const test = async p => await noTipsGet(url, p)












