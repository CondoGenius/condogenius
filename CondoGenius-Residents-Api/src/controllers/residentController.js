const db = require('../models');
const Resident = db.residents;

// Função para criar um novo residente
exports.createResident = async (req, res) => {
  try {
    const {
      user_id = null,
      residence_id,
      cpf_cnpj,
      email,
      name,
      last_name,
      contact,
      is_active,
    } = req.body;

    const novoResidente = await Resident.create({
      user_id,
      residence_id,
      cpf_cnpj,
      email,
      name,
      last_name,
      contact,
      is_active,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).json({ message: 'Residente criado com sucesso', resident: novoResidente });
  } catch (error) {
    console.error('Erro ao criar residente:', error);
    res.status(500).json({ message: 'Erro ao criar residente' });
  }
};

exports.listResidents = async (req, res) => {
  try {
    const residents = await Resident.findAll({
      where: {
        is_active: 1
      }
    });

    res.status(200).json(residents);
  } catch (error) {
    console.error('Erro ao listar residentes:', error);
    res.status(500).json({ message: 'Erro ao listar residentes' });
  }
};

exports.listResidentById = async (req, res) => {
  try {
    const { id } = req.params;

    const resident = await Resident.findByPk(id);

    if (!resident) {
      return res.status(404).json({ message: 'Residente não encontrado' });
    }

    res.status(200).json(resident);
  } catch (error) {
    console.error('Erro ao listar residente:', error);
    res.status(500).json({ message: 'Erro ao listar residente' });
  }
};

exports.updateResident = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id = null,
      residence_id,
      cpf_cnpj,
      email,
      name,
      last_name,
      contact,
      is_active,
    } = req.body;

    const resident = await Resident.findByPk(id);

    if (!resident) {
      return res.status(404).json({ message: 'Residente não encontrado' });
    }

    await resident.update({
      user_id,
      residence_id,
      cpf_cnpj,
      email,
      name,
      last_name,
      contact,
      is_active,
    });

    res.status(200).json({ message: 'Residente atualizado com sucesso', resident });
  } catch (error) {
    console.error('Erro ao atualizar residente:', error);
    res.status(500).json({ message: 'Erro ao atualizar residente' });
  }
};

exports.deleteResident = async (req, res) => { 
  try {
    const { id } = req.params;

    const resident = await Resident.findByPk(id);

    if (!resident) {
      return res.status(404).json({ message: 'Residente não encontrado' });
    }

    await resident.update({
      is_active: 0
    });

    res.status(200).json({ message: 'Residente deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar residente:', error);
    res.status(500).json({ message: 'Erro ao deletar residente' });
  }
};