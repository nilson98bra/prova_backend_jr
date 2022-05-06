const router = require("express").Router()
const comissaoControllers = require("../controllers/comissaoControllers")

router.post("/calcular-comissao",comissaoControllers.calculaComissao)

module.exports = router