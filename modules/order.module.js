const mongoose = require('mongoose');
const { Schema } = mongoose;


const OrderSchema = new Schema({
    items: [{
        code: {
            type: String,
            required: true
        },
        massa: {
            type: Number,
            required: true
        }
    }],
    cost: {
        type: Number,
        require: true
    },
    time: {
        type: Number,
        default: new Date().getTime()
    }
});


const Order = mongoose.model("Order", OrderSchema)



module.exports = Order 
