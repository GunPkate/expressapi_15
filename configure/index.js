import * as dotenv from "dotenv"; //default export
dotenv.config();

const PORT = process.env.port
const JWTSECRET = process.env.secret  
export {PORT,JWTSECRET}