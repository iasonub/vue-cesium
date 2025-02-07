import http from '../utils/http'

let resquest = "/ARPSServer/element"

/**
 * @param {查询约束要素列表} params 
 */

export function getList(params){
    return http.get(`${resquest}/selList`,params)
}

export function insert(params){
    return http.post(`${resquest}/insert`,params)
}

export function edit(params){
    return http.post(`${resquest}/edit`,params)
}

export function del(params){
    return http.get(`${resquest}/delete`,params)
}
// 航路规划(蚁群算法)
export function getLine(params){
    return http.get(`${resquest}/getLine`,params)
}
// 航路规划(dijkstra算法)
export function getAirLine(params){
    return http.get(`${resquest}/getAirLine`,params)
}

/**
 * @param {查询约束要素分类列表} params 
 */
export function selectClassify(params){
    return http.get(`${resquest}/selectClassify`,params)
}

export function insertClassify(params){
    return http.post(`${resquest}/insertClassify`,params)
}

 export function updateClassify(params){
    return http.post(`${resquest}/editClassify`,params)
}

export function deleteClassify(params){
    return http.get(`${resquest}/delClassify`,params)
}

export function createGrid(params){
    return http.post(`${resquest}/createGrid`,params)
}