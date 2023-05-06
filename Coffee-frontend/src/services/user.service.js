import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }

    //Đăng ký
    async registerAccountUser(data) {
        return (await this.api.post('/register', data)).data;
    }

    //Đăng nhập
    async loginAccountUser(data) {
        return (await this.api.post('/login', data)).data;
    }

    //Cập nhật thông tin người dùng
    async updateUserProfile(data, id) {
        return (await this.api.put(`/updateprofile/${id}`, data)).data;
    }

    //Cập nhật mật khẩu
    async updatePassword(data, id) {
        return (await this.api.put(`/updatepassword/${id}`, data)).data;
    }

    //Lấy danh sách tất cả tài khoản hoặc lấy thông tin 1 tài khoản theo email
    async getAccountByEmail(email) {
        return (await this.api.get(`/getaccountlist/${email}`)).data;
    }

    //Xóa tài khoản người dùng
    async deleteAccount(email) {
        return (await this.api.delete(`/delete/${email}`)).data;
    }
}

export default new AuthService();