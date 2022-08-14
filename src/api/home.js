import { apiServer, apiServer2, apiServer3 } from "@/http/index";

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

// 查询设备信息
async function getDeviceInfo(params = {}) {
  return await apiServer3.get("/hzdData/getCurrentDataByDeviceId", {
    ...params,
  });
}

// 控制继电器
async function setRelay(params = {}) {
  return await apiServer2.post("/relay", {
    ...params
  })
}

export default {
  getBlockList,
  getDeviceList,
  getDeviceInfo,
  setRelay
};
