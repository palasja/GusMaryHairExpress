// YOUR_BASE_DIRECTORY/netlify/functions/api.ts

import express, { Router } from "express";
import ServerlessHttp from "serverless-http";

const api = express();

api.get("/.netlify/functions/api", (_req, res ) => {
   res.status(200).json(
    {mes: "Hello World!"}
  )
});

const handler = ServerlessHttp(api);

module.exports.handler = async(event, context) =>{
  const result = await handler(event, context)
  return result;
}