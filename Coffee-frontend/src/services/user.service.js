import createApiClient from "./api.service";

class AuthService {
    constructor(baseUrl = "/api/auth") {
        this.api = createApiClient(baseUrl);
    }


    async registerAccountUser(data) {
        return (await this.api.post('/register', data)).data;
    }


    async loginAccountUser(data) {
        return (await this.api.post('/login', data)).data;
    }


    async updateUserProfile(data, id) {
        return (await this.api.put(`/updateprofile/${id}`, data)).data;
    }

    async updatePassword(data, id) {
        return (await this.api.put(`/updatepassword/${id}`, data)).data;
    }


    async getAccountByEmail(email) {
        return (await this.api.get(`/getaccountlist/${email}`)).data;
    }


    async deleteAccount(email) {
        return (await this.api.delete(`/delete/${email}`)).data;
    }
}

export default new AuthService();