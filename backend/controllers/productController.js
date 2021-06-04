const ProductModel = require("../models/product");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const APIFeatures = require("../utils/apiFeatures");
//create new products
exports.newProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.create(req.body);
  res.status(201).json({
    success: true,
    product,
  });
});
//get all products => /api/v1/products
exports.getProducts = catchAsyncError(async (req, res, next) => {
  const resPerPage = 4;
  const productCount = await ProductModel.countDocuments();
  const apifeature = new APIFeatures(ProductModel.find(), req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apifeature.query;
  res.status(200).json({
    success: true,
    count: products.length,
    productCount,
    products,
  });
  next();
});
//get singel  product details => /api/v1/product/:id
exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }
  res.status(200).json({
    success: true,
    product,
  });
});
// update product  by => /api/v1/product/:id
exports.updateProduct = catchAsyncError(async (req, res, next) => {
  let product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  product = await ProductModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: true,
  });
  res.status(200).json({
    success: true,
    product,
  });
});

//delete product => /api/v1/admin/product/:id
exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await ProductModel.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  await product.remove();

  res.status(200).json({
    success: true,
    message: "Product is deleted",
  });
});
