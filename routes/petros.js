
const { getLastPetros, getAllPetros, storePetro } = require("../controllers/PetrosController");
const router = require("express").Router();
const auth = require("../middlewares/auth")

router.get("/last", (req,res) => getLastPetros(req,res));
router.get("/all", (req, res) => getAllPetros(req, res));


router.post("/", auth.ensureAuthenticated, (req,res) => storePetro(req,res));

module.exports = router;