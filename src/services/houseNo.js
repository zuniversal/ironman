import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getList = p => noTipsGet('customer', p)
export const getItem = p => noTipsGet(`customer/${p.d_id}`, p)
export const addItem = p => post('customer', p)
export const editItem = p => put('customer', p)
export const removeItem = p => remove('customer', p)



















