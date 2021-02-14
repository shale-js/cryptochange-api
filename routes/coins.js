const router = require("express").Router();
const { getAllCoins, getCurrencyCoin } = require("../controllers/CoinsController");

router.get("/all", (req, res) => getAllCoins(req, res));
router.get("/:amount/:currency_coin", (req, res) => getCurrencyCoin(req, res));

module.exports = router;
