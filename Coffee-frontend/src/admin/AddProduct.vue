<script>
import ProductService from '../services/product.service';
import NavAdmin from '../components/NavAdmin.vue';
export default{
    components:{
        NavAdmin,
    },

    data(){
        return{
            // category_list: [], //danh sách tất cả các loại sản phẩm trong DB
            productname: '',
            price: 0,
            description: '',
            imageURL: '',
            amountinstock: 0,
        }
    },

    // created(){
    //     this.getAllProductCategory()
    // },

    methods:{
        // async getAllProductCategory(){ //hàm lấy danh sách tất cả các loại sản phẩm
        //     try{
        //         this.category_list = await ProductCategoryService.getAllProductCategory();
        //     }catch(error){
        //         alert("Có lỗi xảy ra khi lấy thông tin các loại sản phẩm");
        //     }
        // },

        async addNewProduct(){
            const confirm = window.confirm("Bạn có chắc muốn thêm sản phẩm này không?");
            if(confirm){
                try{
                    const price = parseInt(this.price);
                    const amountinstock = parseInt(this.amountinstock); 
                    const response = await ProductService.createProduct({
                        productname: this.productname,
                        price: price,
                        description: this.description,
                        imageURL: this.imageURL,
                        amountinstock: amountinstock,
                    });
                    alert("Thêm sản phẩm mới thành công");
                    this.$router.push({name: "AdminProduct"});
                }catch(error){
                    alert("Có lỗi xảy ra khi thêm sản phẩm");
                } 
            }
        },

        inputOnlyNumber(event){
            if(event.keyCode<48 || event.keyCode>57){
                event.preventDefault();
            }else{
                return true;
            }
        }
    }
}
</script>
<template>       
    <NavAdmin />
    <div class="container main">
        <div class="title">
                <i class="fa-solid fa-grid-2-plus"></i>Thêm Sản Phẩm
            </div>
        <div class="row ">
            <div class="col-12" id="contain_form_add_product">
                <form @submit.prevent="addNewProduct()">
                    <div class="mt-3">
                        <label for="input_productname" class="form-label">Nhập tên sản phẩm <span>*</span></label>
                        <input type="text" id="input_productname" class="form-control" required v-model="productname">
                    </div>
                    <div class="mt-3">
                        <label for="input_price" class="form-label">Giá <span>*</span></label>
                        <input type="text" id="input_price" class="form-control" required v-model="price" @keypress="inputOnlyNumber($event)">
                    </div>
                    

                    <div class="mt-3">
                        <label for="input_description">Mô tả sản phẩm <span>*</span></label>
                        <textarea class="form-control" id="input_description" rows="4" placeholder="Nhập thông tin mô tả cho sản phẩm" required v-model="description"></textarea>
                    </div>

                    <div class="mt-3">
                        <label for="input_imageURl" class="form-label">Link hình ảnh minh họa <span>*</span></label>
                        <input type="text" id="input_imageURl" class="form-control" required v-model="imageURL">
                    </div>

                    <div class="mt-3">
                        <label for="input_amountinstock" class="form-label">Số lượng trong kho<span>*</span></label>
                        <input type="text" id="input_amountinstock" class="form-control" required v-model="amountinstock" @keypress="inputOnlyNumber($event)"> 
                    </div>
                    <button class="mt-4" id="btn_add_product" type="submit">Thêm sản phẩm</button>
                </form>
            </div>
        </div>
    </div>
</template>

<style>
.main {
    margin: 120px auto;
    font-family: serif;
}

.title{
    text-align: center;
    font-size: 45px;
    color: #ff4500;
}
form span{
    color: red;
}
</style>