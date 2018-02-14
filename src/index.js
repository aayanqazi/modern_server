'use strict'
import express from 'express';
import bodyparser from "body-parser";

const app = express();

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}));

import sum from "./sum";

app.get('/sum',(req,res)=>{
    const {a,b} = req.query;
    res.status(200).send(sum(+a,+b).toString())
})

app.listen(3001,()=>{
    console.log("Listening port 3001")
})