import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getCustomer = p => noTipsGet('customer', p)
export const getCustomerDetail = p => noTipsGet('customer/', p)
export const addCustomer = p => noTipsPost('customer', p)
export const editCustomer = p => put('customer', p)
export const removeCustomer = p => remove('customer', p)


















