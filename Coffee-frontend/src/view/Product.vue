

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
            products: [],
            keyword_find_product: '',
            
        }
    },

    created(){
         this.getProduct()
    },

    methods: {
        async getProduct(){
            const response = await ProductService.getProduct();
            this.products = response;
        },
        searchProduct(){
            this.$router.push({ name: 'SearchProduct', query: { keyword: this.keyword_find_product }});
        },
    }

   
}
      

</script>

<template>
    <AppHeader />
        <div class="row">
                    <div class="form_search_product col-md-12">
                        <input type="text" placeholder="Tìm sản phẩm" class="input_search" v-model="keyword_find_product" @keyup.enter="searchProductByKeyword()">
                        <button class="search_btn"  @click="searchProduct()">
                            <i class="fas fa-search search_icon"></i>
                        </button>
                    </div>
        </div>
        <div class="title">
          <i class="fa-solid fa-store"></i>Sản Phẩm
        </div>
        
        <div class="scroll-menu container">
            <div v-for="product in products"  :key="product._id" class="product-container">
                <div class="product-card">
                    <div class="box-img" >
                        <router-link :to="{name: 'DetailProduct', params: {id: `${product._id}`}}" class="d-block text-center mt-3"> <img :src="product.imageURL" alt="" class="product-img"></router-link>
                       
                    </div>
                    <div class="box-content">
                        <router-link :to="{name: 'DetailProduct', params: {id: `${product._id}`}}" class="d-block text-center mt-3"><h3 class="product-name">{{ product.productname }}</h3></router-link>
                        <p class="product-price">{{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price)}}</p>
                         
                        <router-link :to="{name: 'DetailProduct', params: {id: `${product._id}`}}" class="d-block text-center mt-3">Xem chi tiết sản phẩm</router-link>
                        
                    </div>
                    
                </div>
            </div>

        </div>
        
        
    <AppFooter />
</template>


<style>
body{
  font-family: serif;
}

.form_search_product{
    margin-top: 40px ;
    display: inline-block;
    text-align: center;
    align-items: center;
}
.input_search{
    width: 70%;
    height:50px;
    border-radius:20px;
    border: 2px solid #ff4500;
}

.search_btn{
    background-color: #ff4500;
    width: 50px;
    height: 50px;
    border: none;
    border-radius: 50%;
    margin: 5px;
    transition: 0.2s;
}
.search_btn:hover{
    width: 60px;
    text-align: center;
}
.search_icon{
    color:#fff;
}

.title{
  margin: 20px auto 20px auto;
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

.product-img{
    width: 90%;
    height: 150px;
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
 h3, p{
    color: #202020;
 }

</style>