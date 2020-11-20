const router = require ("express").Router();
const verifySignUp = require ("../middlewares/verifySignUp");
const pesertaController = require ("../controllers/peserta.controller");
const authJwt = require ("../middlewares/authJwt");

router.use((req,res,next)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "access_token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/signup", verifySignUp.checkDuplicateUsernameOrEmail, pesertaController.signUpPeserta);
router.put("/update/:userId", authJwt.verifyToken, pesertaController.updatePeserta);
router.get("/get/:userId", authJwt.verifyToken, pesertaController.getPeserta);

module.exports = router;