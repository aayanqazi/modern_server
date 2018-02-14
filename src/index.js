

'use strict'
import express from 'express';
import bodyparser from "body-parser";
import { graphql, buildSchema } from 'graphql'
import fs from 'fs'
import { promisify } from 'util'
import * as Root from './gateway/resolvers'
import sum from "./sum";

init()

async function init() {
    const app = express();

    app.use(bodyparser.json())
    app.use(bodyparser.urlencoded({ extended: true }))

    const readFile : (string, string) => Promise<string> = promisify(fs.readFile)
    const gql : string = await readFile(`${__dirname}/schema.graphql`, 'utf8')
    const schema : Object = buildSchema(gql)
    app.post('/graphql', async (req, res) => {
        const { query, args } = req.body
        const result : Object = await graphql(schema, query, Root, { user: 'Bill' }, args)
        res.send(result)
      })
    

    app.get('/sum', (req, res) => {
        const { a, b } = req.query;
        res.status(200).send(sum(+a, +b).toString())
    })

    app.listen(3002, () => {
        console.log("Listening port 3001")
    })
}

