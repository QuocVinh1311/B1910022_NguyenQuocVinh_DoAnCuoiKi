<script>
import ProductService from '../services/product.service';
export default{
    data(){
        return{
            product_list: []
        }
    },

    watch:{
        '$route': 'getProductListByKeyword',
    },

    created(){
        this.getProductListByKeyword()
    },

    methods:{
        async getProductListByKeyword(){
            try{
                const response = await ProductService.getProductByKeyword(this.$route.query.keyword);
                this.product_list = response;
            }catch(error){
                alert("Có lỗi xảy ra khi lấy thông tin sản phẩm");
            }
        }
    }
}
</script>
<template>
    <div class="container">
        <h3>Tìm thấy {{ product_list.length }} kết quả cho "{{ $route.query.keyword }}"</h3>
        <div class="row mt-4">
            <div class="col-md-3 col-6" v-for="product in product_list" :key="product._id">
                <router-link :to="{name: 'Product', params: {id: `${product._id}`}}" class="d-block">
                    <img class="img_of_product" :src="product.imageURL" alt="">
                </router-link>
                <router-link :to="{name: 'Product', params: {id: `${product._id}`}}" class="name_of_product">{{product.productname}}</router-link>
                <p class="price_of_product">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.img_of_product{
    display: block;
    width: 80%;
    margin: 0 auto;
}   

.name_of_product{
    display: block;
    text-decoration: none;
    text-align: center;
    color: black;
    font-size: 22px;
}

.price_of_product{
    text-align: center;
    font-size: 24px;
    color: #1097cf;
}
</style>