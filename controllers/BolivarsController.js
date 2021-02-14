const { Bolivar } = require("../models");

async function getLastBolivars(req, res) {
  try {
    const resp = await Bolivar.findAll({ limit: 1, order: [['createdAt', 'DESC']], attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
    res.json(resp);
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function getAllBolivars(req, res) {
  try {
    const resp = await Bolivar.findAll({ limit: req.params.limit ? req.params.limit : 50, order: [['createdAt', 'DESC']], attributes: { exclude: ['id', 'updatedAt'] } })
    res.json(resp);
  } catch (e) {
    console.log(e);
    return e;
  }
}

async function storeBolivar(req, res) {
  try {
    if (req.body.value && parseFloat(req.body.value)) {
      const resp = await Bolivar.create(req.body,{ attributes: { exclude: ['id', 'createdAt', 'updatedAt'] } })
      res.json({ message: 'Registro creado Satisfactoriamente!'})
    } else {
      throw { message: 'El valor ingresado no es valido, intente nuevamente!'}
    }    
  } catch (e) {
    res.send(e);
  }
}

module.exports = { getLastBolivars, getAllBolivars, storeBolivar }