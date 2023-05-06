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
            status: '',
            amountinstock: 0,
        }
    },

    created(){
         this.getDetailProduct()
    },

    methods:{
        async getDetailProduct(){
            this.detailproduct = await ProductService.getDetailProduct(this.$route.params.id);
            this.productname = this.detailproduct.productname;
            this.price = this.detailproduct.price;
            this.description = this.detailproduct.description;
            this.imageURL = this.detailproduct.imageURL;
            this.status = this.detailproduct.status;
            this.amountinstock = this.detailproduct.amountinstock;
        },
        async updateProduct(){
            const confirm = window.confirm("Bạn muốn cập nhật sản phẩm này?");
            if(confirm){
                try{
                    const price = parseInt(this.price);
                    const amountinstock = parseInt(this.amountinstock); 
                    const response = await ProductService.updateProduct({
                        productname: this.productname,
                        price: price,
                        description: this.description,
                        imageURL: this.imageURL,
                        status: this.status,
                        amountinstock: amountinstock,
                    }, this.$route.params.id);
                    alert("Cập nhật sản phẩm thành công");
                    this.$router.push({name: "AdminProduct"});
                }catch(error){
                    alert("Có lỗi xảy ra khi cập nhật sản phẩm");
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
                <i class="fa-solid fa-grid-2-plus"></i>Cập nhật sản phẩm
            </div>
        <div class="row ">
            <div class="col-12" id="contain_form_add_product">
                <form @submit.prevent="updateProduct()">
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
                        <label for="input_status">Trạng thái <span>*</span></label>
                        <textarea class="form-control" id="input_status" rows="4" placeholder="Nhập thông tin mô tả cho sản phẩm" required v-model="status"></textarea>
                    </div>

                    <div class="mt-3">
                        <label for="input_imageURl" class="form-label">Link hình ảnh minh họa <span>*</span></label>
                        <input type="text" id="input_imageURl" class="form-control" required v-model="imageURL">
                    </div>

                    <div class="mt-3">
                        <label for="input_amountinstock" class="form-label">Số lượng trong kho<span>*</span></label>
                        <input type="text" id="input_amountinstock" class="form-control" required v-model="amountinstock" @keypress="inputOnlyNumber($event)"> 
                    </div>
                    <button class="mt-4 button" id="btn_update_product" type="submit">Cập nhật sản phẩm</button>
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