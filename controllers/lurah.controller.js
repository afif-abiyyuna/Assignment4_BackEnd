const User = require ("../models/User.model");
const Role = require ("../models/Role.model");
const District = require ("../models/District.model");
const bcrypt = require ("bcrypt");

class lurahController {
    static createPanitia (req,res, next){
        const user = new User ({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 6),
            age: req.body.age,
            phone: req.body.phone
        });

        user.save((err,user)=>{
            if(err){
                res.status(500).json({message:err});
                return;
            }

            if(req.body.roles && req.body.districts){
                Role.findOne({role_name: "panitia"})
                .then(role=>{
                    user.roles = [role._id];
                });
                District.find({district_name:{$in:req.body.districts}})
                .then(district=>{
                    console.log(district);
                    user.districts = district.map(district=>district._id);
                    user.save()
                    .then(user=>{
                        res.status(201).json({ message: "Berhasil menambahkan panitia", user });
                    })
                })
                .catch(next);
            }
        });
    }

    static deletePanitia (req,res,next){
        const {userId} = req.params;
        User.findByIdAndDelete({userId})
        .then((panitia)=>{
            res.status(200).json({message:"Berhasil menghapus panitia", deleted:panitia});
        })
        .catch(next);
    }

    static updateLurah (req,res,next){
        const {userId} = req.params;
        const {username, email, password, age, phone} = req.body;
        const updatedData =  {username, email, password, age, phone}
        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }
        User.findByIdAndUpdate(userId, updatedData, {new:true})
        .then((lurah)=>{
            res.status(200).json({message:'Berhasil mengupdate data lurah', updated:lurah});
        })
        .catch(next);
    }

    static getLurah (req,res,next){
        const {userId} = req.params
        User.findById(userId)
        .populate("Roles")
        .populate("districts")
        .then(result=>{
            res.status(200).json({message:'Berhasil mendapatkan data lurah', data:result});
        })
        .catch(next);
    }

    static dataPanitia (req,res,next){
        User.find({roles:"5fb772fb021e98225c24349f"})
        .populate("roles")
        .then(result=>{
            res.status(200).json({message:"Berhasil mendapatkan list semua panitia", data:result});
           
            
        })
        .catch(next);
    }
}

module.exports = lurahController;