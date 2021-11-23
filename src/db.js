import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/utube");

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (err) => console.log("❌ DB ERROR", err);

db.once("open", handleOpen);
db.on("err", handleError);
