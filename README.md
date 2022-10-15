# expressapi_15

### start project and 
### chage JS to ES6   "type": "module", in package.json 
```
npm init 
``` 
```
"type": "module",
```
### install express and connect to mongoDB and log API
```
npm i express mongoose morgan dotenv bcrypt multer jsonwebtoken passport passport-jwt
```
### create User model and Schema then create API
### use "dotenv" to config secret key and port (sensitive data )

### import Router to create User API and
### use "bcrypt" to encrypt password and compare with plain text(password)
### then generate token by "jsonwebtoken"

### "passport" initialize passport in index.js then 
### "passport-jwt" in middleware find user to 
### extract token from "HeaderAsBearerToken"

### find userID and return user if error return null
### apply "auth" to gen token

### isAdmin check role after gen token

### (do this when make create "user api")create folder "public\image" multer create storage 
### there are 2 keys for diskStorage filename: date(cast to.png) and path
### move multer to middleware


