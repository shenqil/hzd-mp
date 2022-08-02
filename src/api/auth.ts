import apiServer from "@/http/index";

// 登录
async function login(params={}) {
    return await apiServer.post('/xphUser/login', params) as any;
}

export default {
    login
}