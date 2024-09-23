# Bem-vindo ao Projeto Rações e Cia - Back-end 🐾

Esse projeto faz parte do meu Trabalho de Conclusão de Curso e tem como objetivo desenvolver uma API para um sistema de pedidos de um petshop, colocando em prática os aprendizados obtidos durante a graduação.

Aqui você vai encontrar alguns detalhes sobre o projeto, bem como instruções para baixar o projeto localmente.
Obrigado por acessar!

---

# 🛠️ Tecnologias Utilizadas

 - Node.js
 - Express
 - TypeScript
 - Prisma ORM
 - PostgreSQL
 - Docker
 - Socket.IO

---

# 📋 Endpoints Disponíveis

  ## /products
  - GET /products: Lista todos os produtos.
  - GET /products/:id: Detalhes de um produto específico.
  - POST /products: Adiciona um novo produto (restrito a admin).
  - PUT /products/:id: Atualiza um produto existente (restrito a admin).
  - DELETE /products/:id: Remove um produto (restrito a admin).
  ## /orders
  - GET /orders: Lista todos os pedidos com usuário autenticado.
  - POST /orders: Cria um novo pedido com usuário autenticado.
  - GET /orders/:id: Detalhes de um pedido específico de um usuário autenticado.
  - PUT /orders/:id: Atualiza o status de um pedido (restrito a admin).
  ## /user
  - POST /user/login: Realiza login de um usuário.
  - POST /user/register: Registra um novo usuário.
  ## /verifyToken
  - GET /verifyToken: Verifica a validade do token de autenticação.

---

# 🚀 Como Executar o Projeto Localmente

## Pré-requisitos
- Node.js (versão 20 ou superior)
- Docker e Docker Compose
- PostgreSQL (caso não use Docker)

## Passos para Instalação
#### 1. Clone o repositório:

```
git clone https://github.com/huggoparcelly/racoes-e-cia-back.git
cd racoes-e-cia-back
```

#### 2. Instale as dependências:

```
npm install
```

#### 3. Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto com as seguintes variáveis:

```
DATABASE_URL=postgresql://USER:PASSWORD@localhost:5432/dbname
ORIGIN_CORS=http://localhost:3000
POSTGRES_USER=dbuser
POSTGRES_PASSWORD=dbpassword
POSTGRES_DB=dbname
GOOGLE_APPLICATION_CREDENTIALS=firebaseapicredentials
STRIPE_SECRET_KEY=stripesecretekey
```

#### 4. Utilizando Docker:

``` 
docker-compose up
```

#### 5. A API estará disponível em:
http://localhost:3001
 
---
