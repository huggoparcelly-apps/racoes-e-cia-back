import { server } from "./api/Server";

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
