const jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

var nodemailer = require('nodemailer');
const randomstring = require('randomstring');

var config = require('../config/config');

const db = require('../models');
const User = db.users;
const Role = db.roles;
const Resident = db.residents;
const Admin = db.admins;
const ResetPasswordToken = db.reset_password_tokens;

const authController = {};

authController.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    var role = await Role.findOne({ where: { name: 'Resident' } });

    var resident = await Resident.findOne({ where: { email: email } });

    if(resident == null) {
      throw new Error("Não existe um morador associado a este email. Solicite seu cadastro ao síndico!");
    }

    var hashedPassword = bcrypt.hashSync(password, 8);

    const user = new User({ email, password: hashedPassword, role_id: role.id });
    await user.save();

    resident.user_id = user.id;
    await resident.save();

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
    const user = await User.findOne({ where : { email } });

    if (!user) throw new Error('Usuário não encontrado!');

    const isMatch = await bcrypt.compareSync(password, user.password);

    if (!isMatch) throw new Error('Credenciais inválidas!');

    const token = jwt.sign({ userId: user.id }, config.secret);

    var resident = await Resident.findOne({ where: { user_id: user.id } });

    var admin = await Admin.findOne({ where: { user_id: user.id } });

    var role = await Role.findOne({ where: { id: user.role_id } });

    var id_resident = resident ? resident.id : admin ? admin.id : null;

    res.status(200).json({ token: token, user_id: user.id, role: role.name, email: user.email, resident_id: id_resident, isLogged: true });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

authController.logout = async (req, res) => {
  res.status(200).send({ auth: false, token: null, isLogged: false });
};

authController.getAdminByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const admin = await Admin.findOne({
      where: {
        user_id: user_id
      }
    });

    res.status(200).json(admin);
  } catch (error) {
    console.error('Erro ao listar admin:', error);
    res.status(500).json({ message: 'Erro ao listar admin' });
  }
};

// metodo reset password
//  - recebe email
//  - valida email
//  - gera token
//  - envia email com token
//  - nao passar pela autenticacao do token de login

// metodo validate token
// - recebe token
// - valida token
// - retorna true ou false

// metodo update password
// - recebe senha
// - atualiza senha


// fazer se der tempo
// melhorar email enviado (html mais bonito)
// 

authController.resetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    const token = randomstring.generate({ length: 5 });

    var transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: "condogenius23@gmail.com",
        pass: "pzhgjpwbrjynihfw"
      }
    });

    var mailOptions = {
      from: "condogenius23@gmail.com",
      to: email,
      subject: "CondoGenius - Redefinição de senha",
      text: "Olá, você solicitou a redefinição de senha no CondoGenius. Para redefinir sua senha, utilize o token a seguir: \n\n" +
      "" + token + "\n\n"
    };

    await ResetPasswordToken.create({ user_id: user.id, token: token });

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        return res.status(500).json({ message: 'Erro ao enviar email' });
      } else {
        console.log('Email sent: ' + info.response);
        return res.status(200).json({ message: "Email enviado com sucesso!" });
      }
    });

  } catch (error) {
    console.error('Erro ao resetar senha:', error);
    res.status(500).json({ message: 'Erro ao resetar senha' });
  }
}

module.exports = authController;
