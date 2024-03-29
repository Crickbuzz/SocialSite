const User = require('../../../models/user');
const jwt = require('jsonwebtoken');
const env = require('../../../config/environment');


module.exports.createSession = async function(req, res){
    try{
        let user = await User.findOne({email: req.body.email});

        if(!user || user.password != req.body.password){
            return res.status(422).json({
                message: "Invalid username/password"
            });
        }

        return res.status(200).json({
            message: 'Sign in successful',
            data: {
                token: jwt.sign(user.toJSON(),env.jwt_secret,{expiresIn: '10000'})
            }
        }) 
    }catch(err){
        console.log('********', err);
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}