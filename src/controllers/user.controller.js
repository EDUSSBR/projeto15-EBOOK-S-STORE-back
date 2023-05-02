import { db } from "../db/database.js";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { ObjectId } from "mongodb";
import { validateAdmin } from "../middlewares/validateAdmin.js";

export async function signUp(req,res){
    const {name, email, password} = req.body
    try{
        
        const sameUser = await db.collection("users").findOne({email})
        if(sameUser){
            return res.status(409).send("Email já cadastrado")
        }
        const pass = bcrypt.hashSync(password, 10)
        await db.collection("users").insertOne({name, email, password:pass})
        res.sendStatus(201)
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
        res.send({token, name: User.name, email: User.email, admin:User.isAdmin})
    }catch(err){
        res.status(500).send(err.message)
    }
}

export async function getUser(req,res){
    const { authorization } = req.headers
    const token = authorization?.replace("Bearer ", "")
    if (!token) {
        res.send("Não autorizado").status(401)
    }
    try {
        const chaveSecreta = process.env.JWT_SECRET;
        const dados = jwt.verify(token, chaveSecreta)
        const session = await db.collection("sessions").find({ $and: [{ token }, { userId: new ObjectId(dados._id) }] })
        if (session) {
            const userInformations = await db.collection("users").findOne({ _id: new ObjectId(dados._id) })
            if(userInformations){
                res.send(userInformations)
            }

        }
    } catch (err) {
        res.status(500).send(err.message)
    }
}