import http from '../utils/http'

let resquest = "/ARPSServer/weather"

/**
 * 
 * @param {图层管理} params 
 */

export function getList(params){
    return http.post(`${resquest}/selList`,params)
}

export function deleteList(params){
    return http.get(`${resquest}/delete`,params)
}

export function getWeatherData(params){
    return http.get(`${resquest}/getWeatherData`,params)
}