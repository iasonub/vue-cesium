"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getList = getList;
exports.insert = insert;
exports.edit = edit;
exports.del = del;

var _http = _interopRequireDefault(require("../utils/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resquest = "/ARPSServer/element";
/**
 * 
 * @param {查询约束要素列表} params 
 */

function getList(params) {
  return _http["default"].get("".concat(resquest, "/selList"), params);
}

function insert(params) {
  return _http["default"].post("".concat(resquest, "/insert"), params);
}

function edit(params) {
  return _http["default"].post("".concat(resquest, "/edit"), params);
}

function del(params) {
  return _http["default"].post("".concat(resquest, "/delete"), params);
}