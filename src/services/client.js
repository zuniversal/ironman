import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getList = p => noTipsGet('customer', p)
export const getItem = p => noTipsGet(`customer/${p.d_id}`, p)
export const addItem = p => post('customer', p)
export const editItem = p => put(`customer/${p.d_id}`, p)
export const removeItem = p => remove(`customer/${p.d_id}`, p)


export const syncOA = p => get(`customer/OA`, p)
export const getPortrait = p => noTipsGet(`customer/portrait/${p.d_id}`, p)









