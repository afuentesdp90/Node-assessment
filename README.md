# Node.js-assessment

Node Express RESTful Web API

## Getting Started

Clone the repo

```
git clone https://github.com/afuentesdp90/Node-assessment.git
```

Install dependencies

```
npm install
```

Run server

```
npm start
```

I've created two functions to insert data into database. There are in /server/loaddata.js.
If you don't have any data base, please call this two functions before continue.

First of all, generate your token. You can find email and password (password is the user name) here http://www.mocky.io/v2/5808862710000087232b75ac

```
https://localhost:3000/login with {"email": [clientEmail], "password": [clientPassword]}
```

Once you have your token you can call any of these end points:

```
https://localhost:3000/client/[clientId]                {"token": [tokenId]}
https://localhost:3000/client/name/[clientName]?token=[yourToken]  {"token": [tokenId]}
https://localhost:3000/policies/[clientName]?token=[yourToken] (Require admin role)  {"token": [tokenId], "role" : "admin"}
https://localhost:3000/client/policy/[policyId]?token=[yourToken] (Require admin role) {"token": [tokenId], "role" : "admin"}
```


## Built With

* [Node JS](http://nodejs.org)
* [Express js](https://expressjs.com)
* [Mongoose](http://mongoosejs.com)

## Author

* **Albert Fuentes**
