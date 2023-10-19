const db = require('../models');
const Resident = db.residents;

// Função para criar um novo residente
exports.createResident = async (req, res) => {
  try {
    const {
      user_id = null,
      residence_id,
      cpf,
      email,
      name,
      last_name,
      contact,
      is_active = true,
      birthday
    } = req.body;

    const cleanedCpf = cpf ? cpf.replace(/[^\d]/g, '') : '';

    const novoResidente = await Resident.create({
      user_id,
      residence_id,
      cpf: cleanedCpf,
      email,
      name,
      last_name,
      contact,
      is_active,
      birthday: new Date(birthday),
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
    const { name, cpf, residence_id, email } = req.query;

    const cleanedCpf = cpf ? cpf.replace(/[^\d]/g, '') : '';

    const whereClause = {
      is_active: 1,
      ...(name && { name }),
      ...(email && { email }),
      ...(cpf && { cpf: cleanedCpf }),
      ...(residence_id && { residence_id }),
    };

    const residents = await Resident.findAll({
      where: whereClause,
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

    const resident = await Resident.findOne({
      where: {
        id,
        is_active: 1
      }
    });

    if (!resident) {
      return res.status(404).json({ message: 'Residente não encontrado' });
    }

    res.status(200).json(resident);
  } catch (error) {
    console.error('Erro ao listar residente:', error);
    res.status(500).json({ message: 'Erro ao listar residente' });
  }
};

exports.listResidentByCpf = async (req, res) => {
  try {
    const { cpf } = req.params;

    const cleanedCpf = cpf ? cpf.replace(/[^\d]/g, '') : '';

    const resident = await Resident.findOne({
      where: {
        cpf: cleanedCpf,
        is_active: 1
      }
    });

    if (!resident) {
      return res.status(404).json({ message: 'Residente não encontrado' });
    }

    res.status(200).json(resident);
  } catch (error) {
    console.error('Erro ao listar residente por CPF:', error);
    res.status(500).json({ message: 'Erro ao listar residente por CPF' });
  }
};

exports.listResidentByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const resident = await Resident.findOne({
      where: {
        user_id,
        is_active: 1
      }
    });

    if (!resident) {
      return res.status(404).json({ message: 'Residente não encontrado' });
    }

    res.status(200).json(resident);
  } catch (error) {
    console.error('Erro ao listar residente por user_id:', error);
    res.status(500).json({ message: 'Erro ao listar residente por user_id' });
  }
};

exports.updateResident = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      user_id = null,
      residence_id,
      cpf,
      email,
      name,
      last_name,
      contact,
      is_active,
      birthday
    } = req.body;

    const resident = await Resident.findByPk(id);

    if (!resident) {
      return res.status(404).json({ message: 'Residente não encontrado' });
    }

    cleanedCpf = cpf.replace(/[^\d]/g, '');

    await resident.update({
      user_id,
      residence_id,
      cpf: cleanedCpf,
      email,
      name,
      last_name,
      contact,
      is_active,
      birthday: new Date(birthday)
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