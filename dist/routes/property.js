"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// owner: name,
router.post('/getProperty', async (req, res) => {
    const promptInfo = req.body;
    try {
        let response = '';
        if (response) {
            res.status(200).send("Sucessfully Submitted the post");
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
        let response = '';
        if (response) {
            res.status(200).send("Sucessfully Submitted the post");
        }
    }
    catch (e) {
        console.log(e);
        res.status(400).send("Something went wrong");
    }
});
exports.default = router;
