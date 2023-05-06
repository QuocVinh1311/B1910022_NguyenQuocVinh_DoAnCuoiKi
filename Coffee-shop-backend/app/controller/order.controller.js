const OrderModel = require("../models/order.model");
const ApiError = require("../../../Coffee-shop-backend/app/api-error");
const ProductModel = require("../models/product.model");


exports.createOrder = async(req, res, next) => {
    const Order = new OrderModel(req.body);
    try {
        const newOrder = await Order.save();

        const list_products_in_cart = req.body.products;

        for (let i = 0; i < list_products_in_cart.length; i++) {


            const infoProduct = await ProductModel.findById(list_products_in_cart[i]._id);

            const options = { returnDocument: "after" };
            const updateData = {

                amountinstock: infoProduct.amountinstock - list_products_in_cart[i].quantity,
            }

            const productUpdate = await ProductModel.findByIdAndUpdate(list_products_in_cart[i]._id, updateData, options);
        }
        return res.send(newOrder);
    } catch (error) {
        return next(new ApiError(500, "Không thể tạo đơn hàng!"));
    }
}


exports.getAllOrder = async(req, res, next) => {
    try {
        const order_list = await OrderModel.find();
        return res.send(order_list);
    } catch (error) {
        return next(new ApiError(500, "Không thể xem đơn hàng!"));
    }
}


exports.getOrderById = async(req, res, next) => {
    try {
        const detailOrder = await OrderModel.findById(req.params.id);
        return res.send(detailOrder);
    } catch (error) {
        return next(new ApiError(500, "Không thể lấy thông tin đơn hàng!"));
    }
}


exports.getOrderByEmail = async(req, res, next) => {
    try {
        const list_of_order_by_email = await OrderModel.find({ email: req.params.email });
        return res.send(list_of_order_by_email);
    } catch (error) {
        return next(new ApiError(500, "Không thể lấy thông tin đơn hàng!"));
    }
}

exports.updateOrder = async(req, res, next) => {
    try {
        const options = { returnDocument: "after" };
        const order_update = await OrderModel.findByIdAndUpdate(req.params.id, req.body, options);
        return res.send(order_update);
    } catch (error) {
        return next(new ApiError(500, "Cập nhập đơn hàng thất bại!"));
    }
}


exports.cancelOrder = async(req, res, next) => {
    try {
        const options = { returnDocument: "after" };
        const cancel_order = await OrderModel.findByIdAndUpdate(req.params.id, req.body, options);

        const list_of_product_in_order = req.body.products;
        for (let i = 0; i < list_of_product_in_order.length; i++) {
            const infoProduct = await ProductModel.findById(list_of_product_in_order[i]._id);
            const updateData = {
                amountinstock: infoProduct.amountinstock + list_of_product_in_order[i].quantity,
            }

            const productUpdate = await ProductModel.findByIdAndUpdate(list_of_product_in_order[i]._id, updateData, options);
        }

        return res.send(cancel_order);
    } catch (error) {
        return next(new ApiError(500, "Hủy đơn hàng thất bại!"));
    }
}