const db = require('../models');
const FastList = db.fast_lists;

exports.createFastList = async (req, res) => {
  try {
    const { name, phone, type } = req.body;

    const fastList = await FastList.create({
      name,
      phone,
      type
    });

    res.status(201).send(fastList);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getFastList = async (req, res) => {
  try {
    const { name, phone, type } = req.query;

    const whereClause = {
      ...(name && { name }),
      ...(phone && { phone }),
      ...(type && { type }),
    };

    const fastList = await FastList.findAll({
      where: whereClause,
    });

    res.status(200).send(fastList);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};


exports.deleteFastList = async (req, res) => {
  try {
    const { id } = req.params;

    const fastList = await FastList.findOne({
      where: {
        id
      }
    });

    if (!fastList) {
      return res.status(404).send({ message: "Contato não encontrado" });
    }

    await fastList.destroy();

    res.status(200).send({ message: "Contato deletado com sucesso" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}