const asyncHandler = require("express-async-handler");
const Product = require("../model/productModule");
const { fileSizeFormatter } = require("../utils/fileUpload");
const path = require("path");
const fs = require("fs");
//creating product
const createProduct = asyncHandler(async (req, res) => {
  const { productId, name, category, quantity, price, description, supplier } =
    req.body;

  //validation
  if (!productId || !name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error("please fill all required fields");
  }

  //handling product data
  const product = await Product.create({
    user: req.user._id, //authenticate using middleWare
    productId,
    name,
    category,
    quantity,
    price,
    description,
    supplier,
    image: req.file.filename,
  });
  //creating product
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

//getting product data from the database alongwith image

const gettingData = asyncHandler(async (req, res) => {
  const product = await Product.findOne({
    productId: req.params.productId,
  }).populate({ path: "user", select: "name" });
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});

//getting all the products from the inventory
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort("-createdAt");
  if (!products) {
    res.status(404);
    throw new Error("products not found");
  } else {
    res.status(200).json(products);
  }
});
//delete existing product
// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ productId: req.params.productId }); // Use an object to specify the query

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  await product.deleteOne();
  res.status(200).json({ message: "Product deleted." });
});

//update inventory
const updateProduct = asyncHandler(async (req, res) => {
  const { name, category, quantity, price, description, supplier } = req.body;

  // Find the product by its productId
  const product = await Product.findOne({ productId: req.params.productId });


  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }


  const updatedProductData = {
    name,
    category,
    quantity,
    price,
    description,
    supplier,
  };


  if (req.file) {
    console.log(product);
    // Delete old image if it exists
    if (product.image && fs.existsSync(path.join(__dirname, "../upload", product.image))) {
      fs.unlinkSync(path.join(__dirname, "../upload", product.image));
    }
    updatedProductData.image = req.file.filename;
  } else {
    updatedProductData.image = product.image;
  }


  const productUpdated = await Product.findOneAndUpdate(
    { productId: req.params.productId }, // Filter to find the correct product
    updatedProductData,
    {
      new: true,
      runValidators: true,
    }
  );
  console.log('updated',product);
  // Return the updated product
  res.status(200).json(productUpdated);
});
module.exports = {
  createProduct,
  gettingData,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
