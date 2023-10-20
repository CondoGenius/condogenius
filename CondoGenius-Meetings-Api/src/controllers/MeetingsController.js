const db = require('../models');
const Meeting = db.meetings;

exports.createMeeting = (req, res) => {
  try {
    const {
      title,
      description,
      date,
      time,
      is_active = true,
      condominium_id,
      user_id
    } = req.body;

    const newMeeting = Meeting.create({
      title,
      description,
      date,
      time,
      is_active,
      condominium_id,
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).json({ message: 'Reunião criada com sucesso', meeting: newMeeting });
  } catch (error) { 
    res.status(500).json({ message: 'Erro ao criar reunião' });
  } 
};

exports.listMeetings = async (req, res) => {
  try {
    const { condominium_id } = req.query;

    const whereClause = {
      is_active: 1,
      ...(condominium_id && { condominium_id }),
    };

    const meetings = await Meeting.findAll({
      where: whereClause,
    });

    res.status(200).json(meetings);
  } catch (error) {
    console.error('Erro ao listar reuniões:', error);
    res.status(500).json({ message: 'Erro ao listar reuniões' });
  }
};

exports.deleteMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ message: 'Reunião não encontrada' });
    }

    await meeting.destroy();

    res.status(200).json({ message: 'Reunião deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar reunião:', error);
    res.status(500).json({ message: 'Erro ao deletar reunião' });
  }
}
