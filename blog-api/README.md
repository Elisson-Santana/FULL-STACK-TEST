# Blog API

API REST para aplicação de blogging desenvolvida com Node.js e Express.

## Tecnologias

- **Node.js** - Runtime JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **bcryptjs** - Hash de senhas
- **Jest** - Testes unitários

## Instalação

```bash
# Instalar dependências
npm install

# Configurar variáveis de ambiente
# Copie o arquivo .env.example e renomeie para .env
cp .env.example .env

# Edite o .env com suas credenciais do MongoDB
```

## Como usar

```bash
# Modo desenvolvimento (com nodemon)
npm run dev

# Modo produção
npm start

# Rodar testes
npm test
```

O servidor estará disponível em `http://localhost:3000`

## Estrutura do projeto

```
src/
├── controllers/    # Lógica das rotas
├── models/         # Modelos de dados
├── routes/         # Definição das rotas
├── middleware/     # Middlewares customizados
├── app.js          # Configuração do Express
└── server.js       # Inicialização do servidor
```

## Endpoints principais

- `GET /posts` - Listar posts
- `POST /posts` - Criar novo post
- `GET /users` - Listar usuários
- `POST /users` - Registrar usuário

## Autor

Johnatan Oliveira
