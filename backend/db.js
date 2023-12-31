import mongoose from "mongoose";
import { mongoURI } from "./configuration/config.js";

const connectToMongo = () => {
    mongoose    
        .connect(mongoURI)
        .then(()=>{
            console.log("Connected to mongo");
        })
        .catch((error)=>{
            console.log(error);
        })
}
export default connectToMongo;