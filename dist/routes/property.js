"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const router = express_1.default.Router();
// owner: name,
router.post('/getProperty', async (req, res) => {
    const promptInfo = req.body;
    try {
        // Define your query with parameters
        const pool = await index_1.connectionPoolPromise;
        let products = await pool.request().query(`SELECT * from properties WHERE owner = ${promptInfo.name}`);
        const productRecords = products.recordsets;
        if (productRecords) {
            res.status(200).send(productRecords);
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).send("Something went wrong");
    }
});
// owner: userName,
// zipcode: zipCode,
// address: address,
// type: type,
router.post('/createProperty', async (req, res) => {
    const promptInfo = req.body;
    try {
        const pool = await index_1.connectionPoolPromise;
        let insertProduct = await pool
            .input('owner', index_1.sql.VarChar, promptInfo.owner)
            .input('zipcode', index_1.sql.Int, promptInfo.zipcode)
            .input('address', index_1.sql.VarChar, promptInfo.address)
            .input('commercial_type', index_1.sql.Bit, promptInfo.type)
            .input('url_link', index_1.sql.VarChar, promptInfo.url_link)
            .execute('InsertProperty');
        if (insertProduct.recordsets) {
            res.status(200).send(insertProduct.recordsets);
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).send("Something went wrong");
    }
});
exports.default = router;
