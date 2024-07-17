import { app } from "./api/app";

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`App rodando na porta ${port}`));
