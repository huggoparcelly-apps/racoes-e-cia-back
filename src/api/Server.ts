import "dotenv/config";
import express from "express";
import cors from 'cors';

import { productsRouter } from "../routers/Products";

const server = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Permitir apenas esta origem (frontend)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeçalhos permitidos
}

server.use(cors(corsOptions));

server.use(express.json());
server.use('/products', productsRouter);

export { server };
