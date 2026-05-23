import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  // Posts
  listPosts: () => instance.get("/posts"),
  searchPosts: (query) => instance.get("/posts/search", { params: { q: query } }),
  createPost: (data) => instance.post("/posts", data),
  updatePost: (id, data) => instance.put(`/posts/${id}`, data),
  deletePost: (id) => instance.delete(`/posts/${id}`),

  // Users
  registerUser: (email, password) => instance.post("/users/register", { email, password }),
  loginUser: (email, password) => instance.post("/users/login", { email, password }),
};