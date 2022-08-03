import {apiServer2} from "@/http/index";



// 登录
async function test(params={}) {
  return await apiServer2.get('/element', params);
}


export default {
  test,
};
