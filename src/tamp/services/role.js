import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getList = p => noTipsGet('roles', p)
export const getItem = p => noTipsGet(`roles/${p.d_id}`, p)
export const addItem = p => post('roles', p)
export const editItem = p => put('roles', p)
export const removeItem = p => remove('roles', p)



















