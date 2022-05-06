exports.validarCamposNumericos = (args,mins=[],maxs=[])=>{
    const errosTotais = args.map((element,index) => {
      
      erros = Object.keys(element).map((key,i)=>{
        const listErros = []
        
        if(key!="data"){
          if(element.vendedor == undefined || element.data == undefined || element.valor==undefined){
            return `Todos os campos devem ser preenchidos no indice ${index}`
          }
          else{
            if(!element[key]){
         
              listErros.push(`Campo '${key}' não pode ser vazio no indice ${index}`)
          }
          else{
             if(!!isNaN(element[key])){  
               listErros.push(`Campo '${key}' deve ser numérico no indice ${index}!`)   
             }
    
     
            if (element[key] < mins[i]){
                listErros.push(`Campo '${key}' deve ser maior que ${mins[i]} no indice ${index}!.`)
            }  
            if (element[key] > maxs[i]){
              listErros.push(`Campo '${key}' deve ser menor que ${maxs[i]} no indice ${index}!`)
            }     
          }
          }
  

        }
  
    
         return listErros.length == 0? null : listErros
         
     }).filter(curr => !!curr)
     return erros.length == 0? null : erros
    }).filter(curr => !!curr);
  
  
  return errosTotais
  }


exports.validarData = (args)=>{

  const moment = require("moment")
  
  const errosTotais = args.map((element,index) => {
      
    erros = Object.keys(element).map((key)=>{
      const listErros = []
      
      if(element.vendedor == undefined || element.data == undefined || element.valor==undefined){
        return `Todos os campos devem ser preeenchidos no indice ${index}`
      }

      if(key!="vendedor" && key!="valor"){

        if(moment(element[key], 'YYYY-MM-DD', true).isValid()==false){
          listErros.push(`Insira uma data correta do indice ${index}`)
        }

    }

    return listErros.length == 0? null : listErros
       
   }).filter(curr => !!curr)
   return erros.length == 0? null : erros
  }).filter(curr => !!curr);


return errosTotais
  
}