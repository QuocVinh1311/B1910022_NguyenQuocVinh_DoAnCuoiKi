
<script>
import AppHeader from "../components/AppHeader.vue";
import AppFooter from "../components/AppFooter.vue";
import ProductService from "../services/product.service";

export default{
    components:{
        AppHeader,
        AppFooter,
    },
    data() {
        return {
            detailproducts: {},
            quantity: 1,
        }
    },

    created(){
         this.getDetailProduct();
    },

    methods: {
        async getDetailProduct() {
                const response = await ProductService.getDetailProduct(this.$route.params.id);
                this.detailproducts = response;
        
        },
        QuantityAdd(){
                const cart = JSON.parse(localStorage.getItem("Cart"));
                if(cart == null || cart.length == 0){
                    return this.detailproducts.amountinstock;
                }
                let isExistInCart = false;
                if(cart != null){
                    for(let i = 0; i < cart.length; i++){
                        if(cart[i]._id == this.detailproducts._id){
                            isExistInCart = true;
                            return this.detailproducts.amountinstock-cart[i].quantity;
                        }
                    }
                    if(isExistInCart == false){
                        return this.detailproducts.amountinstock;
                    }
                }  
            },

        addtoCart(){
                let cart = [];
                if(JSON.parse(localStorage.getItem("Cart")) == null){
                    cart.push({
                        '_id': this.detailproducts._id,
                        'productname': this.detailproducts.productname,
                        'price': this.detailproducts.price,
                        'quantity': this.quantity,
                        'max_quantity': this.detailproducts.amountinstock,
                    });
                }else{
                    cart = JSON.parse(localStorage.getItem("Cart"));
                    let state_of_existence_of_product = false;
                    for(let i = 0; i < cart.length; i++){
                        if(cart[i]._id == this.detailproducts._id){
                            state_of_existence_of_product = true;
                            cart[i].quantity +=this.quantity;
                            break;
                        }
                    }
                    if(state_of_existence_of_product == false){
                        cart.push({
                            '_id': this.detailproducts._id,
                            'productname': this.detailproducts.productname,
                            'price': this.detailproducts.price,
                            'quantity': this.quantity,
                            'max_quantity': this.detailproducts.amountinstock,
                        });
                    }
                }
                localStorage.setItem("Cart", JSON.stringify(cart));
                alert("Thêm sản phẩm vào giỏ hàng thành công!");
                this.$router.push({ name: 'ShoppingCart' });
            }
    }

   
}
      

</script>

<template>
    <AppHeader />
                <div class="product-card">
                    <div class="box-img" >
                        <img :src="detailproducts.imageURL" alt="" class="detailproduct-img">
                    </div>
                    <div class="box-content">
                        <h3 class="product-name">{{ detailproducts.productname }}</h3>
                        <p>{{ detailproducts.description }}</p>
                        <p class="product-price">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(detailproducts.price)}}</p>
                        <p>Số sản phẩm còn lại: {{ detailproducts.amountinstock }}</p>
                        <button @click="addtoCart()" :disabled="QuantityAdd()==0" id="btn_add_into_cart" name="btn_add_into_cart" class="btn">Thêm vào giỏ hàng</button>
                        
                    </div>
                    
                </div>
     


        
        
    <AppFooter />
</template>


<style>
body{
  font-family: serif;
}

.home-title{
  margin: 140px auto 20px auto;
  padding: 10px auto;
  text-align: center;
  font-size: 30px;
  color: #202020;

}
 
.scroll-menu{
    margin: 0px auto;
    width:100%;
    height:500px;
    padding: 20px;
    overflow-x:hidden;
    border-radius: 10px;
    overflow-y:auto;
    -ms-overflow-style: none; 
    scrollbar-width: none; 
    overflow-y: scroll; 
    box-shadow: 10px 10px 10px	#877373;
}
.scroll-menu::-webkit-scrollbar {
  display: none;
}
.product-container{
    margin:40px 40px;
    display: grid;
    grid-template-columns: auto;
    padding: 10px;
    border-radius: 10px;
    background-color: #F0F0F0;
    box-shadow: 10px 10px 10px #888888;
}


.product-card{
    padding: 10px;
    display: grid;
    grid-template-columns: 30% 60%;

}

.detailproduct-img{
    width: 90%;
    height: 300px;
    margin-left: 5%;
    border-radius: 10px;
    box-shadow: 4px 4px 4px #888888;
}

.product-img:hover{
    width: 92%;
    margin-left: 4%;
    
}
.product-price{
    font-size: 30px;
    font-weight: 700;
    color:#202020;
}

.box-content{
    align-items: center;
    text-align: center;
}
.box-content button{
    color: #fff;
    background: #ff4500;
    padding: 10px 40px;
    border: none;
    border-radius: 30px ;
    transition: 0.5s;
    text-decoration: none;
    box-shadow: 10px 10px 10px	#877373;
 }

 .box-content button:hover{
    color: #fff;
    padding: 10px 70px;
 }
 .box-content p{
    margin: 20px auto;
    font-size: 20px;
    color: #2F4F4F;
 }

</style>