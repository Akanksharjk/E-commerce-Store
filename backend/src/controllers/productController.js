import ProductModel from "../models/Product.model.js"

export const getProduct = async (req, res) => {
    try {
        let product = await ProductModel.find()
            .sort({ createdAt: -1 })
        res.json(product)
    } catch (error) {

        console.error('Get Products Error:', error.message)
        res.status(500).json({
            message: 'Failed to fetch products',
            error: error.message
        })
    }
}

export const getProductById = async (req, res) => {
    try {
        let product = await ProductModel.findById(req.params.id)
        if (!product) {
            return res.status(404).json({
                message: 'Product not found'
            })
        }
        res.json(product)
    } catch (error) {

        console.error("Product Detail Error",
            error.message
        )

        res.status(500).json({
            message: 'Failed to fetch product detail',
            error: error.message
        })
    }
}

export const seedProduct = async (req, res) => {
    try {
        let sampleProducts = [
            {
                title: 'Wireless Gaming Headphones',
                description: 'Immersive surround sound with low latency wireless connection.',
                price: 89.99,
                imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
                category: 'Electronis'
            },
            {
                title: "Mimimalist Mechanical Keyboard",
                description: 'Tactile mechanical switches with customizable RGB backlighting.',
                price: 119.50,
                imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500',
                category: 'Electronics'
            },
            {
                title: 'Ergonomic Smart Watch',
                description: 'Track fitness metrics, heart rate, and notifications seamlessly',
                price: 149.00,
                imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
                category: 'Wearables'
            }
        ]
        await ProductModel.deleteMany({})
        const createProducts = await ProductModel.insertMany(sampleProducts)
        res.status(201).json({
            message: 'Products seeded successfully',
            products: createProducts
        })

    } catch (error) {
        console.error('Seed Error:', error.message)
        res.status(500).json({
            message: 'Failed to seed products',
            error: error.message
        })
    }
}