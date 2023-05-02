import { ObjectId } from "mongodb"
import { db } from "../db/database.js"

export async function order(req, res){
    const {name, email ,cart, paymentForm, total} = req.body
    try {
        await db.collection("order").insertOne({name, email ,cart, paymentForm, total})
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getOrder(req, res){
    try{
        const {isAdmin} = req;
        const { id } = req;
        let orders;
        if(isAdmin){
            orders = await db.collection("order").find().toArray()
            console.log("Pedidos encontrados:", orders);
        }else{
            orders = await db.collection("order").find({ _id: new ObjectId(id) }).toArray()
        }
        return res.send(orders)
    } catch (err) {
        res.status(500).send(err.message)
    }
}