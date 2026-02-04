import express from "express"
import mongoose from "mongoose"
import cors from "mongoose"
import dotenv from "dotenv"

dotenv.config();
const app = express();
app.use(cors())
app.use(express.json())
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
app.listen(5000, () => console.log("Server running on port 5000"));

