# Blog API

API REST para aplicação de blogging, pronta para integração com OutSystems.

## Instalação

```bash
npm install
cp .env.example .env
npm run dev
```

## Endpoints

| Método | Rota            | Descrição                        |
|--------|-----------------|----------------------------------|
| GET    | /posts          | Lista todos os posts             |
| GET    | /posts/search   | Busca posts por palavra-chave    |
| GET    | /posts/:id      | Retorna um post pelo ID          |
| POST   | /posts          | Cria um novo post                |
| PUT    | /posts/:id      | Edita um post existente          |
| DELETE | /posts/:id      | Exclui um post                   |

## Exemplos

### Criar post
```
POST /posts
Content-Type: application/json

{
  "title": "Meu Post",
  "content": "Conteúdo do post",
  "author": "Prof. Silva"
}
```

### Buscar posts
```
GET /posts/search?q=javascript
```

### Editar post
```
PUT /posts/1
Content-Type: application/json

{
  "title": "Novo Título"
}
```

## Testes

```bash
npm test
```

## Integração com OutSystems

Habilite CORS já está configurado por padrão. No OutSystems, aponte os REST Consume para `http://SEU_SERVIDOR:3000`.
