const express = require("express");
const {protect} = require('../middleWare/authMiddleWare');
const { createProduct, gettingData, getAllProducts, updateProduct, deleteProduct, UploadImage} = require("../controllers/productController");
const { upload } = require("../utils/fileUpload");
const productRouter = express.Router();

productRouter.post('/',protect,upload,createProduct);
productRouter.put('/:productId',protect,upload,updateProduct);
productRouter.get('/',protect,getAllProducts);
productRouter.get('/:productId',protect,gettingData);
productRouter.delete('/deleteProduct/:productId',protect,deleteProduct);

module.exports = productRouter;