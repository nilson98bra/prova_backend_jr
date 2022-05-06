exports.validarCamposNumericos = (args,maxs=[],mins=[])=>{

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

  exports.validarCamposExistente = ()=>{

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