import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getList = p => noTipsGet('OMS/equipment/list', p)
export const getItem = p => noTipsGet(`OMS/equipment/get`, p)
export const addItem = p => post('OMS/equipment/create', p)
export const editItem = p => put(`OMS/equipment/modify`, p)
export const removeItem = p => remove(`OMS/equipment/delete`, p)


export const syncOA = p => noTipsGet(`OMS/equipment/OA`, p)
export const exportData = p => noTipsGet(`OMS/equipment/export`, p)
export const uploadFile = p => noTipsGet(`OMS/equipment/upload`, p)









