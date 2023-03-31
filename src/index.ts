import express, { Application, Request, Response } from "express";
import propertyRoutes from './routes/property'
import bodyParser from "body-parser";

const app: Application = express();
const port = 8000;
require('dotenv').config();
export const sql = require("mssql");
require("msnodesqlv8");
const dbConnection = new sql.ConnectionPool({
  database: "chatteldb",
  server: "localhost",
  driver: "msnodesqlv8",
  user: "admin",
  password: "JJnzrcZK3mLL",
  options: {
    trustedConnection: true,
    trustServerCertificate: true,
    useUTC: true
  }
});
export const connectionPoolPromise = dbConnection.connect().then((pool: any) => {
  console.log('Connected to MSSQL')
  return pool;
});
app.use(express.json());
app.use(               
  express.urlencoded({
    extended: true,
  })
);
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
app.use(cors(corsOptions));
app.get('/', (req, res) => res.send("Hello from Homepage"));
app.use('/property', propertyRoutes);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});

