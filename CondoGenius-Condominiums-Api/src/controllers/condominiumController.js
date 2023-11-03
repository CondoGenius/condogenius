const db = require('../models/');
const Condominium = db.condominiums;
const User = db.users;

exports.getCondominumByUserID = async (req, res) => {
  try {
    const { user_id } = req.params;

    const user = await User.findOne({
      where: {
        id: user_id
      }
    });

    if (!user) {
      return res.status(404).send({ message: "Usuário não encontrado" });
    }
  
    console.log(Condominium)

    const condominium = await Condominium.findOne({
      where: {
        id: user.condominium_id
      }
    });

    if (!condominium) {
      return res.status(404).send({ message: "Condomínio não encontrado" });
    }
  
    res.status(200).send({phone: condominium.phone, email: condominium.email });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};