import { apiServer, apiServer2 } from "@/http/index";

// 获取地块
async function getBlockList(params = {}) {
  return await apiServer.post("/npBlock/getPages", {
    pageNum: 0,
    pageSize: 1000,
    param: params,
  });
}

// 获取所有设备
async function getDeviceList(params = {}) {
  return await apiServer2.get("/devicepage", {
    pageNum: 0,
    pageSize: 1000,
    ...params,
  });
}

export default {
  getBlockList,
  getDeviceList,
};
