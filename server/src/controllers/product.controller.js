const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllProducts = async (req, res) => {
    try {
        const { categoryId } = req.query;
        const where = categoryId ? { categoryId } : {};
        const products = await prisma.product.findMany({
            where,
            include: { category: true },
        });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
};

exports.getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await prisma.product.findUnique({
            where: { id },
            include: { category: true },
        });
        if (!product) return res.status(404).json({ message: 'Product not found' });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
};

exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, image, stock, categoryId } = req.body;
        const product = await prisma.product.create({
            data: {
                name,
                description,
                price,
                image,
                stock: parseInt(stock),
                categoryId,
            },
        });
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error creating product', error: error.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        if (data.stock) data.stock = parseInt(data.stock);

        const product = await prisma.product.update({
            where: { id },
            data,
        });
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: 'Error updating product', error: error.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.product.delete({ where: { id } });
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting product', error: error.message });
    }
};
