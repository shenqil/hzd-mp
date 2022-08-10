import { apiServer, apiServer2,apiServer3 } from "@/http/index";

// 获取事件列表
async function getEventList(params = {}) {
  return await apiServer.post("/npEventReport/getPages", {
    ...params
  });
}


// 获取作业列表
async function getTaskList(params = {}) {
  return await apiServer.post("/npFarming/getPages", {
    ...params
  });
}


// 获取种植列表
async function getPlantingList(params = {}) {
  return await apiServer.post("/npPlanting/selectPageData", {
    ...params
  });
}

// 获取事件详情
async function getEventDetails(params = {}) {
  return await apiServer.get(`/npEventReport/getById/${params}`);
}

export default {
	getEventList,
	getTaskList,
	getPlantingList,
	getEventDetails,
}
