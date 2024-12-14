import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const orderSchema = new mongoose.Schema({
    customerInfo: {
        name: { type: String, required: true },
        phone: { type: String, required: true },
        address: { type: String, required: true },
        note: String
    },
    items: [{
        id: Number,
        name: String,
        price: String,
        quantity: Number
    }],
    total: Number,
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'delivered'],
        default: 'pending'
    },
    orderDate: { type: Date, default: Date.now },
    notes: [noteSchema]
});

export default mongoose.model('Order', orderSchema);