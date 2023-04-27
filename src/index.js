import express from "express";
import cors from 'cors';
import dotenv  from 'dotenv';
import productsRouter from "./routes/product.routes.js";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(productsRouter);


app.listen(process.env.PORT, ()=> console.log(`Server listening at ${process.env.PORT}`));