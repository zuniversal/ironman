import {get, post, noTipsGet, noTipsPost,  } from "@/utils/request"


// const SUB = ''
// export const middle = p => noTipsPost(SUB + 'login', p)


export const login = p => noTipsPost('login', p)



// const url = 'https://api.github.com/user?access_token=d1dc3982f9c5143680c7258e3a5090d15246ad2f'
const url = 'https://www.mocky.io/v2/5cc8019d300000980a055e76'
export const test = async p => await noTipsGet(url, p)








