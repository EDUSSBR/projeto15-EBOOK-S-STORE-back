import { db } from "../db/database.js"
import { ObjectId } from "mongodb";
import { sendEmail } from "../helpers/email.js"


export async function order(req, res){
    const {name, email ,cart, paymentForm, total} = req.body
    if (!name|| !email ||!cart|| !paymentForm|| !total) return res.sendStatus(400)

    try {
        const newCart = cart.map((o)=>({_id: new ObjectId(o.id)}))
        let products = await db.collection("products").find({$or: newCart }).limit(50).toArray();
        products = products.filter((o, i)=>o.stockQuantity>=cart[i].quantity)
        if(cart.length !== products.length) return res.sendStatus(400)
        const resp = await db.collection("order").insertOne({name, email ,cart, paymentForm, total})
        console.log(resp)
        await sendEmail(name, email ,cart, paymentForm)
        res.sendStatus(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}

export async function getOrder(req, res){
    try{
        const {isAdmin} = req;
        const { email } = req;
        let orders;
        
        if(isAdmin){
            orders = await db.collection("order").find().toArray()
            console.log("Pedidos encontrados:", orders);
        }else{
            orders = await db.collection("order").find({ email: email }).toArray()
        }
        console.log(orders)
        return res.send(orders)
    } catch (err) {
        res.status(500).send(err.message)
    }
}
