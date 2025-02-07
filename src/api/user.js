import http from '@/utils/http'

let resquest = "/ARPSServer/users"

/**
 * 
 * @param {航空器查询} params 
 */

export function loginTo(data){
    return http.post(`${resquest}/login`,data)
}

export function userList(data){
    return http.post(`${resquest}/selList`,data)
}

export function addUserList(data){
    return http.post(`${resquest}/insert`,data)
}

export function updateUserList(data){
    return http.post(`${resquest}/edit`,data)
}

export function delUserList(data){
    return http.get(`${resquest}/del`,data)
}