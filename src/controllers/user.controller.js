import { db } from "../db/database.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import {v4 as uuid} from "uuid"
import { ObjectId } from "mongodb";

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
        if(!pass){
            return res.status(401).send("Senha não confere")
        }
        const configuracoes = { expiresIn: 60*60*24 }
        const dados = User;
        delete dados.password
        const chaveSecreta = process.env.JWT_SECRET;
        const token = jwt.sign(dados, chaveSecreta, configuracoes);
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
        const chaveSecreta = process.env.JWT_SECRET;
       const dados = jwt.verify(token, chaveSecreta)
       const userInformations = await db.collection("users").findOne({_id:new ObjectId(dados._id)})
       delete userInformations._id
       res.send(userInformations).status(200)
    }catch(err){
        res.status(500).send(err.message)
    }
}

