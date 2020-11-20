const router = require ("express").Router();
const lurahController = require ("../controllers/lurah.controller");
const authJwt = require ("../middlewares/authJwt");

router.use((req,res,next)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "access_token, Origin, Content-Type, Accept"
    );
    next();
});

router.use(authJwt.verifyToken, authJwt.isLurah);
router.post("/createpanitia", lurahController.createPanitia);
router.delete("/deletepanitia/:userId", lurahController.deletePanitia);
router.put("/updatelurah/:userId", lurahController.updateLurah);
router.get("/getlurah", lurahController.getLurah);
router.get("/getpanitia", lurahController.dataPanitia);


module.exports = router;