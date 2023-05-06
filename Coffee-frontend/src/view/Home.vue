<template>
  <div>
    <AppHeader />
  </div>
  <title>Trang chủ</title>
  <body>
    <section>
    
      <div class="banner">
        <div class="box-left">
          <h1>Tominus Coffee</h1>
          <h5>Thương hiệu nổi tiếng được nhiều người tin dùng.</h5>
          <button> 
            <router-link
                to="/product"
                class="nav-link to-product"
              >
              Mua hàng ngay
          </router-link> </button>
        </div>
        <div class="box-right">
          <img src="../assets/banner.jpg" alt="">
        </div>
      </div>

    
    </section>
   
    <section>
      <div class="home-title">
          <i class="fa-solid fa-store"></i>Hệ thống cửa hàng
        </div>
        
      <div class="system">
        
        <div class="system-shop">
          <div class="container text-center">
              <div class="row">
                <div class="col">
                  <h2>Miền Bắc</h2>
                    <p>Hà Nội</p>
                    <p>Hải Phòng</p>
                    <p>Yên Bái</p>
            
                </div>
                <div class="col">
                  <h2>Miền Trung</h2>
              
                    <p>Thanh Hóa</p>
                    <p>Vinh</p>
                    <p>Nghệ An</p>
                    <p>Quảng Trị</p>
                    <p>Quảng Bình</p>
    
                </div>
                <div class="col">
                  <h2>Miền Nam</h2>
      
                    <p>TP.HCM</p>
                    <p>Cần Thơ</p>
                    <p>Sóc Trăng</p>
                    <p>Bạc Liêu</p>
                    <p>An Giang</p>
                    <p>Vĩnh Long</p>
         
                </div>
              </div>
            </div>
        </div>
        <div class="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1682140307345!5m2!1svi!2s" width="100%" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>

      <div class="contact">
        <div class="home-title">
          <i class="fa-solid fa-phone"></i>Liên hệ cửa hàng
        </div>
        <div class="container contact-mess" data-aos="fade-up"> 
        <div class="row mt-5">
          <div class="col-lg-4">
            <div class="info">
              <div class="address">
                <i class="bi bi-geo-alt"></i>
                <h4>Địa Chỉ:</h4>
                <p>NVC nối dài, Ninh Kieu, Can Tho</p>
              </div>
 
              <div class="open-hours">
                <i class="bi bi-clock"></i>
                <h4>Giờ Mở cửa:</h4>
                <p>
                  08:00 AM - 22:00 PM
                </p>
              </div>

              <div class="email">
                <i class="bi bi-envelope"></i>
                <h4>Email:</h4>
                <p>vinhb1910022@student.ctu.edu.vn</p>
              </div>

              <div class="phone">
                <i class="bi bi-phone"></i>
                <h4>Liên hệ tôi:</h4>
                <p>02223030929</p>
              </div>

            </div>
          </div>

          <div class="col-lg-8 mt-5 mt-lg-0">
            <form method="post" action="" class="email-form">
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Nhập vào tên của bạn..." required>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" class="form-control" name="email" id="email" placeholder="ví dụ: 123@gmail.com" required>
                </div>
              </div>
              <div class="form-group mt-3">
                <textarea class="form-control" name="message" rows="8" placeholder="Nội dung phản hồi..." required></textarea>
              </div>
              <hr>
              <div class="text-center send-contact"><a name="send" class="button">Gửi Liên Hệ</a></div>
            </form>

          </div>

        </div>

      </div>
      </div>
    
    </section>
     
  </body>
  <div>\
    <AppFooter></AppFooter>
  </div>
</template>

<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";

export default {
  components: {
    AppHeader,
    AppFooter,
  },

};

</script>

<style scoped>
body{
  font-family: serif;
}
.banner{
  display: grid;
  grid-template-columns:50% 50%;
  margin-top: 150px ;
  width: 100%;
  height: 500px;
  background-size: cover; 
}
.box-left{
  margin-top: 20%;
  width:100%;
  padding: 20px;
  align-items: center;
  text-align: center; 
}
.box-left h1{
  color: #ff4500;
}
.box-left h5{
  color: #202020;
}
.box-right img{
  border-radius: 15px;
  width: 90%;
  height: 450px;
  margin: auto;
  box-shadow: 10px 10px 10px	#877373;
}
.box-left button{
  border:none;
  padding: 0 40px;
  border-radius:30px;
  background: #ff4500;
  align-items: center;
  text-align: center;
  transition: 1s;
  box-shadow: 10px 10px 10px	#877373;
}

.to-product{
  color:#fff;
}

.box-left button:hover{
  color: #fff;
  padding: 0 70px;
  background: #ff4500;
}
.home-title{
  margin: 40px auto;
  padding: 10px auto;
  text-align: center;
  font-size: 30px;
  color: #202020;
  border-bottom: 3px solid #202020;

}


.home-title i{
  color:#ff4500;
}
.system-shop h2{
  text-align: center;
  color:#ff4500;
  font-family: serif;
}
.system-shop li{
  list-style: none;
  text-align: center;
  font-size: 25px;
  margin-top:10px;
  color: #2F4F4F;
  border-radius:20px;

}


.system-shop li:hover{
  background-color: #ff4500;
  color: #fff;
}

.map{
  border-top: 3px solid #202020;
}


</style>
