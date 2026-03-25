const request = require('supertest');
const app = require('../src/app');

describe('Blog API', () => {
  let createdId;

  describe('GET /posts', () => {
    it('retorna lista de posts', async () => {
      const res = await request(app).get('/posts');
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    });
  });

  describe('POST /posts', () => {
    it('cria um novo post', async () => {
      const res = await request(app).post('/posts').send({
        title: 'Post de Teste',
        content: 'Conteúdo do post de teste',
        author: 'Prof. Teste',
      });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe('Post de Teste');
      createdId = res.body.data.id;
    });

    it('retorna 400 se título estiver faltando', async () => {
      const res = await request(app).post('/posts').send({ content: 'x', author: 'y' });
      expect(res.status).toBe(400);
    });
  });

  describe('GET /posts/:id', () => {
    it('retorna post pelo id', async () => {
      const res = await request(app).get(`/posts/${createdId}`);
      expect(res.status).toBe(200);
      expect(res.body.data.id).toBe(createdId);
    });

    it('retorna 404 para id inexistente', async () => {
      const res = await request(app).get('/posts/99999');
      expect(res.status).toBe(404);
    });
  });

  describe('GET /posts/search', () => {
    it('busca posts por palavra-chave', async () => {
      const res = await request(app).get('/posts/search?q=JavaScript');
      expect(res.status).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0);
    });

    it('retorna 400 sem parâmetro q', async () => {
      const res = await request(app).get('/posts/search');
      expect(res.status).toBe(400);
    });
  });

  describe('PUT /posts/:id', () => {
    it('atualiza um post existente', async () => {
      const res = await request(app)
        .put(`/posts/${createdId}`)
        .send({ title: 'Título Atualizado' });
      expect(res.status).toBe(200);
      expect(res.body.data.title).toBe('Título Atualizado');
    });
  });

  describe('DELETE /posts/:id', () => {
    it('exclui um post existente', async () => {
      const res = await request(app).delete(`/posts/${createdId}`);
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });

    it('retorna 404 ao tentar excluir post inexistente', async () => {
      const res = await request(app).delete(`/posts/${createdId}`);
      expect(res.status).toBe(404);
    });
  });
});


//1
//2
//3