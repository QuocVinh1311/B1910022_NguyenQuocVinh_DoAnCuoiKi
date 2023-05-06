<script>
import OrderService from '../services/order.service';
import { Form, Field, ErrorMessage } from "vee-validate";
import * as yup from "yup";
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
export default{
    components:{
        Form,
        Field, 
        ErrorMessage,
        AppHeader,
        AppFooter,
    },
    
    data() {
        const orderFormSchema = yup.object().shape({
            fullname: yup
                .string()
                .required("Bạn phải điền tên người nhận!")
                .min(2,"Bạn phải điền đầy đủ họ tên!")
                .max(30,"Họ tên không được quá 30 kí tự!"),
            email: yup
                .string()
                .required("Bạn Phải nhập email hợp lệ!")
                .email("Email chưa đúng"),    
            phonenumber: yup
                .string()
                .matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại chưa đúng."
                ),
            address: yup
                .string()
                .min(15, "Nhập địa chỉ giao hàng cụ thể!")   
                .max(200, "Địa chỉ không quá 200 kí tự!"
                ),
        }); 
        return {
            orderFormSchema,
            fullname: '',
            email: '',
            phonenumber: '',
            address: '',
            products: [],
            note: '',
            total: 15000,
            payment: 'Thanh toán tiền mặt',
            status: 'Chờ xử lí',
        }
    },

    created(){
        this.getUserInfo(),
        this.getProductsInCart()
    },

    methods:{
        
        getUserInfo(){
            const userInfo = JSON.parse(localStorage.getItem("UserLogin"));
            this.fullname = userInfo.fullname;
            this.email = userInfo.email;
            this.phonenumber = userInfo.phonenumber;
        },

        getProductsInCart(){
            this.products = JSON.parse(localStorage.getItem("Cart"));
            for(let i = 0; i < this.products.length; i++){
                const total_of_each_product = this.products[i].price*this.products[i].quantity;
                this.total += total_of_each_product;
            }
        },

        async createOrderForCustomer(){
            try{
                const order = await OrderService.createOrder({
                    fullname: this.fullname,
                    email: this.email,
                    phonenumber: this.phonenumber,
                    address: this.address,
                    products: this.products,
                    note: this.note,
                    total: this.total,
                    payment: this.payment,
                    status: this.status,
                });

                const InfoCus= {
                    fullname: this.fullname,
                    phonenumber: this.phonenumber,
                    address: this.address,
                    total: this.total,
                    payment: this.payment,
                    note: this.note,
                }
                localStorage.setItem("InfoCus", JSON.stringify(InfoCus));
                alert("Đặt hàng thành công!");
                this.$router.push({ name: 'Home' });
            }catch(error){
                alert("Đặt hàng thất bại, vui lòng thử lại!");
            }
        },
    },   
}


</script>
<template>
   <AppHeader></AppHeader>
<div class="container mt-4">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header">
                    <h2 class="text-center">Thông tin sản phẩm bạn đã thêm</h2>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" class="text-center">Tên sản phẩn</th>
                                <th scope="col" class="text-center">Số lượng</th>
                                <th scope="col" class="text-center">Giá </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product in products" :key="product._id">
                                <td class="amount_card_body">{{ product.productname }}</td>
                                <td class="amount_card_body">{{ product.quantity }}</td>
                                <td class="price_card_body">{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                    <div>
                        <div class="d-flex justify-content-left">
                            <p>Tổng: </p>
                            <p>{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total-15000) }}</p>
                        </div>
                        <div class="d-flex justify-content-left">
                            <p>Phí vận chuyển: </p>
                            <p>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(15000)}}</p> 
                        </div>
                        <div class="d-flex justify-content-left">
                            <p>Tổng đơn(bao gồm phí vận chuyển): </p>
                            <p>{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}}</p> 
                        </div>
                    </div>
                    <hr>
                    <div class="d-flex justify-content-between">
                        <router-link id="back_to_cart" to="/shoppingcart"><i class="fa-solid fa-chevron-left"></i>&nbsp;&nbsp;Quay về giỏ hàng</router-link>
                    </div>
                </div>
            </div>    
        </div>
    </div>
    <hr>
    <div class="row">
        <div class="col-md-12">
            <div class="row">
                <div class="col">
                    <div class="card-header">
                        <h2 class="text-center">Thông tin đặt hàng</h2>
                    </div>
                    <Form @submit="createOrderForCustomer()" :validation-schema="orderFormSchema">
                        <div class="mb-3">
                            <label for="fullnameOrder" class="form-label">Họ và tên người nhận <span>*</span></label>
                            <Field name="fullname" type="text" class="form-control" id="fullnameOrder" required v-model="fullname"/>
                            <ErrorMessage class="errorText" name="fullname" />
                        </div>
                        <div class="mb-3">
                            <label for="emailOrder" class="form-label">Email <span>*</span></label>
                            <Field name="email" type="email" class="form-control" id="emailOrder" readonly required v-model="email"/>
                            <ErrorMessage class="errorText" name="email" />
                        </div>

                        <div class="mb-3">
                            <label for="phoneNumberOrder" class="form-label">Số điện thoại <span>*</span></label>
                            <Field name="phonenumber" type="text" class="form-control" id="phoneNumberOrder" required v-model="phonenumber"/>
                            <ErrorMessage class="errorText" name="phonenumber"/>
                        </div>

                        <div class="mb-3">
                            <label for="addressOrder" class="form-label">Địa chỉ <span>*</span></label>
                            <Field name="address" type="text" class="form-control" id="addressOrder" required v-model="address"/>
                            <ErrorMessage class="errorText" name="address"/>
                        </div>
                        
                        <div class="mb-3">
                            <label for="comment_order" class="form-label">Ghi chú <span>*</span></label>
                            <textarea class="form-control" id="comment_order" rows="4" placeholder="Bạn có ghi chú gì cần chúng tôi lưu ý khi giao hàng không" v-model="note"></textarea>
                        </div>

                        <div class="mb-3">
                            <label for="payment_order" class="form-label">Hình thức thanh toán <span>*</span></label>
                            <select name="payment_order" id="payment_order" class="form-control" required v-model="payment">
                                <option value="Thanh toán tiền mặt" selected>Thanh toán tiền mặt</option>
                                <option value="Chuyển khoản ATM">Chuyển khoản</option>
                                <option value="Thanh toán bằng hình thức quẹt thẻ">Thanh toán bằng hình thức quẹt thẻ</option>
                            </select>
                        </div>
                        <div class="mt-5">
                            <button type="submit" class="btn_agree_order">Đặt hàng</button>
                        </div>
                    </Form>
                </div> 
            </div>
        </div>

    </div>
</div>
<AppFooter></AppFooter>
</template>

<style scoped>
.img_card_body{
    width: 70%;
    display: block;
    margin: 0 auto;
}

.price_card_body{
    text-align: center;
}

.amount_card_body{
    text-align: center;
}

.errorText{
    color: #ff4500;
}
.btn_agree_order{
    color: #fff;
    background-color: #ff4500;
    transition: 0.5s;
    padding: 5px 20px;
    border: none;
    border-radius: 20px;
}
.btn_agree_order:hover{
    padding: 5px 30px;
}
</style>