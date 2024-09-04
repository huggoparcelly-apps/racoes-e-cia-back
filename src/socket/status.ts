import { OrderService } from "../services/orders";

export const socketIo = async (io: any) => {
  
  // Será executada sempre que um novo client se conecta ao servidor
  io.on('connection', (socket: any) => {
    console.log('Cliente conectado:', socket.id);
  
    // Recebe evento do frontend para alterar o status do pedido
    socket.on('updateOrderStatus', (data: any) => {
      const { orderId, status } = data;
      OrderService.updateOrderStatus(orderId, status);
      
      // Emite o novo status para todos os clientes conectados
      io.emit('orderStatus', { orderId, status });
    });
  
    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id);
    });
  });
};
