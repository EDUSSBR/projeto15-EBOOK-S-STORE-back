import { ObjectId } from "mongodb";
import { db } from "../db/database.js"

export async function order(req, res){
    const {name, email ,cart, paymentForm, total} = req.body
    if (!name|| !email ||!cart|| !paymentForm|| !total) return res.sendStatus(400)
    try {
        const newCart = cart.map((o)=>({_id: new ObjectId(o.id)}))
        let products = await db.collection("products").find({$or: newCart }).limit(50).toArray();
        products = products.filter((o, i)=>o.stockQuantity>=cart[i].quantity)
        if(cart.length !== products.length) return res.sendStatus(400)
        await db.collection("order").insertOne({name, email ,cart, paymentForm, total})
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}