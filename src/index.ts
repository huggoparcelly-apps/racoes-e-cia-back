import { server } from "./api/Server";

const port = process.env.PORT || 3001;

server.listen(port, () => console.log(`App rodando na porta ${port}`));
