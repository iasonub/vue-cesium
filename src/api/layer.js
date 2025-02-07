import http from '../utils/http'

let resquest = "/ARPSServer/layer"

/**
 * 
 * @param {图层管理} params 
 */

export function getListAPI(params){
    return http.post(`${resquest}/selectClassify`,params)
}

export function getIDList(params){
    return http.get(`${resquest}/selectLayerByClassify`,params)
}

export function getREGIONList(params){
  return http.get(`${resquest}/selectLayerByRegion`,params)
}

export function getLayerType(params){
    return http.get(`${resquest}/selectLayerType`,params)
}

export function getClassify(params){
    return http.get(`${resquest}/selectClassify`,params)
}

 export function getLayerFrom(params){
    return http.get(`${resquest}/selectLayerFrom`,params)
}

 export function updateLayer(params){
    return http.get(`${resquest}/editLayer`,params)
}

export function addLayer(params){
    return http.get(`${resquest}/insertLayer`,params)
}

export function delLayer(params){
    return http.get(`${resquest}/delLayer`,params)
}

/**
 * 
 * @param {图层分类} params 
 */
export function editLayerClass(params){
    return http.get(`${resquest}/editClassify`,params)
}

export function delLayerClass(params){
    return http.get(`${resquest}/delClassify`,params)
}

export function addLayerClass(params){
    return http.get(`${resquest}/insertClassify`,params)
}
/**
 * 
 * @param {图层来源} params 
 */
export function addLayerFrom(params){
    return http.get(`${resquest}/insertLayerFrom`,params)
}

export function delLayerFrom(params){
    return http.get(`${resquest}/delLayerFrom`,params)
}

export function editLayerFrom(params){
    return http.get(`${resquest}/editLayerFrom`,params)
}

export function getWeather(params){
    return http.get(`/ARPSServer/weather/selList`,params)
}