import express from "express";
import cors from 'cors';
import dotenv  from 'dotenv';
import router from "./routes/routes.js";

dotenv.config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(router);


app.listen(process.env.PORT, ()=> console.log(`Server listening at ${process.env.PORT}`))

 console.log(process.env.PORT)

const port = process.env.PORT || 5000;
app.listen(port, console.log(`servidor iniciado na porta ${port}`))