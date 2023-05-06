<template>
    <header>
        <nav class="navbar navbar-expand">
          <div href="#" class="navbar-brand">
            <div class="logo">
              <img src="../assets/logo.png" style="width:125px; border-radius: 50%;">
            </div>
          </div>
          <div class="mr-auto navbar-nav title">
            <h5>Admin</h5>
          </div>
          <div class="navbar-nav">
            <li class="nav-item">
              <router-link to="/admin/product" class="nav-link item">
                <i class="fas fa-coffee"></i>
                Quản lí sản phẩm
              </router-link>
              <router-link
                to="/admin/order"
                class="nav-link item"
              >
              <i class="fa-solid fa-toilet-paper"></i>
                Quản lí đơn hàng
              </router-link>
              <router-link to="/admin/user" class="nav-link item">
                <i class="fas fa-user"></i>
                Quản lí tài khoản
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
  .{
    font-family: serif;
  }
  
  header {
    background: transparent;
    background-color: rgba(236, 222, 222, 0.5);
    position: fixed;
    width: 100%;
    height: 120px;
    top: 0;
    z-index: 999;
    border-bottom: 3px solid #fff;
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
    padding-right: 10px;
  }
  
  
  .title h5{
    color: #ff4500;
    font-size: 20px;
    font-family: serif;
  }
  
  </style>
  