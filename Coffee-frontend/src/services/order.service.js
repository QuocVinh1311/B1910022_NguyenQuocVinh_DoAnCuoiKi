import createApiClient from "./api.service";

class OrderService {
    constructor(baseUrl = "/api/orders") {
        this.api = createApiClient(baseUrl);
    }

    //Tạo đơn hàng
    async createOrder(data) {
        return (await this.api.post('/create', data)).data;
    }

    //Lấy thông tin đơn hàng theo email
    async getOrderByEmail(email) {
        return (await this.api.get(`/email/${email}`)).data;
    }

    //Lấy thông tin đơn hàng theo id
    async getOrderById(id) {
        return (await this.api.get(`/detail/${id}`)).data;
    }

    //Hủy đơn hàng
    async cancelOrderById(data, id) {
        return (await this.api.put(`/cancel/${id}`, data)).data;
    }

    //Lấy tất cả đơn hàng
    async getAllOrderInDB() {
        return (await this.api.get("/")).data;
    }

    //Cập nhật trạng thái đơn hàng
    async updateOrder(data, id) {
        return (await this.api.put(`/update/${id}`, data)).data;
    }
}

export default new OrderService();