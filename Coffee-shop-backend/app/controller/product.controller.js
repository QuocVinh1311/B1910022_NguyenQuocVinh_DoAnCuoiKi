const ProductModel = require("../models/product.model");
const ApiError = require("../api-error");

exports.createProduct = async(req, res, next) => {
    const productInfo = new ProductModel(req.body); //biến chưa thông tin sản phẩm từ req.body
    try {
        const newProduct = await productInfo.save();
        return res.send(newProduct); //Không cần return cũng được
    } catch (err) {
        // return res.status(501).send(err);
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin sản phẩm"));
    }
}

exports.findProduct = async(req, res, next) => {
    try {
        const list_product = await ProductModel.find();
        return res.send(list_product);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin sản phẩm"));
    }
}


exports.findDetailProduct = async(req, res, next) => {
    try {
        const id_of_product = req.params.id;
        const detail_of_product = await ProductModel.findById(id_of_product);
        return res.send(detail_of_product);
    } catch {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin sản phẩm"));
    }
}


exports.searchProduct = async(req, res, next) => {
    try {
        const keyword = req.query.keyword;
        const list_of_product = await ProductModel.find({ productname: { $regex: `${keyword}`, $options: 'i' } });
        return res.send(list_of_product);
    } catch {
        return next(new ApiError(500, "Có lỗi xảy ra khi lấy thông tin sản phẩm"));
    }
}

exports.updateProduct = async(req, res, next) => {
    try {
        const updateDoc = req.body;
        const options = { returnDocument: "after" };
        const update = await ProductModel.findByIdAndUpdate(req.params.id, updateDoc, options);
        return res.send(update);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi cập nhật thông tin sản phẩm"));
    }
}

exports.deleteProduct = async(req, res, next) => {
    try {

        const options = { returnDocument: "after" };
        const deleteP = await ProductModel.findByIdAndDelete(req.params.id, options);
        return res.send(deleteP);
    } catch (error) {
        return next(new ApiError(500, "Có lỗi xảy ra khi xóa sản phẩm"));
    }
}