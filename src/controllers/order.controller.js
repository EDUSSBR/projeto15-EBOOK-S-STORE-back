import { db } from "../db/database.js"

export async function order(req, res){
    const {name, email ,cart, paymentForm, total} = req.body
    console.log(name)
    try {
        await db.collection("order").insertOne({name, email ,cart, paymentForm, total})
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getOrder(req, res){
    try{
        const orders = await db.collection("order").find().toArray()
        console.log("Pedidos encontrados:", orders);
        return res.send(orders)
    } catch (err) {
        res.status(500).send(err.message)
    }
}