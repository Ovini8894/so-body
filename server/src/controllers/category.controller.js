const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories', error: error.message });
    }
};

exports.createCategory = async (req, res) => {
    try {
        const { name, icon, color } = req.body;
        const category = await prisma.category.create({
            data: { name, icon, color },
        });
        res.status(201).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error creating category', error: error.message });
    }
};

exports.updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, icon, color } = req.body;
        const category = await prisma.category.update({
            where: { id },
            data: { name, icon, color },
        });
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error updating category', error: error.message });
    }
};

exports.deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        await prisma.category.delete({ where: { id } });
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting category', error: error.message });
    }
};
