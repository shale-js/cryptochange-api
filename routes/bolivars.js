const { getLastBolivars, getAllBolivars, storeBolivar } = require("../controllers/BolivarsController");
const router = require("express").Router();
const auth = require("../middlewares/auth")

router.get("/last", (req,res) => getLastBolivars(req,res));
router.get("/all", (req,res) => getAllBolivars(req,res));

router.post("/", auth.ensureAuthenticated,(req,res) => storeBolivar(req,res))

module.exports = router;