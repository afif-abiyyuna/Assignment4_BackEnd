const router = require ("express").Router();
const panitiaController = require ("../controllers/panitia.controller");
const authJwt = require ("../middlewares/authJwt");

router.use((req,res,next)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "access_token, Origin, Content-Type, Accept"
    );
    next();
});

router.use(authJwt.verifyToken, authJwt.isPanitia);
router.put("/updatepanitia/:userId", panitiaController);
router.get("/getpanitia", panitiaController.getPanitia);
router.get("/getpeserta", panitiaController.dataPeserta);




module.exports = router;