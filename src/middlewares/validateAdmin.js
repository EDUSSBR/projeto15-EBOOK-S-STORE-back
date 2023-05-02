export function validateAdmin(req,res,next){
    const isAdmin = req.isAdmin
    if(isAdmin){
        next()
    }
    else{
        return res.send("Não autorizado").status(401)
    }
}