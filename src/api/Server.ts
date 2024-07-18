import "dotenv/config";
import express from "express";

import { productsRouter } from "../routers/Products";

const server = express();

server.use(express.json());
server.use('/products', productsRouter);

export { server };
