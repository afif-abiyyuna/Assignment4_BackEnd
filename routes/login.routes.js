const router = require ("express").Router();
const loginController = require ("../controllers/login.controller");

router.use((req,res,next)=>{
    res.header(
        "Access-Control-Allow-Headers",
        "access_token, Origin, Content-Type, Accept"
    );
    next();
});

router.post("/signin", loginController.signIn);



module.exports = router;