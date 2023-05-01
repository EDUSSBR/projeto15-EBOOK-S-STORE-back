import { db } from "../db/database.js";
import { ObjectId } from "mongodb";


//adicionar middleware de admin
export async function createProductController(req, res) {
    try {
        const { name, price, description, stockQuantity, category, imageUrl } = req.body;
        const created = await db.collection("products").insertOne({ name, price, description, stockQuantity, category, imageUrl });
        if (created.acknowledged) {
            res.sendStatus(201);
        } else {
            console.log("Connection to db failed.");
            throw "";
        }
    } catch (e) {
        res.sendStatus(400);
    }
};

export async function getProductController(req, res) {
    try {
        const products = await db.collection("products").find().limit(50).toArray();
        res.send(products);
    } catch (e) {
        console.log("Connection to db failed.");
        res.sendStatus(400);
    }
};

export async function getProductForId(req, res) {
    const id = req.params.id
    try {
        const product = await db.collection("products").findOne({ _id: new ObjectId(id) });
        console.log(product)
        if(!product){
            return res.sendStatus(404);
        }
        return res.status(200).send(product);
    } catch (e) {
        console.log("Connection to db failed.");
        res.sendStatus(400);
    }
}

export async function deleteProductForId(req, res){
    const id = req.params.id;
    try {
        const product = await db.collection("products").deleteOne({ _id: new ObjectId(id) });
        if(product.deletedCount === 0){
            return res.sendStatus(404);
        }
        return res.status(200).send("Produto deletado com sucesso");
    } catch (e) {
        console.log("Connection to db failed.");
        res.sendStatus(400);
    }
}

export async function putProductForId(req, res){
    const id = req.params.id;
    const { name, price, description, stockQuantity, category, imageUrl } = req.body;
    const productEd = { name, price, description, stockQuantity, category, imageUrl };
    try{
        const product = await db.collection("products").updateOne({ _id: new ObjectId(id) }, { $set: productEd});
        if(product.matchedCount === 0){
            return res.sendStatus(404)
        }
        res.sendStatus(200);
    }catch (e) {
        console.log("Connection to db failed.");
        res.sendStatus(400);
    }
    
}