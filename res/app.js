const express = require("express")
const app = express()

const comissaoRoute = require("./routes/comissaoRoute")

app.use(express.json())

app.use("/api",comissaoRoute)

app.use((req,res,next)=>{
    return res.status(404).send({"error":"Rota não encontrada"});
})



module.exports = app