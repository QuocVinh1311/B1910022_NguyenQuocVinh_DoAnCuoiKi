<script>
import AuthService from '../services/user.service';

export default{
    data(){
        return{
            email: '',
            password: '',
        }
    },
    methods: {
        async login(){
            try{
                const user = await AuthService.loginAccountUser({
                    email: this.email,
                    password: this.password,
                });

                //Lưu thông tin đăng nhập lên localStorage
                const UserLogin = {
                    _id: user._id,
                    fullname: user.fullname,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    phonenumber: user.phonenumber
                }
                localStorage.setItem('UserLogin', JSON.stringify(UserLogin));

                //Chuyển hướng qua trang chủ nếu tài khoản không phải admin
                if(user.isAdmin == false){
                    this.$router.push({ name: 'Home' });
                }else{
                   this.$router.push({ name: 'AdminProduct'});
                }
                
            }catch(error){
                alert("Đăng nhập thất bại, hãy thử lại");
            }
        },
    }
}


</script>

<template>

    <div class="main">
        <h3 class="text-center title_login">ĐĂNG NHẬP</h3>

        <div class="row">
            <div class="col-lg"></div>

            <form @submit.prevent="login()" class="col" id="form_login">
                <div class="logo">
                    <img src="../assets/logo.png" style="">
                </div>
                <div id="nav_form_login" class="row border-bottom">
                    <div class="col text-center nav_login border-end"><a style="color: black; pointer-events: none;">Đăng nhập</a></div>
                    <div class="col text-center nav_register"><router-link to="/register" id="switch_register">Đăng ký</router-link></div>
                </div>

                <div class="my-3">
                    <label for="exampleInputEmail1" class="form-label">Email</label>
                    <input type="email" name="email_login" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email" required>
                </div>

                <div class="mb-3">
                    <label for="exampleInputPassword1" class="form-label">Mật khẩu</label>
                    <input type="password" name="password_login" class="form-control" id="exampleInputPassword1" v-model="password" required>
                </div>

                <button type="submit" name="btn_login" class="btn d-block w-100">Đăng nhập</button>
                
            </form>

            <div class="col-lg"></div>
        </div>
    </div>


</template>

<style scoped>

.logo img{
    width: 50%; 
    align-items: center;
    margin: 20px 25%;
    text-align: center;
}

#form_login{
    padding: 20px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}

#nav_form_login{
    padding-bottom: 15px;
}

.nav_login_register a{
    text-decoration: none;
}

#switch_register{
    color: #999;
}

#switch_register:hover{
    color: #1097cf;
}

#note_login{
    text-align: center;
    color: black;
    margin-top: 20px;
}

.btn{
    padding: 10px 40px;
    background-color:#ff4500;
    color: #fff;
}

.btn:hover{
    background-color:#202020;
}
</style>