import createApiClient from "./api.service";

class ProductService {
    constructor(baseUrl = "/api/product") {
        this.api = createApiClient(baseUrl);
    }


    async getProduct() {
        return (await this.api.get(`/`)).data;
    }

    async getDetailProduct(id) {
        return (await this.api.get(`/detail/${id}`)).data;
    }

    async getProductByKeyword(keyword) {
        return (await this.api.get(`/searchproduct/bykeyword?keyword=${keyword}`)).data;
    }


    async createProduct(data) {
        return (await this.api.post('/create', data)).data;
    }


    async updateProduct(data, id) {
        return (await this.api.put(`/update/${id}`, data)).data;
    }


    async deleteProduct(id) {
        return (await this.api.delete(`/delete/${id}`)).data;
    }
}

export default new ProductService();