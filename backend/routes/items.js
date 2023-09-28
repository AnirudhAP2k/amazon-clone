import express from 'express';
// import Item from "../models/Items";
import { body, validationResult } from 'express-validator';
import fetchUser from '../middleware/fetchUser.js';
import User from '../models/User.js';
import Item from '../models/Items.js';
import wishList from '../models/wishlistItems.js';

const itemRouter = express.Router();

//Route 1 : Add a new item using POST method
itemRouter.post('/additem', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min: 2 }),
    body('description', 'Enter a valid description of atleast 5 characters').isLength({ min: 5 }),
    body('price', 'Enter a valid price').isNumeric(),
    body('category', 'Enter a valid category').isLength({min: 1})
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(errors);
    }
    try {
        const userId = req.user;
        const user = await User.findById(userId);
        if (user.role === "Customer") {
            return res.status(400).send({ error: "Not Allowed" });
        }

        const newItem = await Item.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category
        });
        return res.status(200).send({ newItem});
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Internal Server Error" });
    }
});

//Route 2 : Get all items using GET method
itemRouter.get('/getallitems', async (req, res) => {
    try {
        const items = await Item.find();
        return res.status(200).json({ items})
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Internal Server Error"});
    }
});

//Route 3 : Update an item using PUT method
itemRouter.put('/updateitem/:id', fetchUser, [
    body('title', 'Enter a valid title').isLength({ min : 2}),
    body('description', 'Enter a valid description').isLength({ min : 5}),
    body('price', 'Enter a valid price').isNumeric(),
    body('category', 'Enter a valid category').isLength({min: 1})
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).send(errors);
    }
    try {
        const { title, description, price, category } = req.body;
        if(
            !title &&
            !description &&
            !price &&
            !category 
        ){
            return res.status(400).send({ error: "Please enter the field and value to be updated"});
        }
        const userId = req.user;
        const user = await User.findById(userId);
        if (user.role === "Customer") {
            return res.status(400).send({ error: "Not Allowed" });
        }

        const itemId = req.params.id;
        const item = await Item.findByIdAndUpdate(itemId, req.body);
        if(item){
            return res.status(200).send({ msg: "Item Updated Successfully"});
        } else{
            return res.status(400).send({ error: "Item Not Found"});
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Internal Server Error"});
    }
});

//Route 4 : Delete an item using DELETE method
itemRouter.delete('/deleteitem/:id', fetchUser, async(req, res) => {
    try {
        const userId = req.user;
        const user = await User.findById(userId);
        if (user.role === "Customer") {
            return res.status(400).send({ error: "Not Allowed" });
        }
    
    const itemId = req.params.id;
    const result = await Item.findByIdAndDelete(itemId);
    if(result){
        return res.status(200).send( "Item Deleted Successfully");
    } else{
        return res.status(400).send({ error: "Item Not Found"});
    }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Internal Server Error"});
    }
});

//Route 4 : Add a item of a user in the wishlist using POST method
itemRouter.post('/addwishlist/:id', fetchUser, async (req, res) => {
    try {
        const itemId = req.params.id;
        let existingItem = null;
        existingItem = await wishList.find({item: itemId});
        if(existingItem.length){
            return res.status(400).send({error: "Item already in the List"});
        }

        const { title, description, price, category } = await Item.findById(itemId);
        const items = await wishList.create({
            item: itemId,
            user: req.user,
            title: title,
            description: description,
            price: price,
            category: category
        });
        return res.status(200).json({items})
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Internal Server Error"});
    }
});

//Route 5 : Get all items of a user from the wishlist using GET method
itemRouter.get('/getwishlist', fetchUser, async (req, res) => {
    try {
        const items = await wishList.find({user: req.user});
        if(items.length){
            return res.status(200).json({items: items})
        }else{
            return res.status(200).send({error: "No Item to display", items: items})
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Internal Server Error"});
    }
});

//Route 6 : Delete an item from wishlist using DELETE method
itemRouter.delete('/wishlistdeleteitem/:id', async(req, res) => {
    try {
    const itemId = req.params.id;
    const result = await wishList.findByIdAndDelete(itemId);
    if(result){
        return res.status(200).send({ msg: "Item Deleted Successfully"});
    } else{
        return res.status(400).send({ error: "Item Not Found"});
    }
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Internal Server Error"});
    }
});

//Route 7 : Get a item using GET method
itemRouter.get('/getitem/:id', async (req, res) => {
    try {
        const itemId = req.params.id;
        const items = await Item.findById(itemId);
        return res.status(200).json({ items})
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Internal Server Error"});
    }
});

export default itemRouter;