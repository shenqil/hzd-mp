import { apiServer, apiServer2,apiServer3, apiServer4} from "@/http/index";

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


// 获取地块列表
async function getBlockList(params = {}) {
  return await apiServer.post(`/npBlock/getPages`,{ ...params });
}

// 获取用户列表
async function getxphUserList(params = {}) {
  return await apiServer.post(`/xphUser/getPages`,{ ...params });
}

// 获取字典查询列表
async function getsysDictList(params = {}) {
  return await apiServer.get(`/sysDict/select/BydictCode`,{ ...params });
}


// 添加事件
async function getEventReport(params = {}) {
  return await apiServer.postFromData(`/npEventReport/insert`,
  { 
	...params
  });
}

// 种植品种
async function getplantType(params = {}) {
  return await apiServer4.post(`/plantType/getPages`,
  { 
    pageNum: 1,
    pageSize: 1000,
	  ...params
  });
}



export default {
	getEventList,
	getTaskList,
	getPlantingList,
	getEventDetails,
	getBlockList,
	getxphUserList,
	getsysDictList,
	getEventReport,
  getplantType
}
