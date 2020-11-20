const User = require ("../models/User.model");
const Role = require ("../models/Role.model");
const District = require ("../models/District.model");
const bcrypt = require ("bcrypt");


class pesertaController{
    static signUpPeserta (req,res,next){
        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            age: req.body.age,
            phone: req.body.phone
        });
        user.save((err, user) => {
            if (err) {res.status(500).send({ message: err });return;}
        
            if(req.body.roles && req.body.districts){
                Role.findOne({role_name: "peserta"})
                .then(role=>{
                    user.roles = [role._id];
                });
                District.find({district_name:{$in:req.body.districts}})
                .then(district=>{
                    user.districts = district.map(district=>district._id);
                    user.save()
                    .then(user=>{
                        res.status(201).json({ message: "peserta berhasil mendaftar", user });
                    })
                })
                .catch(next);
            }
             
        
        });
    }

    static updatePeserta (req,res,next){
        const {userId} = req.params;
        const {username, email, password, age, phone} = req.body;
        const updatedData =  {username, email, password, age, phone}
        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }
        User.findByIdAndUpdate(userId, updatedData, {new:true})
        .then((peserta)=>{
            res.status(200).json({message:'Berhasil mengupdate data peserta', updated:peserta});
        })
        .catch(next);
    }

    static getPeserta (req,res,next){
        const {userId} = req.params;
        User.findById(userId)
        .populate("Roles")
        .populate("districts")
        .then(result=>{
            res.status(200).json({message:'Berhasil mendapatkan data peserta', data:result});
        })
        .catch(next);
    }

}

module.exports = pesertaController;