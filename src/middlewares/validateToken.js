import jwt from 'jsonwebtoken';
import { db } from '../db/database.js';
import { ObjectId } from "mongodb";
export async function validateToken(req,res, next){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    if(!token){
        res.send("Não autorizado").status(401)
    }
    try{
        const chaveSecreta = process.env.JWT_SECRET;
       const dados = jwt.verify(token, chaveSecreta)
       const session = await db.collection("sessions").findOne({$and :[{token}, {userId:new ObjectId(dados._id)}]})
       if (session){
        
        
        const userInformations = await db.collection("users").findOne({_id:new ObjectId(dados._id)})
        if(userInformations.isAdmin){
            req.isAdmin = userInformations.isAdmin
        }
        delete userInformations._id
        next()
       }
       
       
    }catch(err){
        res.status(500).send(err.message)
    }
}