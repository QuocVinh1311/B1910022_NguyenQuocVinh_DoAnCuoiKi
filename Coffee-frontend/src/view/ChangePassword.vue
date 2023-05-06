<script>
import AuthService from "../services/user.service";
export default{
    data(){
        return{
            _id: '',
            current_password: '',
            new_password: '',
        }
    },

    created(){
        this.getUserInfo()
    },

    methods:{
        getUserInfo(){
            const userInfo = JSON.parse(localStorage.getItem("UserLogin"));
            this._id = userInfo._id;
        },

        async changePassword(){
            const confirm = window.confirm("Bạn có chắc muốn đổi mật khẩu?");
            if(confirm){
                try{
                    const response = await AuthService.updatePassword({
                        current_password: this.current_password,
                        new_password: this.new_password
                    }, this._id);
                    alert('Cập nhật mật khẩu thành công');
                }catch(error){
                    alert("Mật khẩu hiện tại bạn nhập không đúng, vui lòng thử lại");
                }
            }
        }
    },
}    
</script>
<template>
  
    <div class="container">
        <div class="row">
            <div class="col-md-12" id="form_change_userprofile">
                <button class="btn"><router-link to="/profile" class="back">Quay lại</router-link></button>
                <h3 style="color: #ff4500">Đổi mật khẩu tài khoản</h3>
                <form @submit.prevent="changePassword()">
                    <div class="mb-3">
                        <label for="input_current_password" class="form-label">Mật khẩu hiện tại:</label>
                        <input type="password" class="form-control" id="input_current_password" v-model="current_password" required>
                    </div>
                    <div class="mb-3">
                        <label for="input_newpassword" class="form-label">Mật khẩu mới:</label>
                        <input type="password" class="form-control" id="input_newpassword" v-model="new_password" required>
                    </div>
                    <button type="submit" class="btn">Đổi mật khẩu</button>
                </form>
            </div>    
        </div>
    </div>
</template>

<style soped>
.btn{
    padding: 5px 20px;
    background-color: #ff4500;
    color: #fff;
    transition: 0.2s;
}
.btn:hover{
    padding: 5px 30px;
    color: #fff;
}

.back{
    margin: 20px auto;
    color:#fff;
    text-decoration: none;
}
</style>