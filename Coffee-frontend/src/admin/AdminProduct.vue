<script>
import NavAdmin from '../components/NavAdmin.vue';
import ProductService from '../services/product.service';
// import OrderService from '../services/order.service';
export default{
    components:{
        NavAdmin,
    },

    data(){
        return{
            product_list: [], //danh sách các sản phẩm có trong database
            // keyword_to_find_product: '',
            // all_order: [], //mảng tất cả các đơn hàng
            // array_of_products_sold: [],
        }
    },

    created(){
        this.getAllProduct()
    },

    methods:{
        async getAllProduct(){
            try{
                //Lấy tất cả sản phẩm hiện có trong DB
                const response = await ProductService.getProduct();
                this.product_list = response;

                //Tạo mảng mới, mảng các object chứa 2 thuộc tính: _id của sản phẩm và số lượng đã bán
                // this.product_list.forEach((value) => {
                //     this.array_of_products_sold.push({
                //         _id: value._id,
                //         quantity_sold: 0
                //     })
                // });
                //Lấy tất cả đơn hàng để chạy vòng lặp lấy ra số lượng sản phẩm đã bán
                // this.all_order = await OrderService.getAllOrderInDB();
                // for(let i = 0; i < this.all_order.length; i++){
                //     if(this.all_order[i].status == "Đã nhận hàng"){
                //         this.all_order[i].products.forEach((value) => {
                //             for(let j = 0; j < this.array_of_products_sold.length; j++){
                //                 if(value._id == this.array_of_products_sold[j]._id){
                //                     this.array_of_products_sold[j].quantity_sold+=value.quantity;
                //                 }
                //             }
                //         },)
                //     }
                // }
            }catch(error){
                alert("Đã xảy ra lỗi khi lấy thông tin sản phẩm");
            }
        },

        async deleteProduct(id){
            const confirm = window.confirm("Bạn có chắc muốn xóa sản phẩm!");
            if(confirm){
                try{

                    await ProductService.deleteProduct(id);
                    alert("Xóa sản phẩm thành công!");
                    this.$router.push({name: "AdminProduct"});
                }catch(error){
                    alert("Có lỗi xảy ra khi xóa sản phẩm");
                    this.$router.push({name: "AdminProduct"});
                } 

            }
               
        },

        // getQuantitySold(_id){
        //     for(let i = 0; i< this.array_of_products_sold.length; i++){
        //         if(this.array_of_products_sold[i]._id == _id){
        //             return this.array_of_products_sold[i].quantity_sold;
        //         }
        //     }
        // },

        // searchProductByKeyword(){
        //     this.$router.push({ name: 'AdminSearchProduct', query: { keyword: this.keyword_to_find_product }});
        // }

    }

}
</script>
<template>
    <NavAdmin />
    <div class="container-fluid" style="padding: 20px; margin-top: 120px;">
    <h1>Quản lí sản phẩm</h1>
            <router-link to="/admin/addproduct"  class="button">
                Thêm sản phẩm
            </router-link>
        <div class="row" style="background-color: white; margin-top: 20px;">
            <!-- <div class="mt-3 text-center">
                <label style="margin-right: 10px;" for="input_product_name">Nhập tên sản phẩm muốn tìm</label>
                <input type="text" id="input_product_name" v-model="keyword_to_find_product" @keyup.enter="searchProductByKeyword()">
                <i class="fa-solid fa-magnifying-glass" id="icon_search" @click="searchProductByKeyword()"></i>
            </div> -->
            <table class="table  mt-3">
                <thead>
                    <tr>
                        <!-- <th scope="col">ID</th> -->
                        <th scope="col">Tên sản phẩm</th>
                        <th scope="col">Giá</th>
                        <th scope="col">Hình ảnh</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Số lượng trong kho</th>
                        <th scope="col">Số lượng đã bán</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in product_list" :key="product._id">
                        <td>{{ product.productname }}</td>
                        <!-- <td>{{ product._id }}</td> -->
                        <!-- <td> <router-link :to="{name: 'UpdateProduct', params: {id: `${product._id}`}}">{{ product.productname }}</router-link></td> -->
                        <td>{{ new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(product.price) }}</td>
                        <td><img :src="product.imageURL">  </td>
                        <td>{{ product.description }}</td>
                        <td>{{ product.status }}</td>
                        <td>{{ product.amountinstock }}</td>
                        <td></td>
                        <td><router-link :to="{name: 'EditProduct', params: {id:`${product._id}`}}" class="edit-button">Sửa</router-link><br/>
                            <button id="btn_delete_product" class="delete-button"  @click="deleteProduct(product._id)">Xóa</button>
                        </td>
                       
                        <!-- <td>{{ getQuantitySold(product._id) }}</td> -->
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<style>

h1{
    text-align: center;
}
img {
    width:100px;
    height: 100px;
}
th, td{
    align-items: center;
    text-align: center;
}
.edit-button {
    font-size: 18px;
    margin: 20px auto;
    background-color: #202020;
    padding: 5px 20px;
    color: #fff;
    box-shadow: 5px 5px 5px #3d3935;
    border-radius: 20px;
    transition: 0.1s;
    border: none;
}

.edit-button:hover {
    padding: 6px 20px;
    text-decoration: none;
    color: #fff;
}
.delete-button {
    margin-top: 20px;
    font-size: 15px;
    background-color: #ff4500;
    padding: 5px 20px;
    color: #fff;
    box-shadow: 5px 5px 5px #3d3935;
    border-radius: 20px;
    transition: 0.1s;
    border: none;
}

.delete-button:hover {
    padding: 6px 20px;
    text-decoration: none;
    color: #fff;
}
</style>