"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionPoolPromise = exports.sql = void 0;
const express_1 = __importDefault(require("express"));
const property_1 = __importDefault(require("./routes/property"));
const app = (0, express_1.default)();
const port = 8000;
require('dotenv').config();
exports.sql = require("mssql");
require("msnodesqlv8");
const dbConnection = new exports.sql.ConnectionPool({
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
exports.connectionPoolPromise = dbConnection.connect().then((pool) => {
    console.log('Connected to MSSQL');
    return pool;
});
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true,
}));
const cors = require("cors");
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.get('/', (req, res) => res.send("Hello from Homepage"));
app.use('/property', property_1.default);
app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});
