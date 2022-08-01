import apiServer from "@/http/index";

const CURRENT_URL = "/api/v1/management/demos";

/**
 * 查询数据
 * */
async function query(params: any) {
  return await apiServer.get(CURRENT_URL, {
    params,
  });
}

/**
 * 创建数据
 * */
async function create(item: any) {
  return await apiServer.post(CURRENT_URL, item);
}

export default {
  query,
  create,
};
