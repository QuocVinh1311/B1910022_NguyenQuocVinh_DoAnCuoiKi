<script>
import NavAdmin from '../components/NavAdmin.vue';
import AuthService from '../services/user.service';
export default{
    components:{
        NavAdmin,
    },

    data(){
        return{
            user_list: [],
        }
    },

    created(){
        this.getAccountList()
    },

    methods:{
        async getAccountList(){
            try{
                this.user_list = await AuthService.getAccountByEmail("all");
            }catch(error){
                alert("Có lỗi xảy ra khi lấy thông tin tài khoản");
            }
        },
        
        async deleteUserAccount(email){
            const confirm = window.confirm("Bạn có chắc muốn xóa tài khoản này?");
            if(confirm){
                try{
                    const account_deleted = await AuthService.deleteAccount(email);
                    alert(`Đã có ${account_deleted.deletedCount} tài khoản được xóa thành công`);
                    const UserLogin = JSON.parse(localStorage.getItem("UserLogin"));
                    if(UserLogin.email == email){
                        localStorage.removeItem("UserLogin");
                    }
                    this.getAccountList();                    
                }catch(error){
                    alert("Có lỗi xảy ra khi xóa tài khoản, vui lòng thử lại sau");
                }
            }
        }
    }
}
</script>
<template>
    <div class="container-fluid" style="">
        <div class="row">
            <div class="col-md-3" id="nav_between_admin_page">
                <NavAdmin></NavAdmin>
            </div>
            <div class="col-md-8 offset-md-1" style="background-color: white;padding: 17px;">
                <h4>Thông tin người dùng đã đăng ký tài khoản tại Shop</h4>
            </div>
        </div>
        <div class="row" style="background-color: white; margin-top: 20px;">

            <table style="" class="table table-striped table-bordered mt-3">
                <thead>
                    <tr>
                        <th scope="col">ID khách hàng</th>
                        <th scope="col">Họ và tên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Xóa Tài khoản</th>  
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in user_list">
                        <td>{{ user._id }}</td>
                        <td>{{ user.fullname }}</td>
                        <td>{{ user.email }}</td>
                        <td>{{ user.phonenumber }}</td>
                        <td><i class="fa-solid fa-trash" @click="deleteUserAccount(user.email)"></i></td>
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

.fa-trash{
    color: red;
    text-align: center;
    display: block;
    cursor: pointer;
}
</style>