<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
export default {
    components:{
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            list_of_products_in_cart: [],
            total_cart: 0,
            status_empty: false,
        }
    },

    created() {
        this.getProductInCart();
    },

    methods: {
        getProductInCart() {
            this.list_of_products_in_cart = JSON.parse(localStorage.getItem("Cart"));
            this.total_cart = 0;
            for(let i = 0; i < this.list_of_products_in_cart.length; i++){
                    this.total_cart += (this.list_of_products_in_cart[i].quantity*this.list_of_products_in_cart[i].price);
                }
        },

        removeProduct(_id) {
            let cart = JSON.parse(localStorage.getItem("Cart"));
            for (let i = 0; i < cart.length; i++) {
                if (cart[i]._id == _id) {
                    cart.splice(i, 1);
                }
            }
            localStorage.setItem("Cart", JSON.stringify(cart));
            this.getProductInCart();
        },

        adjustQuantity(type, _id){
            let cart = JSON.parse(localStorage.getItem("Cart"));
            for(let i = 0; i < cart.length; i++){
                if(cart[i]._id == _id){
                    if(type == "increase"){
                        if(cart[i].quantity == cart[i].max_quantity){
                            alert("Đã thêm số sản phẩm tối đa");
                        }else{
                            cart[i].quantity += 1;
                        }
                    }else if(type == "decrease"){
                        cart[i].quantity -= 1;
                        if(cart[i].quantity == 0){
                            cart.splice(i, 1);
                        }
                    }
                }
            }
            localStorage.setItem("Cart", JSON.stringify(cart));
            this.getProductInCart();
        }
    }
}

</script>

<template>
    <AppHeader />
    
    <h2 class="text-center mx-5">Giỏ hàng</h2>
    
    <div id="" class="container container_cart">
        <div><router-link to="/product"><button class="btn">Quay lại mua hàng</button></router-link></div>
        <table class="table">
            <thead id="cart_head">
                <tr>
                    <th scope="col" class="cart_head_item">Tên sản phẩm</th>
                    <th scope="col" class="cart_head_item">Đơn giá</th>
                    <th scope="col" class="cart_head_item">Số lượng</th>
                    <th scope="col" class="cart_head_item">Thành tiền</th>
                    <th scope="col" class="cart_head_item">Xóa</th>
                </tr>
            </thead>
            <tbody>

                <tr v-for="product in list_of_products_in_cart" :key="product._id">
                    <td class="info_product_in_cart_body">{{ product.productname }}</td>
                    <td class="info_product_in_cart_body">{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) }}</td>
                    <td style="position: relative; text-align: center; top: 50px;">
                       
                        <div class="d-flex flex-row text-center" style="width: 30px; top: -6px; right: 20px;">
                            <button @click="adjustQuantity('decrease', product._id)">-</button>
                            <p style="align-items:center; margin: 5px 10px;">{{ product.quantity }} </p>
                            <button @click="adjustQuantity('increase', product._id)">+</button>
                        </div> 
                    </td>
                    <td class="info_product_in_cart_body">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price*product.quantity)}}</td>
                    <td class="info_product_in_cart_body"><i style="cursor: pointer;"
                            @click="removeProduct(product._id)" class="fa-solid fa-trash"></i></td>
                </tr>
            </tbody>
        </table>
        
        <div class="d-flex justify-content-between">
            
            <div style="font-size: 22px;">Tổng tiền thanh toán: <span style="color: #1097cf"> {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total_cart) }}</span></div>
        </div>

        <div class="mt-3 d-flex justify-content-end">
            <button class="btn"><router-link class="btn" to="/order">Đặt hàng</router-link></button>
        </div>
    </div>
    <AppFooter />
</template>

<style scoped>


.container_cart {
    padding: 50px 130px 0 130px;
}

.btn{
    border-radius: 20px;
    color: #fff;
    background: #ff4500;
}

.img_product_in_cart_body {
    display: block;
    width: 90px;
    margin: 20px auto;
}

.info_product_in_cart_body {
    line-height: 130px;
    text-align: center;
}

</style>