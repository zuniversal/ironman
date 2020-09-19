import {get, post, put, remove, noTipsGet, noTipsPost, noTipsPut, noTipsRemove,  } from "@/utils/request"




export const getItem = p => noTipsGet('custom_info', p)
export const editItem = p => put('custom_info', p)


















