<template>
    
  <footer class="footer">
    <div class="footer-top">
      <div class="footer-left">
        <div class="footer-info">
          <h2 class="title-footer">Tominus Coffee</h2>
          <ul class="footer-list">
            <li class="">
              <i class="fa-solid fa-phone" style="color: #fff; font-size:20px;"></i>
              <a class="">Đặt hàng: 0772124823</a>
            </li>
            <li class="">
              <i class="fa-brands fa-square-facebook" style="color: #fff; font-size: 20px;"></i>
              <a class="">Facebook</a>
            </li>
            <li class="">
              <i class="fa-brands fa-instagram" style="color: #fff; font-size: 20px;"></i>
              <a class="">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
        <div class="logo-footer">
            <img src="../assets/logo.png">
        </div>
     
    </div>
    <hr/>
    <div class="footer-mid"> 
      
          <h4>Công ty cổ phần thương mại dịch vụ Tominus</h4>
          <p>Mã số DN: 0772124823 do sở kế hoạch và đầu tư tp. HCM cấp ngày 23/07/2014. Người đại diện: NGUYỄN QUỐC VINH</p>
          <p>Địa chỉ: NVC, An Khánh, Ninh Kiều, Cần Thơ  Điện thoại: (077) 2124 823   Email: vinhb1910022@student.ctu.edu.vn</p>
    </div>
    <div class="footer__bottom">
      <div class="grid">
        <div class="grid__row">
          <p class="footer__text">
            &copy; 2023 - Bản quyền thuộc về Tominus Shop
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style>

.footer{
  background-color:#202020;
}

.footer-top {
    display: grid;
    grid-template-columns: auto auto;
    padding: 20px;
    border-top: 4px solid #ccc;
}

.title-footer {
    font-size: 1.4rem;
    text-transform: uppercase;
    color: #ff4500;
}
.footer-info{
  margin-left: 100px;
}
.footer-list { 
    padding-left: 0;
    list-style: none;
    
}

.footer-list li{
  margin: 10px auto;
}

.footer-list a{
  text-decoration: none;
  color: #fff;
  font-size: 15px;
}
.footer-mid {
    align-items: center;
    text-align: center;
    background-color: #202020;
    border-top: 4px solid #ccc;
}
.footer-mid h4{
  color: #ff4500;
}

.footer-mid p{
  color: #fff;
  font-size: 15px;
}
.footer__bottom {
    padding: 20px auto;
    background-color: #fff;
    margin-top: 36px;
}

.logo-footer img{
  width:200px;
  margin-left: 650px;
}

.footer__text {
    display: block;
    margin: auto;
    text-align: center;
    font-size: 1.2rem;
    color: #202020;
}
</style>