import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res, next) => {
    try {
        const products = await Product.find({});

        res.status(200).json({ success: true, data: products });
    } catch (error) {
        next(error);
    }
};

export const getProduct = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: true, message: "Inalid ID" });
    }
    try {
        const product = await Product.findById(id);

        if (!product) {
            const error = new Error("Product not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({ success: true, data: product });
    } catch (error) {
        next(error);
    }
};

export const createProduct = async (req, res, next) => {
    const product = req.body;

    if (!product.name || !product.price || !product.image) {
        const error = new Error("Please provide all fields");
        error.status(400);
        throw error;
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        next(error);
    }
};

export const updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const product = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: true, message: "Inalid ID" });
    }
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {
            new: true,
        });

        if (!updatedProduct) {
            const error = new Error("Product not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: updatedProduct,
            message: "Product Updated Successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: true, message: "Inalid ID" });
    }
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            const error = new Error("Product not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
