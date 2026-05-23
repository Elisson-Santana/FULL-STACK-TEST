const argon2 = require('argon2');
const User = require('../models/userStore');

const register = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email e senha são obrigatórios.' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ success: false, message: 'Email já cadastrado.' });
    }

    const passwordHash = await argon2.hash(password);

    const user = await User.create({ email, passwordHash });

    res.status(201).json({
      success: true,
      message: 'Usuário criado com sucesso.',
      data: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email e senha são obrigatórios.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: 'Email ou senha incorretos.' });
    }

    const passwordMatch = await argon2.verify(user.passwordHash, password);
    if (!passwordMatch) {
      return res.status(401).json({ success: false, message: 'Email ou senha incorretos.' });
    }

    res.json({
      success: true,
      message: 'Login realizado com sucesso.',
      data: { id: user._id, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { register, login };
