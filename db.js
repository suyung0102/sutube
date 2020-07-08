import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(
    process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }
);

const db= mongoose.connection;

// 한번만 실행, once
const handleOpen = () =>console.log("Connected to DB");
const handleError = (error) =>console.log(`ERROR to DB:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);