<script>
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
import OrderService from '../services/order.service';
export default{
    components:{
        AppHeader,
        AppFooter,
    },
    data(){
        return{
            fullname: '',
            email: '',
            phonenumber: '',
            orderList:[],
        } 
    },

    created(){ 
        this.getUserProfileAndOrderList()
    },

    methods:{
        async getUserProfileAndOrderList(){
            const UserProfile = JSON.parse(localStorage.getItem('UserLogin'));
            this.fullname = UserProfile.fullname;
            this.email = UserProfile.email;
            this.phonenumber = UserProfile.phonenumber;

            try{
                const response = await OrderService.getOrderByEmail(this.email);
                this.orderList = response;
            }catch(error){
                alert("Có lỗi xảy ra khi lấy danh sách đơn hàng");
            }
        }
    }
}
</script>

<template>

    <AppHeader />


    <div class="container">
        <h3>Thông Tin Tài Khách Hàng</h3>
        <div class="row">
            <div class="col-md-12 info-user" id="info_user">
                
                <div class="row mt-3">
                    <div class="col-md-3">Họ tên khách hàng:</div>
                    <div class="col-md-9">{{ fullname }}</div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-3">Email:</div>
                    <div class="col-md-9">{{ email }}</div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-3">Số điện thoại khách hàng:</div>
                    <div class="col-md-9">{{ phonenumber }}</div>
                </div>
                <div> 
                    <router-link to="/changepwd">Đổi mật khẩu</router-link>
                </div>
                <div> 
                    <router-link to="/changeinfo">Đổi thông tin khách hàng</router-link>
                </div>
            </div>
        </div>
    </div>

    <div class="container mt-4">
        <h3 class="text-center">Đơn hàng đã đặt</h3>
        <table class="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Mã đơn</th>
                    <th scope="col">Tên người nhận</th>
                    <th scope="col">Địa chỉ nhận hàng</th>
                    <th scope="col">Số điện thoại</th>
                    <th scope="col">Tổng</th>
                    <th scope="col">Hình thức thanh toán</th>
                    <th scope="col">Trạng thái giao hàng</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orderList" :key="order._id">
                    <td>{{ order._id }}</td>
                    <!-- <td><router-link :to="{name: 'DetailOrder', params: {id: `${order._id}`}}"> {{ order._id }}</router-link> </td> -->
                    <td>{{ order.fullname }}</td>
                    <td>{{ order.address }}</td>
                    <td>{{ order.phonenumber }}</td>
                    <td>{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total) }}</td>
                    <td>{{ order.payment }}</td>
                    <td>{{ order.status }}</td>
                </tr>
            </tbody>
        </table>
    </div> 

    <AppFooter />
    
</template>

<style scoped>


.info_user{
    background-color: #f1f1f1;
    padding: 25px;
    margin: 40px auto;
}
.info-user h3{
    color: #ff4500;
}

.back-to-home{
    margin: 20px 50px;
    align-items: center;
    text-align: center;
    border: none;
    background: #ff4500;
    border-radius:30px;
}
.back-to-home i{
    color: #fff;
}
.back-to-home:hover{
    background: #202020;
}
.item{
    color: #fff;
}

</style>