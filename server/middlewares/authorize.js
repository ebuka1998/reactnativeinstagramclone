require('dotenv').config()
const jwt = require('jsonwebtoken')

const authorize = (req, res, next) => {
    const secret = process.env.SECRET
    const token = req.header('auth-token')

    if(!token) {
        return res.status(401).send('you must be logged in')
    }

    try {
        const userInfo = jwt.verify(token, secret)
        req.user = userInfo
        //console.log(req.user)
        next()
    } catch (error) {
        return res.status(400).send('your token is invalid or has expired')
    }
}



module.exports = authorize