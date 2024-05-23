const Product = require("../models/productModel");
const Errorhander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");

// create product -- admin

exports.createProduct = catchAsyncErrors(async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Product creation failed",
      error: error.message,
    });
  }
});

// Get all products --
exports.getAllProducts = catchAsyncErrors(async (req, res, next) => {
  try {
    const resultPerPage = 5;
    const productCount = await Product.productCount();
    const apifeatures = new ApiFeatures(Product.find(), req.query)
      .search()
      .filter()
      .pagination(resultPerPage);
    const products = await apifeatures.query;
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve products",
      error: error.message,
    });
  }
});


// get product details


exports.getProuductDetails = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new Errorhander("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    product,
    productCount
  });
});


// updataproduct --admin

exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    let product = await Product.findById(req.params.id);

    if (!product) {
      return next(new Errorhander("Product not found", 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    next(error);
  }
});

// Delete Product

exports.deleteProduct = catchAsyncErrors(async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      if (!product) {
        return next(new Errorhander("Product not found", 404));
      }
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
});
