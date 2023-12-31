import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
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
        requires: true
    },

    category: {
        type: String,
        required: true
    }
},
    {
        timestamps: true
    }
);

const Item = mongoose.model('Item', itemSchema)

export default Item;
