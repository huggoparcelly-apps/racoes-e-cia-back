import "dotenv/config";
import express from "express";
import cors from 'cors';

import { productsRouter } from "../routers/Products";
import { userRouter } from "../routers/Users";
import { orderRouter } from "../routers/Orders";

const server = express();

const corsOptions = {
  origin: process.env.ORIGIN_CORS, // Permitir apenas esta origem (frontend)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}

server.use(cors(corsOptions));

server.use(express.json());
server.use('/products', productsRouter);
server.use('/user', userRouter);
server.use('/order', orderRouter);

export { server };
