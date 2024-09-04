import mongoose from "mongoose";

const connectToMongo = async () => {
    await mongoose    
        .connect(process.env.mongoURI)
        .then(()=>{
            console.log("Connected to mongo");
        })
        .catch((error)=>{
            console.log(error);
        })
}
export default connectToMongo;