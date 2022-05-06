const { Console } = require("console");

exports.calculaComissao = async (req,res)=>{
    const path = require("path");
    const moment = require("moment")
    const fs = require('fs');

    const {pedidos} = req.body
    let totalVendas = []
    let percentual

    pedidos.forEach((venda)=>{
        let mes = moment(venda.data).month()+1
        let indexFuncionarioMes = totalVendas.findIndex(cur=>cur.vendedor == venda.vendedor && cur.mes==mes)

        if(indexFuncionarioMes==-1){    
            totalVendas.push({"vendedor":venda.vendedor,"mes":mes,"valor":0,"qtd":1,"totalValor":venda.valor})
        }
        else{
            totalVendas[indexFuncionarioMes].totalValor += venda.valor
            totalVendas[indexFuncionarioMes].qtd += 1
        }
    })
 

    let dadosLidos = fs.readFileSync(path.resolve(__dirname, "../database/metas.json"));
    let metas = JSON.parse(dadosLidos);

    const comissaoMesEmetas = totalVendas.map((currVendas)=>{

        switch(true){
            case(currVendas.totalValor<300):
                percentual=0.01
                break
            case(currVendas.totalValor>=300 && currVendas.totalValor<=1000):
                percentual=0.03
                break
            case(currVendas.totalValor>1000):
                percentual=0.05
                break
        }

        const indexMetas = metas.findIndex( metas=> metas.mes==currVendas.mes)

        currVendas.valor = currVendas.totalValor * percentual
        if(currVendas.qtd >= metas[indexMetas].qtd){
            
            currVendas.valor += currVendas.totalValor * 0.03
        }

        delete currVendas.qtd
        delete currVendas.totalValor
        return currVendas
    })
    

    return res.status(200).send({"comissoes":comissaoMesEmetas})
}