exports.validarCamposNumericos = (args,mins=[])=>{

    if((args.vendedor || args.valor)==undefined){
      return ["Campos vendedor e valor devem ser preenchidos!"]
    }
    let erros = Object.keys(args).map((key,index)=>{
      const listErros = []
       if(!args[key]){
       
           listErros.push(`Campo '${key}' não pode ser vazio!`)
       }
       else{
          if(!!isNaN(args[key])){  
            listErros.push(`Campo '${key}' deve ser numérico!`)   
          }


        if (args[key] < mins[index]){
            listErros.push(`Campo '${key}' deve ser maior que ${mins[index]}.`)
        }      
       }
  
       return listErros.length == 0? null : listErros
       
   }).filter(curr => !!curr)
  
   return erros
  }


exports.validarData = (args)=>{

  const moment = require("moment")
  let erros = []
  if(args.data == undefined){
    erros.push("Campo data deve ser inserido!")
  }else{
    if(moment(args.data, 'YYYY-MM-DD', true).isValid()==false){
      erros.push("Insire uma data correta")
    }
  }

  
  return erros
}