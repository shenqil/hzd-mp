import { apiServer, apiServer2,apiServer3 } from "@/http/index";

// 获取事件列表
async function getEventList(params = {}) {
  return await apiServer.post("/npEventReport/getPages", {
    pageNum: 0,
    pageSize: 1000,
    param: params,
  });
}


// 获取作业列表
async function getTaskList(params = {}) {
  return await apiServer.post("/npFarming/getPages", {
    pageNum: 0,
    pageSize: 1000,
    param: params,
  });
}


// 获取种植列表
async function getPlantingList(params = {}) {
  return await apiServer.post("/npPlanting/selectPageData", {
    pageNum: 0,
    pageSize: 1000,
    param: params,
  });
}

export default {
	getEventList,
	getTaskList,
	getPlantingList,
}
