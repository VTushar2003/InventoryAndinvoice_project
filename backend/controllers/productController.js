const asyncHandler = require('express-async-handler');
const Product = require('../model/productModule');
const { fileSizeFormatter } = require('../utils/fileUpload');
//    Create a new product
//    POST /api/products/add
//creating product
const createProduct = asyncHandler(async (req, res) => {
  const { productId , name, category, quantity, price, description, supplier } = req.body;

//validation
  if ( !productId || !name || !category || !quantity || !price || !description) {
    res.status(400);
    throw new Error('please fill all required fields');
  }

//handle image upload
  
let fileData = {};
if (req.file) {
  fileData = {
    fileName: req.file.originalname,
    fileType: req.file.mimetype,
    fileSize: fileSizeFormatter(req.file.size, 2), // 2mb file size
  };
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
    image : fileData,
  });
//creating product 
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);


  res.send('files uploaded successfuly')
});

//getting product data from the database alongwith image

const gettingData = asyncHandler(async(req,res)=>{
  const product = await Product.findOne({productId : req.params.productId});
  // if product doesnt exist
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  res.status(200).json(product);
});


//getting all the products from the inventory
const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ user: req.user.id }).sort("-createdAt");
  if(!products){
    res.status(404);
    throw new Error('products not found')
  }else{
    res.status(200).json(products);
  }
});
//delete existing product
const deleteProduct = asyncHandler(async(req,res)=>{
  const product = await Product.findById(req.params.id);
  //check product is exist or not
  if(!product){
    res.status(400);
    throw new Errow('Product not Found')
  }
  //check if product is exist so delete it
  if(product.user.toString() !== req.user.id){
    res.status(401);
    throw new Error("user not Authorized");
  }
  await product.deleteOne()
  res.status(200).json({message : 'product removed successful'});
});

//update existing inventory
const updateProduct = asyncHandler(async(req,res)=>{
  const { name, category, quantity, price, description,supplier } = req.body;
  const { id } = req.params;

  const product = await Product.findById(id);

  //checking product exist or not
  if(!product){
    res.status(404);
    throw new Error('product not found');
  }
  //matching product with its user Id 
  if (product.user.toString() !== req.user.id){
    res.status(401);
    throw new Error('user not Authorized')
  }

  let fileData = {};
  if (req.file) {
    fileData = {
      fileName: req.body.name,
      fileType: req.file.mimetype,
      fileSize: fileSizeFormatter(req.file.size, 2), // 2mb file size
    };
  }

//update product details
const productUpdated = await Product.findByIdAndUpdate(
  {_id: id},
  {
    name,
    category,
    quantity,
    price,
    description,
    supplier,
    image: Object.keys(fileData).length === 0 ? product?.image : fileData,
  },
  {
    new : true,
    runValidators : true,
  }
);
res.status(200).json(productUpdated)

})
module.exports = { createProduct , gettingData ,getAllProducts , updateProduct,deleteProduct};
