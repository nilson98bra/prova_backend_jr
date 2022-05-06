const express = require("express")
const app = express()

const comissaoRoute = require("./routes/comissaoRoute")

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

app.use("/api",comissaoRoute)

app.use((req,res,next)=>{
    return res.status(404).send({"error":"Not Found"});
})



module.exports = app