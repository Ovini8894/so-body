const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.createOrder = async (req, res) => {
    try {
        const { customerName, customerEmail, customerPhone, items, userId } = req.body;

        // Calculate total
        let total = 0;
        for (const item of items) {
            const product = await prisma.product.findUnique({ where: { id: item.productId } });
            if (!product) return res.status(400).json({ message: `Product ${item.productId} not found` });
            total += Number(product.price) * item.quantity;
        }

        const order = await prisma.order.create({
            data: {
                customerName,
                customerEmail,
                customerPhone,
                total,
                userId: userId || null,
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }
            },
            include: { items: true }
        });

        res.status(201).json(order);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating order', error: error.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching orders', error: error.message });
    }
};

exports.getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await prisma.order.findUnique({
            where: { id },
            include: { items: { include: { product: true } } }
        });
        if (!order) return res.status(404).json({ message: 'Order not found' });
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching order', error: error.message });
    }
};

exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.userId;
        const orders = await prisma.order.findMany({
            where: { userId },
            include: { items: { include: { product: true } } },
            orderBy: { createdAt: 'desc' }
        });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user orders', error: error.message });
    }
};
