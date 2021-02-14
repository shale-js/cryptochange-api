const { Petro } = require("../models");

async function getLastPetros(req, res) {
  try {
    const resp = await Petro.findAll({ limit: 1, order: [['createdAt', 'DESC']], attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
    
      res.json(resp);
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function getAllPetros(req, res) {
  try {
    const resp = await Petro.findAll({ limit: req.params.limit ? req.params.limit : 50, order: [['createdAt', 'DESC']], attributes: { exclude: ['id', 'updatedAt'] } })
      res.json(resp);
    } catch (e) {
        console.log(e);
        return e;
    }
}

async function storePetro(req, res) {
  try {
    if (req.body.value && parseFloat(req.body.value)) {
      const resp = await Petro.create(req.body)
      res.json({ message: 'Registro creado Satisfactoriamente!'})
    } else {
      throw { message: 'El valor ingresado no es valido, intente nuevamente!'}
    }    
  } catch (e) {
    res.send(e);
  }
}

module.exports = { getLastPetros, getAllPetros, storePetro }