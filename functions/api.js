// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import ServerlessHttp from "serverless-http";

const api = express();

api.get("/.netlify/functions/api", (req, res ) => {
  return res.json(
    {mes: "Hello World!"}
  )
});

const handler = ServerlessHttp(api);

module.export.handler = async(event, context) =>{
  const result = await handler(event, context)
  return result;
}