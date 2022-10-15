import * as dotenv from "dotenv"; //default export
dotenv.config();

const PORT = process.env.port;
const JWTSECRET = process.env.secret;
const MONGOURL = process.env.mongoDBURL;
export { PORT, JWTSECRET,MONGOURL };
