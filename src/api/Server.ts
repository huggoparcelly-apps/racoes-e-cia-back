import "dotenv/config";
import express from "express";
import cors from 'cors';

import { productsRouter } from "../routers/Products";
import { userRouter } from "../routers/Users";
import { orderRouter } from "../routers/Orders";
import validateJWT from "../middlewares/validateJWT";
import { verifyTokenRouter } from "../routers/VerifyToken";
import { createServer } from "http";
import { Server as SocketIOServer } from 'socket.io';
import { socketIo } from "../socket/status";
import { stripeRouter } from "../routers/Stripe";

const app = express();

const corsOptions = {
  origin: process.env.ORIGIN_CORS, // Permitir apenas esta origem (frontend)
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', 
  allowedHeaders: ['Content-Type', 'Authorization'], 
}

app.use(cors(corsOptions));
app.use(express.json());


app.use('/products', productsRouter);
app.use('/user', userRouter);
app.use('/verifyToken', verifyTokenRouter)
app.use('/orders', validateJWT,  orderRouter);
app.use('/api/checkout_sessions', validateJWT, stripeRouter)

const server = createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.ORIGIN_CORS,
    methods: ['GET', 'POST'],
  },
});

socketIo(io);

export { server };
