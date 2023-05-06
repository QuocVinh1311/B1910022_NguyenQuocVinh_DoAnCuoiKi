<template>
  <header>
      <nav class="navbar navbar-expand">
        <div href="#" class="navbar-brand">
          <div class="logo">
            <img src="../assets/logo.png" style="width:125px; border-radius: 50%;">
          </div>
        </div>
        <div class="mr-auto navbar-nav title">
          <h5>Hãy trở nên tỉnh táo<br>
          Bằng thức uống tươi mát</h5>
        </div>
        <div class="navbar-nav">
          <li class="nav-item">
            <router-link to="/home" class="nav-link item">
              <i class="fas fa-home"></i>
              Trang Chủ
            </router-link>
            <router-link
              to="/product"
              class="nav-link item"
            >
              <i class="fas fa-coffee"></i>
              Sản Phẩm
            </router-link>
            <router-link to="/shoppingcart" class="nav-link item">
              <i class="fas fa-cart-shopping"></i>
              Giỏ Hàng
            </router-link>
           
            <router-link
              to="/profile"
              class="nav-link item"
            >
              <i class="fas fa-user"></i>
              Tài Khoản
            </router-link>
            <router-link
              to="/"
              class="nav-link item"
              @click="handleLogout"
            >
            <i class="fa-solid fa-right-from-bracket"></i>
              Đăng xuất
             
            </router-link>
        
          </li>
        </div>
        
      </nav>

  </header>

 
  
</template>

<script>
export default {
  data() {
    return {
      carts: [],
      local_user: {
        role: "",
      },
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "LoginPage" });
    },
    handleLogout() {
      localStorage.removeItem("user_login");
      this.$router.push({ name: "LoginPage" });
    },
  },
  mounted() {
    const listLoalCart = JSON.parse(localStorage.getItem("cart") ?? "[]");
    this.carts = listLoalCart;
    const user = JSON.parse(localStorage.getItem("user_login"));
    console.log(user);
    this.local_user = user;
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Castoro+Titling&family=Dancing+Script&family=Instrument+Serif:ital@1&display=swap');

header {
  background: transparent;
  background-color: rgba(236, 222, 222, 0.5);
  position: fixed;
  width: 100%;
  height: 100px;
  top: 0;
  z-index: 999;
  border-bottom: 3px solid #202020;
}

.nav-link {
  float: left;
  font-size: 20px;
}

.item{
  color:#202020;
  font-size: 20px;
  font-family: serif;

}
.item:hover{
  color: #ff4500;
  font-size:20.5px;
  
}
i{
  color: #ff4500;
  padding-right: 10px;
}


.title h5{
  color: #202020;
  font-size: 20px;
  font-family: serif;
}

</style>
