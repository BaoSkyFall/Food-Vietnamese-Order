import express from 'express';
import { getMessaging } from 'firebase-admin/messaging';
import Order from '../models/Order.js';
import { formatPrice } from '../utils/priceUtils.js';
const router = express.Router();

// Get orders list with filters
router.get('/', async(req, res) => {
    try {
        const {
            startDate,
            endDate,
            status,
            search,
            page = 1,
            limit = 10
        } = req.query;

        let query = {};

        // Add filters to query
        if (startDate && endDate) {
            query.createdAt = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (status) {
            query.status = status;
        }

        if (search) {
            query.$or = [
                { 'customerInfo.name': { $regex: search, $options: 'i' } },
                { 'customerInfo.phone': { $regex: search, $options: 'i' } },
                { orderNumber: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (page - 1) * limit;

        // Changed sort order to get newest data first
        const orders = await Order.find(query)
            .sort({ orderDate: -1 }) // -1 means descending order (newest first)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await Order.countDocuments(query);

        res.json({
            orders,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get order details
router.get('/:id', async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Create new order
router.post('/', async(req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();

        // Send notification to admin app
        const message = {
            notification: {
                title: 'New Order Received',
                body: `New order from ${order.customerInfo.name} - ${formatPrice(order.total)}₫`
            },
            topic: 'admin-notifications'
        };

        await getMessaging().send(message);

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update order status
router.patch('/:id/status', async(req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByIdAndUpdate(
            id, { status }, { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        // Send notification to customer app
        const message = {
            notification: {
                title: 'Order Status Updated',
                body: `Your order is now ${status}`
            },
            topic: `order-${id}`
        };

        await getMessaging().send(message);

        res.json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Add note to order
router.post('/:id/notes', async(req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const order = await Order.findByIdAndUpdate(
            id, {
                $push: {
                    notes: {
                        text,
                        createdAt: new Date()
                    }
                }
            }, { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get order notes
router.get('/:id/notes', async(req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.json(order.notes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete order note
router.delete('/:id/notes/:noteId', async(req, res) => {
    try {
        const { id, noteId } = req.params;

        const order = await Order.findByIdAndUpdate(
            id, {
                $pull: {
                    notes: { _id: noteId }
                }
            }, { new: true }
        );

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default router;