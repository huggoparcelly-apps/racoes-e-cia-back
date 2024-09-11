# Etapa 1: Build da aplicação
FROM node:20-alpine AS builder

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o package-lock.json
COPY package*.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante do código para o container
COPY . .

# Instala o Prisma Client
RUN npx prisma generate

# Etapa 2: Execução da aplicação
FROM node:20-alpine

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos gerados pela build e o código-fonte
COPY --from=builder /app . 

# Exponha a porta que a aplicação irá rodar
EXPOSE 3001

# Comando para executar a migração e iniciar a aplicação
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start"]
