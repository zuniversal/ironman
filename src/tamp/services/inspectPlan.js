import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getList = p => noTipsGet('spect/plan', p)
export const getItem = p => noTipsGet(`spect/plan/${p.d_id}`, p)
export const addItem = p => post('spect/plan', p)
export const editItem = p => put('spect/plan', p)
export const removeItem = p => remove('spect/plan', p)



















