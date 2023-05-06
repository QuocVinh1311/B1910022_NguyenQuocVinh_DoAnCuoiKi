import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }


    async createOrder(data) {
        return (await this.api.post('/create', data)).data;
    }


    async getOrderByEmail(email) {
        return (await this.api.get(`/email/${email}`)).data;
    }


    async getOrderById(id) {
        return (await this.api.get(`/detail/${id}`)).data;
    }


    async cancelOrderById(data, id) {
        return (await this.api.put(`/cancel/${id}`, data)).data;
    }


    async getAllOrderInDB() {
        return (await this.api.get("/")).data;
    }


    async updateOrder(data, id) {
        return (await this.api.put(`/update/${id}`, data)).data;
    }
}

export default new OrderService();