require('dotenv').config();
import {server} from './server/Server';

const port = process.env.PORT;

server.listen(port, () => console.log(`App rodando na porta ${port}`));