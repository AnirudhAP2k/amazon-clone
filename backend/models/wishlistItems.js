import mongoose from "mongoose";

const wishlistItemsSchema = mongoose.Schema({
    
    item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },

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
})

const wishList = mongoose.model('wishList', wishlistItemsSchema);

export default wishList;