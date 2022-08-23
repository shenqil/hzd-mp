import { apiServer, apiServer2 } from "@/http/index";

// 获取事件列表
async function getEventList(params = {}) {
  return await apiServer.post("/base/npEventReport/getPages", {
    ...params
  });
}


// 获取作业列表
async function getTaskList(params = {}) {
  return await apiServer.post("/base/npFarming/getPages", {
    ...params
  });
}


// 获取种植列表
async function getPlantingList(params = {}) {
  return await apiServer.post("/base/npPlanting/selectPageData", {
    ...params
  });
}

// 获取事件详情
async function getEventDetails(params = {}) {
  return await apiServer.get(`/base/npEventReport/getById/${params}`);
}


// 获取地块列表
async function getBlockList(params = {}) {
  return await apiServer.post(`/base/npBlock/getPages`,{ ...params });
}

// 获取用户列表
async function getxphUserList(params = {}) {
  return await apiServer.post(`/base/xphUser/getPages`,{ ...params });
}

// 获取字典查询列表
async function getsysDictList(params = {}) {
  return await apiServer.get(`/base/sysDict/select/BydictCode`,{ ...params });
}


// 添加事件
async function getEventReport(params = {}) {
  return await apiServer.postFromData(`/base/npEventReport/insert`,
  { 
	...params
  });
}

// 种植品种
async function getplantType(params = {}) {
  return await apiServer.post(`/plant/plantType/getPages`,
  { 
    pageNum: 1,
    pageSize: 1000,
	  ...params
  });
}
// 获取设备列表
async function getDevicepage(params = {}) {
  return await apiServer.get(`/xph/devicepage`, { ...params });
}

// 获取视频
async function getVideo(params = {}) {
  return await apiServer.get(`/xph/video/${params}`,);
}

// 获取照片
async function getPhoto(params = {}) {
  return await apiServer.get(`/xph/photo/${params.facId}`, 
  {
	  ...params
  });
}
// 修改用户信息
async function getXphUser(params = {}) {
  return await apiServer.postFromData(`/base/xphUser/update`,{ ...params });
}

// 抓拍
async function getCapture(params = {}) {
  return await apiServer.get(`/xph/video/capture/${params}`);
}

// 摄像头操作
async function getStart(params = {}) {
  return await apiServer2.postFromData(`/device/ptz/start`,{ ...params });
}



// 摄像头停止操作
async function getStop(params = {}) {
  return await apiServer2.postFromData(`/device/ptz/stop`,{ ...params });
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
    getplantType,
    getDevicepage,
	getVideo,
	getPhoto,
	getXphUser,
	getCapture,
	getStart,
	getStop
}
