exports.calculaComissao = async (req,res)=>{

    try{
        const handlingErros = require("../handling/handling")
        const path = require("path");
        const moment = require("moment")
        const fs = require("fs"); 
        const {pedidos} = req.body

        if(pedidos.length==0){
            return res.status(400).send({"erro":"Deve ser informado os dados de venda!"})
        }
        const errosData = handlingErros.validarData({"data":pedidos[0].data})
        const errosNumericos = handlingErros.validarCamposNumericos({"vendedor":pedidos[0].vendedor,"valor":pedidos[0].valor},[0,0],[10000,10000000000000]) 

        const erros = errosData.concat(errosNumericos)
        if(erros.length>0){
            return res.status(400).send({"erro":erros})
        }
        
        let totalVendas = []
        let percentual
    
        pedidos.forEach((venda)=>{
            let mes = moment(venda.data).month()+1
            let index = totalVendas.findIndex(cur=>cur.vendedor == parseInt(venda.vendedor) && cur.mes==mes)
    
            if(index==-1){    
                totalVendas.push({"vendedor":parseInt(venda.vendedor),"mes":mes,"valor":0,"qtd":1,"totalValor":parseInt(venda.valor)})
            }
            else{
                totalVendas[index].totalValor += parseInt(venda.valor)
                totalVendas[index].qtd += 1
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
    }catch(e){
        return res.status(400).send({"erro":"Algo inesperado aconteceu"})
    }
   
}