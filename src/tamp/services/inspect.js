import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getList = p => noTipsGet('inspect/plan', p)
export const getItem = p => noTipsGet(`inspect/plan/${p.d_id}`, p)
export const addItem = p => post('inspect/plan', p)
export const editItem = p => put(`inspect/plan/${p.d_id}`, p)
export const removeItem = p => remove(`inspect/plan/${p.d_id}`, p)


export const gettStaionPlan = p => post('inspect/plan/stations', p)
















