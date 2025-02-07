import http from '../utils/http'

let resquest = "/ARPSServer/element"

/**
 * 
 * @param {约束要素查询} params 
 */

export function selTree(params) {
    return http.get(`${resquest}/selTreeLevel`, params)
}

export function selTreeElement(params) {
    return http.get(`${resquest}/selTree`, params)
}

export function checkAllElement(params) {
  return http.get(`${resquest}/checkAllElement`, params)
}

export function getGridData(params) {
    return http.get(`${resquest}/getGridData`, params)
}

export function getLineRange(params) {
    return http.get(`${resquest}/getLineRange`, params)
}

export function getAreaGrid(params) {
    return http.get(`${resquest}/getAreaGrid`, params)
}

export function insert(params) {
    return http.post(`${resquest}/insert`, params)
}

export function selectClassify(params) {
    return http.post(`${resquest}/selectClassify`, params)
}

// 生成shp边界
export function getEleByPython(params) {
    return http.post(`${resquest}/getEleByPython`, params)
}