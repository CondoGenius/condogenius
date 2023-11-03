const db = require('../models');
const FastList = db.fast_lists;

exports.createFastList = async (req, res) => {
  try {
    const { name, phone } = req.body;

    const fastList = await FastList.create({
      name,
      phone
    });

    res.status(201).send(fastList);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getFastList = async (req, res) => {
  try {
    const fastList = await FastList.findAll();

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
      return res.status(404).send({ message: "Lista não encontrada" });
    }

    await fastList.destroy();

    res.status(200).send({ message: "Lista deletada com sucesso" });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}