import http from '../utils/http'

let resquest = "/ARPSServer/device"

/**
 * 
 * @param {航空器查询} params 
 */

export function getFlyList(params){
    return http.post(`${resquest}/getDeviceInfolist`,params)
}

export function addFly(params){
    return http.post(`${resquest}/save`,params)
}

export function updateFly(params){
    return http.post(`${resquest}/update`,params)
}

export function deleteFly(params){
    return http.post(`${resquest}/delete`,params)
}
