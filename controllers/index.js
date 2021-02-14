const { getLastBolivars, getAllBolivars, storeBolivar } = require("./BolivarsController");
const { getLastPetros, getAllPetros, storePetro } = require("./PetrosController");
const { login } = require("./UsersController")

module.exports = {
    getLastBolivars,
    getAllBolivars,
    storeBolivar,
    getLastPetros,
    getAllPetros,
    storePetro,
    login
};