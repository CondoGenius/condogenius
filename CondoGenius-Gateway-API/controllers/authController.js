const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var config = require('../config/config');

const db = require('../models');
const User = db.users;


const authController = {};

authController.register = async (req, res) => {
  try {
    const { email, password, role_id } = req.body;

    var hashedPassword = bcrypt.hashSync(password, 8);

    const user = new User({ email, password: hashedPassword, role_id });
    await user.save();

    const token = jwt.sign({ userId: user.id }, config.secret, {
      expiresIn:  86400 // expira em 24 horas
    });

    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

authController.me = async (req, res) => {
  const token = req.headers['x-access-token'];

  if (!token) return res.status(401).send({ auth: false, message: 'Nenhum token informado.' });
  
  try {
    const decoded = jwt.verify(token, config.secret);
    const user = await User.findOne({ where: { id: decoded.userId, is_active: 1 } });

    if (!user) return res.status(404).send({ auth: false, message: 'Usuário não encontrado.' });

    res.status(200).send({ auth: true, user: user });
  } catch (err) {
    return res.status(500).send({ auth: false, message: 'Falha ao autenticar o token.' });
  }
};

authController.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) throw new Error('Usuário não encontrado!');

    const isMatch = await bcrypt.compareSync(password, user.password);

    if (!isMatch) throw new Error('Credenciais inválidas!');

    const token = jwt.sign({ userId: user.id }, config.secret);

    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

authController.logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null });
};

module.exports = authController;
