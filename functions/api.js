// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
api.get("/.netlify/functions/api", (req, res ) => {return res.json({mes: "Hello World!"})});

api.use("/api/", router);

api.use("/api/hi", (req, res ) => {res.send("Hi")});

const handler = serverless(api);

module.export.handler = async(event, context) =>{
  const result = await handler(event, context)
  return result;
}