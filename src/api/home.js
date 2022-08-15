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
    ...params,
  });
}

// 获取待办信息
async function getMessages(id = "") {
  return await apiServer.get(`/npEventReport/getMessages/${id}`, {
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
}

// 事件
async function getEventReport(id = "") {
  return await apiServer.get(`/npEventReport/getById/${id}`, {
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
}

// 预警
async function getWarnReport(id = "") {
  return await apiServer.get(`/npEventReport/getWarnInfoById/${id}`, {
    header: {
      "content-type": "application/x-www-form-urlencoded",
    },
  });
}

export default {
  getBlockList,
  getDeviceList,
  getDeviceInfo,
  setRelay,
  getMessages,
  getEventReport,
  getWarnReport,
};
