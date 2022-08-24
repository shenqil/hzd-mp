import apiServer from "@/http/index";

// 登录
async function login(params={}) {
    return await apiServer.post('/base/xphUser/login', params);
}

export default {
    login
}