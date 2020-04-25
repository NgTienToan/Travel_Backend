const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema(
    {
        fields: {
            name: {
                type: String,
                required: true
            },
            address: {
                type: String,
                required: true
            },
            slug: {
                type: String,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            size: {
                type: Number,
                required: true
            },
            capacity: {
                type: Number,
                required: true
            },
            pets: {
                type: Boolean,
                required: true
            },
            breakfast: {
                type: Boolean,
                required: true
            },
            featured: {
                type: Boolean,
                required: true
            },
            description: {
                type: String,
                required: true
            },
            extras: {
                type: [String],
                required: false,
            },
            image: {
                type: [String],
                required: false
            },
        },
        status: {
            type: String,
            required: true,
            default: "empty"
        },
        rentorID: {
            type: String,
            required: false,
            default: " "
        }
    }
)

const Room = mongoose.model('room', roomSchema);

module.exports = Room;

