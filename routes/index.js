const router = require ("express").Router();
const pesertaRoutes = require ("./peserta.routes");
const adminRoutes = require ("./admin.routes");
const lurahRoutes = require ("./lurah.routes");
const loginRoutes = require ("./login.routes");

router.use("/peserta", pesertaRoutes);
router.use("/admin", adminRoutes);
router.use("/lurah", lurahRoutes);
router.use(loginRoutes);


module.exports = router;