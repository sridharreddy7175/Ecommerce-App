const Product = require("../models/product");
const Cart = require("../models/Cart");
const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");

exports.getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err) {
                return res.status(400).json({
                    error: "Product not found",
                });
            }
            req.product = product;
            next();
        });
};

exports.createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image",
            });
        }
        //destructure the fields
        const { name, description, price, category, stock } = fields;

        if (!name || !description || !price || !category || !stock) {
            return res.status(400).json({
                error: "Please include all fields",
            });
        }

        let product = new Product(fields);

        //handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too big!",
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        // console.log(product);

        //save to the DB
        product.save((err, product) => {
            if (err) {
                res.status(400).json({
                    error: "Saving tshirt in DB failed",
                });
            }
            res.json(product);
        });
    });
};

exports.getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
};

//middleware
exports.photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
};

// delete controllers
exports.deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(400).json({
                error: "Failed to delete the product",
            });
        }
        res.json({
            message: "Deletion was a success",
            deletedProduct,
        });
    });
};

// delete controllers
exports.updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                error: "problem with image",
            });
        }

        //updation code
        let product = req.product;
        product = _.extend(product, fields);

        //handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: "File size too big!",
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }
        // console.log(product);

        //save to the DB
        product.save((err, product) => {
            if (err) {
                res.status(400).json({
                    error: "Updation of product failed",
                });
            }
            res.json(product);
        });
    });
};

//product listing

exports.getAllProducts = (req, res) => {
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, products) => {
            if (err) {
                return res.status(400).json({
                    error: "NO product FOUND",
                });
            }
            res.json(products);
        });
};

exports.getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                error: "NO category found",
            });
        }
        res.json(category);
    });
};

exports.updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map((prod) => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { stock: -prod.count, sold: +prod.count } },
            },
        };
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation failed",
            });
        }
        next();
    });
};

exports.getProductSearch = async (req, res) => {
    try {
        const findname = req.params.name;
        console.log("findName", findname);
        const objs = await Product.find({
            name: { $regex: ".*" + findname + ".*" },
        });
        console.log("objs", objs);
        res.json(objs);
    } catch (error) {
        res.json({ message: error });
    }
};

exports.productCart = async (req, res) => {
    // const id = req.body.id;
    // const pId = req.body.id;
    // console.log("Id", id, "Pid", pId)

    const { productId, quantity, name, price } = req.body;

    const userId = req.body.id; //TODO: the logged in user id
    console.log("userId", userId);

    try {
        let cart = await Cart.findOne({ userId });
        console.log("cart", cart);

        if (cart) {
            //cart exists for user
            let itemIndex = cart.products.findIndex((p) => p.productId == productId);
            console.log("itemInd", itemIndex);

            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.products[itemIndex];
                productItem.quantity = productItem.quantity + 1;
                productItem.price = price * productItem.quantity;
                cart.products[itemIndex] = productItem;
            } else {
                //product does not exists in cart, add new item
                cart.products.push({ productId, quantity, name, price });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            //no cart for user, create new cart
            const newCart = await Cart.create({
                userId,
                products: [{ productId, quantity, name, price }],
            });

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
    }
};

exports.getProductCart = (req, res) => {
    var userId = req.body.userId;
    // console.log("uEmail", userId);
    Cart.find({ userId: userId })
        .then((users) => {
            // console.log("user", users)
            res.status(200).send(users);
        })
        .catch((err) => {
            res.status(500).send(err);
        });
};

exports.getProductDelete = (req, res) => {
    console.log("hello");
    // var userId = req.body.userId;
    // var productId = req.body.productId
    var id = {
        userId: req.body.userId,
        // productId: req.body.productId,
    };
    console.log("id", id);

    // console.log("userId", userId, "productId", productId)

    Cart.deleteOne(
        { userId: req.body.userId })
        .then((posts) => {
            res.status(200).send(posts)
        })
        .catch((err) => {
            res.status(400).send(err)
        })
};
