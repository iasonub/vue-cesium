"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selTree = selTree;

var _http = _interopRequireDefault(require("../utils/http"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var resquest = "/ARPSServer/element";
/**
 * 
 * @param {航空器查询} params 
 */

function selTree(params) {
  return _http["default"].get("".concat(resquest, "/selTree"), params);
}