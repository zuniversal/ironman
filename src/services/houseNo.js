import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getList = p => noTipsGet('electricityuser', p)
export const getItem = p => noTipsGet(`electricityuser/${p.d_id}`, p)
export const addItem = p => post('electricityuser', p)
export const editItem = p => put('electricityuser', p)
export const removeItem = p => remove('electricityuser', p)


export const syncOA = p => noTipsGet('electricityuser/OA', p)

















