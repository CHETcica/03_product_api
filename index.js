import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/product.js";
import dotenv from "dotenv"
import cors from "cors";

dotenv.config();

//Create server
const app = express();
 
//Use Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));
app.use(cors());
// Use Router
app.use("/api", productRouter);
 
const CONNECTION_URL = process.env.MONGODB_URL;
 
const PORT = process.env.PORT || 5000;
 
//Connect to MongDB
mongoose
  .connect(CONNECTION_URL,{ 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));
