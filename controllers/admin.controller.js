const User = require ("../models/User.model");
const Role = require ("../models/Role.model");
const District = require ("../models/District.model");
const bcrypt = require ("bcrypt");

class adminController {

    static signUpAdmin (req,res,next){
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
                Role.findOne({role_name: "admin"})
                .then(role=>{
                    user.roles = [role._id];
                });
                District.find({district_name:{$in:req.body.districts}})
                .then(district=>{
                    user.districts = district.map(district=>district._id);
                    user.save()
                    .then(user=>{
                        res.status(201).json({ message: "Anda telah berhasil menjadi admin", user });
                    })
                })
                .catch(next);
            } 
        
        });
    }

    static createLurah (req,res,next){
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
                Role.findOne({role_name: "lurah"})
                .then(role=>{
                    user.roles = [role._id];
                });
                District.find({district_name:{$in:req.body.districts}})
                .then(district=>{
                    user.districts = district.map(district=>district._id);
                    user.save()
                    .then(user=>{
                        res.status(201).json({ message: "Lurah berhasil ditambahkan", user });
                    })
                })
                .catch(next);
            }
             
        });
    }

    static createRole (req,res,next){
        const {role_name} = req.body;
        Role.create({role_name})
        .then((role)=>{
            res.status(201).json({message:"Role berhasil ditambahkan", role});
        })
        .catch(next);
    }

    static createDistrict (req,res,next){
        const {district_name} = req.body;
        District.create({district_name})
        .then((district)=>{
            res.status(201).json({message:"District berhasil ditambahkan", district});
        })
        .catch(next);
    }

    static deleteLurah (req,res,next){
        const {userId} = req.params;
        User.findByIdAndDelete(userId)
        .then((lurah)=>{
            res.status(200).json({message:"Lurah berhasil dihapus", deleted:lurah});
        })
        .catch(next);
    }

    static deleteRole (req,res,next){
        const {roleId} = req.params;
        Role.findOneAndDelete(roleId)
        .then((role)=>{
            res.status(200).json({message:"Role berhasil dihapus", deleted:role});
        })
        .catch(next);
    }

    static deleteDistrict (req,res,next){
        const {districtId} = req.params;
        District.findOneAndDelete(districtId)
        .then((district)=>{
            res.status(200).json({message:"District berhasil dihapus", deleted:district});
        })
        .catch(next);
    }

    static dataLurah (req,res,next){
        User.find({roles:"5fb772fb021e98225c2434a0"})
        .populate("roles")
        .then(result=>{
            res.status(200).json({message:"Berhasil mendapatkan list semua lurah, result", result});
           
            
        })
        .catch(next);
    }

    static dataRole (req,res,next){
        Role.find()
        .then(role=>{
            res.status(200).json({message:"Berhasil mendapatkan list semua role", role});
        })
        .catch(next);
    }

    static dataDistrict (req,res,next){
        District.find()
        .then(district=>{
            res.status(200).json({message:"Berhasil mendapatkan list semua district", district})
        })
        .catch(next);
    }

    static dataUser (req,res,next){
        User.find()
        .populate("roles")
        .populate("districts")
        .then(user=>{
            res.status(200).json({message:"Berhasil mendapatkan list semua pengguna aplikasi", user});
        })
        .catch(next);
    }

    static updateAdmin (req,res,next){
        const {userId} = req.params;
        const {username, email, password, age, phone} = req.body;
        const updatedData =  {username, email, password, age, phone}
        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }
        User.findByIdAndUpdate(userId, updatedData, {new:true})
        .then((admin)=>{
            res.status(200).json({message:'Berhasil mengupdate data admin', updated:admin});
        })
        .catch(next);
    }

    static getAdmin (req,res,next){
        const {userId} = req.params;
        User.findById(userId)
        .populate("roles")
        .populate("districts")
        .then(user=>{
            res.status(200).json({message:"Berhasil mendapatkan data admin", data:user});
        })
        .catch(next);
    }

}

module.exports = adminController;