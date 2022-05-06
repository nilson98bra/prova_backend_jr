const router = require("express").Router()
const comissaoControllers = require("../controllers/comissaoControllers")

router.post("/calcula-comissao",comissaoControllers.calculaComissao)

module.exports = router