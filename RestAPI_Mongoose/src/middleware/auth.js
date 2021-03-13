const jwt = require("jsonwebtoken")
const User = require("../models/user")
const auth = async (req, res, next) => {

    try {
        const token = req.header('Authorization').replace('Bearer','');
        console.log(token);
        const decoded=jwt.verify(token,'c4e10aa1ab2d6201eb24c640');
        const user = User.findOne({_id:jwt.decoded._id},'tokens.token',token)
        if(!user){
            throw new Error()
        }
        req.user=user
        next()
    } catch (error) {
        res.status(401).send({error:"Please authenticate. "});
    }
}

module.exports = auth