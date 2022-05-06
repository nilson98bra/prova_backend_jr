# Prova_Backend_Jr

API construida em NodeJS, com o framework Express.

## Como utilizar

- Utilizar o comando 'npm install' na pasta raiz do projeto para isntalar todas as dependencias.
- Utilizar localhost:8080 para acessar a API
- Recomenda-se utilizar ferramentas como Postman ou similares para os testes da API

### Rotas

- POST: /api/calcular-comissao

_Body_

```javascript
{
  "pedidos":[
         
             { "vendedor": 1, "data": "2022-12-01", "valor":100 }
         
    ]
}

```

_Response 200_

```javascript
{
 "comissoes": [
        {
            "vendedor": 1,
            "mes": 12,
            "valor": 1
        }
}

```
