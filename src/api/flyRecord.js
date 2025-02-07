import http from '../utils/http'

let resquest = "/ARPSServer/flyRecord"

/**
 * 
 * @param {航空器查询} params 
 */

export function addFlyRecord(params){
    return http.post(`${resquest}/insert`,params)
}

export function editFlyRecord(params){
    return http.post(`${resquest}/edit`,params)
}

export function deleteFlyRecord(params){
    return http.get(`${resquest}/delete`,params)
}

export function searchFlyRecord(params){
    return http.post(`${resquest}/selTree`,params)
}

export function getFlyRecord(params){
    return http.get(`${resquest}/getRecord`,params)
}

export function getRoute(params){
    return http.post(`/ARPSServer/airline/getLineByName`,params)
}

export function getDevice(params){
    return http.post(`/ARPSServer/device/selDeviceByName`,params)
}

export function getTestDoc(params){
    return http.get(`/ARPSServer/airline/getTestDoc`,params)
}