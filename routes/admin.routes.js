const router = require ("express").Router();
const adminController = require ("../controllers/admin.controller");
const authJwt = require("../middlewares/authJwt");
const verifySignUp = require ("../middlewares/verifySignUp");

router.use((req,res,next)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "access_token, Origin, Content-Type, Accept"
    );
    next();
});
router.post("/signup", verifySignUp.checkDuplicateUsernameOrEmail, adminController.signUpAdmin);
router.use(authJwt.verifyToken, authJwt.isAdmin);
router.post("/createlurah", adminController.createLurah);
router.post("/createrole", adminController.createRole);
router.post("/createdistrict", adminController.createDistrict);
router.delete("/deletelurah/:userId", adminController.deleteLurah);
router.delete("/deleterole/:roleId", adminController.deleteRole);
router.delete("/deletedistrict/:districtId", adminController.deleteDistrict);
router.get("/datalurah", adminController.dataLurah);
router.get("/datarole", adminController.dataRole);
router.get("/datadistrict", adminController.dataDistrict);
router.get("/datauser", adminController.dataUser);
router.get("/dataadmin", adminController.getAdmin);
router.put("/updateadmin/:userId", adminController.updateAdmin);



module.exports = router;