const express = require("express");
const router = express.Router();

const {
    getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories,
    getProductSearch,
    productCart,
    getProductCart,
    getProductDelete
} = require("../controllers/product");
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all of actual routes
//create route
router.post(
    "/product/create/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    createProduct
);

// read routes
router.get("/product/:productId", getProduct);
router.get("/product/photo/:productId", photo);

//delete route
router.delete(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    deleteProduct
);

//update route
router.put(
    "/product/:productId/:userId",
    isSignedIn,
    isAuthenticated,
    isAdmin,
    updateProduct
);

//Search ProductName

router.get("/getproduct/:name", getProductSearch);

//listing route
router.get("/products", getAllProducts);

router.get("/products/categories", getAllUniqueCategories);

router.post("/product/cart", productCart)
router.post("/getproduct/cart", getProductCart)
router.post("/getproductdelete", getProductDelete)


module.exports = router;
