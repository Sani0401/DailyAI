import express from "express";
import getAnswer from '../services/clientServices.js'
const router = express.Router();

router.post("/getAnswer", async(req,res) =>{
    const query = req.body.query;
    console.log("This is the query data from client controllers:", query);
    const answer = await getAnswer(query);
    res.json({"response": answer});
})

export default router;