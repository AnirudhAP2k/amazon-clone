import express from 'express';
import { body, validationResult } from 'express-validator';
import User from '../models/User.js'
import { JWT_SECRET_KEY } from '../config.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fetchUser from '../middleware/fetchUser.js';

const authRouter = express.Router();
let success = false;

//Route 1 : Creating User using POST method
authRouter.post('/createuser', [
    body('name', 'Enter a valid Name').isLength({ min: 3 }),
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Enter a strong password of atleast 5 characters').isLength({ min: 5 }),
    body('role', 'Enter a valid role : Admin or Customer').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({success, error: errors })
    }

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send({success, error: "Email already exists" });
        }

        if (req.body.role !== "Admin" && req.body.role !== "Customer") {
            return res.status(400).send({success, error: "Enter a valid role : Admin or Customer" })
        }

        const salt = await bcrypt.genSalt();
        const secPass = await bcrypt.hash(req.body.password, salt);

        const newUser = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            role: req.body.role
        });
        success = true;
        return res.status(200).send(success, newUser);
    } catch (error) {
        console.log(error);
        return res.status(400).send({success, error: "Internal Server Error" });
    }
});

//Route 2 : Creating User LogIn using POST method
authRouter.post('/login', [
    body('email', 'Enter a valid E-mail').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send({success, error: errors });
    }

    try {
        const { email, password } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({success, error: "Please login with correct credentials" });
        }

        const passCompare = bcrypt.compare(password, user.password);
        if (!passCompare) {
            return res.status(400).send({success, error: "Please login with correct credentials" });
        }

        const data = user.id;
        let authToken = jwt.sign(data, JWT_SECRET_KEY);
        success = true;
        return res.status(200).json({
            success,
            authToken
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({success, error: "Internal Server Error" });
    }
});

//Router 3 : Get user using GET method
authRouter.get('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user;
        console.log(req.user);
        const user = await User.findById(userId).select("-password");
        success = true;
        return res.status(200).json({success, user });
    } catch (error) {
        console.log(error);
        return res.status(400).send({success, error: "Internal Server Error" });
    }
});

export default authRouter;