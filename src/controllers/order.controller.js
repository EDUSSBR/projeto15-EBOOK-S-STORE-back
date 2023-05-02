import { db } from "../db/database.js"
import { sendEmail } from "../helpers/email.js"

export async function order(req, res){
    const {name, email ,cart, paymentForm, total, id} = req.body
    console.log(name)
    try {
        await db.collection("order").insertOne({name, email ,cart, paymentForm, total})
        await sendEmail(name, email ,cart, paymentForm, id)
        res.send(200)
    } catch (err) {
        res.status(500).send(err.message)
    }
}