<script>
import NavAdmin from '../components/NavAdmin.vue';
import OrderService from '../services/order.service';
export default{
    components:{
        NavAdmin,
    },  

    data(){
        return{
            order_list: [],
            email_to_find_order: '',
            phonenumber_to_find_order: '',
        }
    },

    created(){
        this.getAllOrder()
    },

    methods:{
        async getAllOrder(){
            try{
                this.order_list = await OrderService.getAllOrderInDB();
            }catch(error){  
                alert("Có lỗi xảy ra khi lấy thông tin các đơn hàng");
            }
        },
    }
}
</script>

<template>
    <NavAdmin />
    <div class="container-fluid" style="">
        <div class="row">
            <table class="table table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">Mã đơn hàng</th>
                        <th scope="col">Tên người nhận</th>
                        <th scope="col">Địa chỉ nhận</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Email</th>
                        <th scope="col">Tổng</th>
                        <th scope="col">Hình thức thanh toán</th>
                        <th scope="col">Ghi chú</th>
                        <th scope="col">Trạng thái</th>                        
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in order_list" :key="order._id">
                        <td><router-link :to="{name: 'AdminDetailOrder', params: {id: `${order._id}`}}">{{ order._id }}</router-link></td>
                        <td>{{ order.fullname }}</td>
                        <td>{{ order.address }}</td>
                        <td>{{ order.phonenumber }}</td>
                        <td>{{ order.email }}</td>
                        <td>{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(order.total) }}</td>
                        <td>{{ order.payment }}</td>
                        <td>{{ order.note }}</td>
                        <td>{{ order.status }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style scoped>
#nav_between_admin_page{
    background-color: white;
}

#icon_search{
    background-color: #d1e7dd;
    padding: 10px;
    border-radius: 50%;
    margin-left:5px;
}

#table_contain_search_order{
    width: 600px;
    display: block;
    margin: 0 auto;
}

#input_email, #input_phonenumber{
    border-radius: 5px;
}
</style>