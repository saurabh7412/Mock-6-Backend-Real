
const jwt = require('jsonwebtoken');


const Auth = async (req,res,next)=>{
    try {

        const token = req.headers.authorization;

        if(!token){
            return res.status(400).send('Login First !')
        }

        jwt.verify(token, '123', function (err, decoded){
            if(err){
                return res.status(400).send('Invalid Token Login Again !')
            }

            req.userInfo = decoded
            next()
        })

        
        
    } catch (error) {
        return res.status(500).send(error)
    }

}

module.exports = Auth

