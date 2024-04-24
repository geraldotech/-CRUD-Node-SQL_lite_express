# API express sqLite

- cors
- express-basic-auth
- sqlite

## Start Project:

`npm run dev`

- sqlite install two packes: 
  - https://www.npmjs.com/package/sqlite#installationW
  - `npm install sqlite3 --save`

extension:
https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-mysql-client2

## packages installed:

- npm i cors -s
- npm i https -s
- file system
  - > `npm i fs -s` or just `npm i cors https fs -s`


## Routes:
> send a  request.body

```js

- GET http://localhost:4000/pessoas

- GET http://localhost:4000/pessoa
// send body request
{
"id":  1
}

- POST http://localhost:4000/pessoa

{
  "nome": "John",
  "TEXT": "your text",
  "idade": 100
}
```


## basicAuth in:

- HTTPie
  
![image](https://github.com/geraldotech/API-express-sqLite/assets/92253544/118a40df-2c2e-4d6f-aece-78b4a323a275)

- Postman

![image](https://github.com/geraldotech/API-express-sqLite/assets/92253544/b2e230fb-966f-4e5d-9b79-7223a670fe9e)

- gerar certificados
  https://pt.rakko.tools/tools/46/






