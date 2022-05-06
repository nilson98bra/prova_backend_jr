const http = require("http")
const app = require("./res/app")
const port = process.env.PORT || 8080
const server = http.createServer(app)
server.listen(port,()=>{
    console.log("Servidor funcionando na porta ",port)
})