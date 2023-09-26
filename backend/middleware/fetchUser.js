import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../config.js';

const fetchUser = (req, res, next) => {
    //Get user using auth token

    const token = req.header("auth-token");
    if (!token) {
        return res.status(400).send({ error: "Invalid Token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        req.user = data;
        next();
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: "Invalid token" });
    }
}

export default fetchUser;