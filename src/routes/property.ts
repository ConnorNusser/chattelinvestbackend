import express from 'express';
const router = express.Router();

// owner: name,
router.post('/getProperty', async(req, res) => {
    const promptInfo = req.body;
    try{
        let response = ''
        if (response){
            res.status(200).send("Sucessfully Submitted the post");
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