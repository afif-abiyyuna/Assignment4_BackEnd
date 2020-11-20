const User = require ("../models/User.model");

class panitiaController {
    static updatePanitia (req,res,next){
        const {userId} = req.params;
        const {username, email, password, age, phone} = req.body;
        const updatedData =  {username, email, password, age, phone}
        for (let key in updatedData){
            if(!updatedData[key]){
              delete updatedData[key]
            }
        }
        User.findByIdAndUpdate(userId, updatedData, {new:true})
        .then((panitia)=>{
            res.status(200).json({message:'Berhasil mengupdate data lurah', updated:panitia});
        })
        .catch(next);
    }

    static getPanitia (req,res,next){
        const {userId} = req.params;
        User.findById(userId)
        .populate("Roles")
        .populate("districts")
        .then(result=>{
            res.status(200).json({message:'Berhasil mendapatkan data panitia', data:result});
        })
        .catch(next);
    }

    static dataPeserta (req,res,next){
        User.find({roles:"5fb772fb021e98225c24349e"})
        .populate("roles")
        .then(result=>{
            res.status(200).json({message:"Berhasil mendapatkan list semua peserta", data:result});
        })
        .catch(next);
    }


}

module.exports = panitiaController;