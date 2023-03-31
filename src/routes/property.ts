import express from 'express';
import { dbConnection } from '..';
import sql from 'msnodesqlv8';
const router = express.Router();

// owner: name,
router.post('/getProperty', async(req, res) => {
    const promptInfo = req.body;
    try{
        let products = await dbConnection.request().query(`SELECT * from properties where owner == ${promptInfo.name}`);
        const productRecords = products.recordsets;
        if (productRecords){
            res.status(200).send(productRecords);
        }
    }catch(e){
        console.log(e);
        res.status(400).send("Something went wrong");
    }

});
// owner: userName,
// zipcode: zipCode,
// address: address,
// type: type,

router.post('/createProperty', async(req, res) => {
    const promptInfo = req.body;
    try{
        let  insertProduct = await dbConnection.request()
        .input('owner', sql.VarChar, promptInfo.userName)
        .input('zipcode', sql.Int, promptInfo.zipcode)
        .input('address', sql.VarChar, promptInfo.address)
        .input('commercial_type', sql.Bit, promptInfo.type)
        .input('url_link', sql.VarChar, promptInfo.url_link)
        .execute('InsertProperty');
        return  insertProduct.recordsets;
        let response = ''
        if (response){
            res.status(200).send("Sucessfully Submitted the post");
        }
    }catch(e){
        console.log(e);
        res.status(400).send("Something went wrong");
    }

});

export default router;