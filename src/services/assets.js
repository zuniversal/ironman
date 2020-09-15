import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getList = p => noTipsGet('OMS/equipment', p)
export const getItem = p => noTipsGet(`OMS/equipment/${p.d_id}`, p)
export const addItem = p => post('OMS/equipment', p)
export const editItem = p => put('OMS/equipment', p)
export const removeItem = p => remove('OMS/equipment', p)


export const syncOA = p => noTipsGet('OMS/equipment/OA', p)


















