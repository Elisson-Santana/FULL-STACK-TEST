const Post = require('../models/postStore');

const listPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post não encontrado.' });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: 'ID inválido.' });
  }
};

const searchPosts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q || q.trim() === '') {
      return res.status(400).json({ success: false, message: 'Parâmetro "q" é obrigatório.' });
    }
    const regex = new RegExp(q.trim(), 'i');
    const posts = await Post.find({ $or: [{ title: regex }, { content: regex }] });
    res.json({ success: true, count: posts.length, data: posts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const createPost = async (req, res) => {
  try {
    const post = await Post.create(req.body);
    res.status(201).json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!post) return res.status(404).json({ success: false, message: 'Post não encontrado.' });
    res.json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ success: false, message: 'Post não encontrado.' });
    res.json({ success: true, message: 'Post excluído com sucesso.' });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

module.exports = { listPosts, getPost, searchPosts, createPost, updatePost, deletePost };
