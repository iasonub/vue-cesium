import http from '../utils/http'

let resquest = "/ARPSServer/airline"

/**
 * 
 * @param {航路分类查询} params 
 */

export function selectClassify(params) {
  return http.post(`${resquest}/selectClassify`, params)
}

export function addClassify(params) {
  return http.post(`${resquest}/insertClassify`, params)
}

export function updateClassify(params) {
  return http.post(`${resquest}/editClassify`, params)
}

export function deleteClassify(params) {
  return http.get(`${resquest}/delClassify`, params)
}

export function searchRouteTree(params) {
  return http.get(`${resquest}/selTree`, params)
}

/**
 * @param params 全选航路添加接口
 */
export function checkAll(params) {
    return http.get(`${resquest}/checkAll`, params)
  }

/**
 * @param params 查询航路数据
 */
export function selList(params) {
    return http.get(`${resquest}/selList`, params)
  }

  /**
 * @param params 删除航路数据
 */
export function deleteList(params) {
    return http.get(`${resquest}/delete`, params)
  }

 /**
 * @param params 上传excel导入航路数据
 */
export function lineForExcel(params) {
    return http.post(`${resquest}/lineForExcel`, params)
  }

/**
 * @param params 生成五步迭代航路
 */
export function getLineNet(params) {
    return http.get(`${resquest}/getLineNet`, params)
  }