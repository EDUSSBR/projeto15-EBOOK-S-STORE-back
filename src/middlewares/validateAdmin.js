export function validateAdmin(req, res, next) {
    const { isAdmin } = req
    if (isAdmin) {
        next()
    }
    else {
        return res.status(401).send("Não autorizado")
    }
}