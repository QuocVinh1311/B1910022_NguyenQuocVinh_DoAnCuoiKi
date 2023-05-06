<script>
import NavAdmin from '../components/NavAdmin.vue';
import OrderService from '../services/order.service';
export default{
    components:{
        NavAdmin,
    },

    data(){
        return{
            detailOrder: {},
            status_order: '',
            disableButton: false,
        }
    },

    created(){
        this.getDetailOrderByID()
    },

    methods:{
        async getDetailOrderByID(){
            try{
                this.detailOrder = await OrderService.getOrderById(this.$route.params.id);
                this.status_order = this.detailOrder.status;
                if(this.detailOrder.status == "Đã hủy"){
                    this.disableButton = true;
                }
                if(this.detailOrder.status == "Đã nhận hàng"){
                    this.disableButton = true;
                }
            }catch(error){
                alert("Có lỗi xảy ra khi lấy thông tin chi tiết đơn hàng");
            }
        },

        async updateStatusOrder(){
            if(confirm){
                try{   
                    const response = await OrderService.updateOrder({status: this.status_order}, this.detailOrder._id)
                    alert("Cập nhật trạng thái đơn hàng thành công");
                }catch(error){
                    alert('Có lỗi xảy ra khi cập nhật đơn hàng');
                }
            }
        },

        async cancelOrder(){
            const confirm = window.confirm("Bạn có chắc muốn hủy đơn hàng");
            if(confirm){
                try{
                    const response = await OrderService.cancelOrderById({
                        products: this.detailOrder.products,
                        status: "Đã hủy",
                    }, this.detailOrder._id);
                    this.disableButton = true;
                    alert("Đã hủy đơn hàng thành công");
                    this.getDetailOrderByID();
                }catch(error){
                    alert("Có lỗi xảy ra khi hủy đơn hàng");
                }
            }
        }
    }
}
</script>

<template>
    <NavAdmin />
    <div class="container-fluid">
        <div class="row">
            <div class="col-md-12 text-center" style="background-color: white;">
                <h4>Thông tin chi tiết của đơn hàng</h4>
                <hr>

                <p>Mã đơn hàng: {{detailOrder._id}}</p>
                <p>Tên người nhận: {{detailOrder.fullname }}</p>
                <p>Số điện thoại: {{detailOrder.phonenumber}}</p>
                <p>Email: {{ detailOrder.email }}</p>
                <p>Địa chỉ nhận: {{ detailOrder.address }}</p>
                <p>Tổng: {{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailOrder.total) }}</p>

                <p v-if="disableButton == true">Trạng thái: {{ detailOrder.status }}</p>
                <div v-else-if="disableButton == false">
                    <label for="input_status_order">Trạng thái:</label>
                    <select id="input_status_order" v-model="status_order">
                        <option value="Chưa xử lý">Chưa xử lý</option>
                        <option value="Đã xử lý">Đã xử lý</option>
                        <option value="Đang giao hàng">Đang giao hàng</option>
                        <option value="Đã nhận hàng">Đã nhận hàng</option>
                    </select>
                </div>

                <div class="mt-4">
                    <button :disabled="disableButton" @click="updateStatusOrder()" id="btn_update_order">Cập nhật</button>
                    <button :disabled="disableButton" @click="cancelOrder()" id="btn_cancel_order">Hủy đơn hàng</button>
                </div>

            </div>
        </div>

    </div>
</template>

<style scoped>
#nav_between_admin_page{
    background-color: white;
}

#btn_update_order{
    background-color: #1097cf;
    margin-right: 10px;
}

#btn_cancel_order{
    background-color: red;
}

#btn_cancel_order, #btn_update_order{
    border-radius: 5px;
}

#input_status_order{
    margin-left: 7px;
}
</style>