<script>
import AuthService from "../services/user.service";
export default{
    data(){
        return{
            fullname: '',
            phonenumber: '',
            _id: ''
        }
    },

    created(){
        this.getUserInfo()
    },

    methods:{
        getUserInfo(){
            const userInfo = JSON.parse(localStorage.getItem("UserLogin"));
            this.fullname = userInfo.fullname;
            this.phonenumber = userInfo.phonenumber;
            this._id = userInfo._id;
        },

        async changeUserProfile(){

            const confirm = window.confirm('Bạn có chắc muốn thay đổi thông tin tài khoản chứ?');
            if(confirm){
                try{
                    const response = await AuthService.updateUserProfile({
                        fullname: this.fullname,
                        phonenumber: this.phonenumber,
                    },this._id);

                    //Cập nhật lại thông tin lên localStorage
                    const userLogin = {
                        _id: response._id,
                        fullname: response.fullname,
                        email: response.email,
                        isAdmin: response.isAdmin,
                        phonenumber: response.phonenumber
                    }
                    localStorage.setItem('UserLogin', JSON.stringify(userLogin));
                    alert('Cập nhật thông tin người dùng thành công');
                    this.getUserInfo();
                }catch(error){
                    alert("Có lỗi xảy ra khi cập nhật thông tin người dùng, vui long thử lại");
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
                <h3 style="color: #ff4500">Thay đổi thông tin người dùng</h3>
                <form @submit.prevent="changeUserProfile()">
                    <div class="mb-3">
                        <label for="input_fullname" class="form-label">Họ tên:</label>
                        <input type="text" class="form-control" id="input_fullname" v-model="fullname">
                    </div>
                    <div class="mb-3">
                        <label for="input_phonenumber" class="form-label">Số điện thoại</label>
                        <input type="text" class="form-control" id="input_phonenumber" v-model="phonenumber">
                    </div>
                    <button type="submit" class="btn">Cập nhật</button>
                </form>
            </div>
        </div>
    </div>

</template>

<style scoped>
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