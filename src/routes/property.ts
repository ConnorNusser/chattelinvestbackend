import express from 'express';
import { sql, connectionPoolPromise } from '../index';
const router = express.Router();

// owner: name,
router.post('/getProperty', async(req, res) => {
    const promptInfo = req.body;
    try{
        // Define your query with parameters
        const pool = await connectionPoolPromise;
        const query = 'SELECT * from properties WHERE owner = @owner';
          // Create a new request object
        const request = new sql.Request(pool);

        // Set the input parameters for the query
        request.input('owner', sql.VarChar, promptInfo.owner);

        // Execute the query and process the results
        let productRecords = '';
        await request.query(query).then((result: { recordset: any; }) => {
            console.log(result.recordset);
            productRecords = result.recordset;
        }).catch((err: any) => {
        console.error(err);
        });
        if (productRecords){
            res.status(200).send(productRecords);
        }else{
            res.status(200).send([]);
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
        // Define your query with parameters
        const pool = await connectionPoolPromise;
        const spName = 'InsertProperty';
          // Create a new request object
        const request = new sql.Request(pool);
        let resultInsert = '';
        request.input('owner', sql.VarChar, promptInfo.owner)
        request.input('zipcode', sql.Int, promptInfo.zipcode)
        request.input('address', sql.VarChar, promptInfo.address)
        request.input('commercial_type', sql.Bit, promptInfo.type)
        request.input('url_link', sql.VarChar, promptInfo.imageUrl)
        await request.execute(spName).then((result: { recordset: any; }) => {
            resultInsert = result.recordset;
          }).catch((err: any) => {
            console.error(err);
          })
        if (resultInsert){
            res.status(200).send(resultInsert);
        }
    }catch(e){
        console.log(e);
        res.status(400).send("Something went wrong");
    }

});

export default router;