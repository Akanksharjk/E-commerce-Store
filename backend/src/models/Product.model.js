import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: 'Generel'
    },
    stock: {
        type: Number,
        default: 10
    }
}, {
    timestamps: true
})

const ProductModel = mongoose.model("product", productSchema)
export default ProductModel