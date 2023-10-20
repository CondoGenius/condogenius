const db = require('../models');
const Meeting = db.meetings;

exports.createMeeting = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      hour,
      user_id
    } = req.body;

    const newMeeting = await Meeting.create({
      title,
      description,
      date,
      hour,
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
    const meetings = await Meeting.findAll();

    res.status(200).json(meetings);
  } catch (error) {
    console.error('Erro ao listar reuniões:', error);
    res.status(500).json({ message: 'Erro ao listar reuniões' });
  }
};

exports.listMeetingsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const meetings = await Meeting.findAll({
      where: {
        user_id: user_id
      }
    });

    res.status(200).json(meetings);
  } catch (error) {
    console.error('Erro ao listar reuniões:', error);
    res.status(500).json({ message: 'Erro ao listar reuniões' });
  }
};

exports.getMeeting = async (req, res) => {
  try {
    const { id } = req.params;

    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ message: 'Reunião não encontrada' });
    }

    res.status(200).json(meeting);
  } catch (error) {
    console.error('Erro ao listar reunião:', error);
    res.status(500).json({ message: 'Erro ao listar reunião' });
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
