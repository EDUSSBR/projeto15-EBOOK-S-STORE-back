import { db } from "../db/database.js";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"

export async function signUp(req,res){
    const {name, email, password} = req.body
    try{
        
        const sameUser = await db.collection("users").findOne({email})
        if(sameUser){
            return res.status(409).send("Email já cadastrado")
        }
        const pass = bcrypt.hashSync(password, 10)
        await db.collection("users").insertOne({name, email, password:pass})
        res.send(201)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function login(req,res){
    const {email, password} = req.body
    
    try{
        const User = await db.collection("users").findOne({email})
        
        if(!User){
            return res.status(404).send("Email não cadastrado")
        }
         
        const pass = bcrypt.compareSync(password, User.password)
        console.log(pass)
        if(!pass){
            return res.status(401).send("Senha não confere")
        }
        const token = uuid()
        await db.collection("sessions").insertOne({userId:User._id, token})
        res.send(token)
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function token(req,res){
    const {authorization} = req.headers
    const token = authorization?.replace("Bearer ", "")
    
    try{
       const user = await db.collection("sessions").findOne({token})
       
       if(!user){
        return res.send(false).status(401)
       }
       const userInformations = await db.collection("users").findOne({_id:user.userId})
       
       delete userInformations.password
       delete userInformations._id
       res.send(userInformations).status(200)
    }catch(err){
        res.status(500).send(err.message)
    }
}