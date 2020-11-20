const User = require ("../models/User.model");
const jwt = require ("jsonwebtoken");
const bcrypt = require ("bcrypt");

class loginController {
    static signIn (req,res){
        User.findOne({username: req.body.username})
        .populate("roles", "-__v")
        .populate("districts")
        .exec((err,user)=>{
            if(err){
                res.status(500).json({message:err});
                return;
            }
            if(!user){return res.status(404).json({ message: "Kombinasi username dan password tidak ditemukan" });}

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if(!passwordIsValid){
                res.status(401).json({access_token:null, message:"Kombinasi username dan password tidak ditemukan"});
            }

            var token = jwt.sign({id: user.id}, "Assignment4", {expiresIn:86400});
            var authorities = [];
            var districts = [];

            for (let i = 0; i < user.roles.length; i++){
                for(let j = 0; j < user.districts.length; j++){
                    districts.push(user.districts[j].district_name);
                }
                authorities.push(user.roles[i].role_name);
            }

            res.status(200).json({
                id: user._id,
                username: user.username,
                email: user.email,
                age: user.age,
                phone: user.phone,
                roles: authorities,
                access_token: token,
                districts: districts
            });
        });
    }
}

module.exports = loginController;