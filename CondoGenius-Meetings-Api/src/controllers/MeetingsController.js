const db = require('../models');
const { Op, QueryTypes } = require('sequelize');

const Meeting = db.meetings;
const Admin = db.admins;

const gateway_url = "http://localhost:5000/gateway/"

exports.createMeeting = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      hour,
      duration,
      user_id
    } = req.body;


    const meetingDate = new Date(`${date}T${hour}:00`);
    
    if (isNaN(meetingDate)) {
      console.log(date, hour, meetingDate)
      return res.status(400).json({ invalid_date: "Data ou hora inválida!" });
    }

    const [durationHours, durationMinutes] = duration.split(":");
    const meetingEndDate = new Date(meetingDate);
    meetingEndDate.setHours(meetingDate.getHours() + parseInt(durationHours), meetingDate.getMinutes() + parseInt(durationMinutes), 0, 0);

    // Verifica se já existe uma reunião para o mesmo dia e horário
    const existingMeeting = await Meeting.findOne({
      where: {
        [Op.and]: [
          {
            date: {
              [Op.lt]: meetingEndDate // Verifica se a data da nova reunião é antes do fim da reunião existente
            }
          },
          {
            end_date: {
              [Op.gt]: meetingDate // Verifica se a data do fim da nova reunião é depois do início da reunião existente
            }
          }
        ]
      }
    });

    if (existingMeeting) {
      return res.status(400).json({ invalid_date: "Já existe uma reunião planejada para este horário!" });
    }
  
    const admin = await Admin.findOne({ where: { user_id: user_id } });

    if (!admin) {
      return res.status(400).json({ message: 'Você precisa ser um administrador para executar esta ação!' });
    }

    var admin_name = admin.name + " " + admin.last_name

    const newMeeting = await Meeting.create({
      title,
      description,
      date: meetingDate,
      hour,
      duration,
      user_id,
      end_date: meetingEndDate,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).json({ message: 'Reunião criada com sucesso', meeting: newMeeting, admin_name: admin_name});
  } catch (error) { 
    console.log(error)
    res.status(500).json({ message: 'Erro ao criar reunião' });
  } 
};

exports.listMeetings = async (req, res) => {
  try {

    const data = await db.sequelize.query(`
    SELECT m.*, a.name AS admin_name, a.last_name AS admin_last_name
    FROM meetings m
    INNER JOIN users u ON m.user_id = u.id
    INNER JOIN administrators a ON u.id = a.user_id

     `, {
     type: QueryTypes.SELECT
    });

    res.status(200).json(data);
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

    const admin = await Admin.findOne();

    if (!admin) {
      return res.status(400).json({ message: 'Nenhum registro encontrado na tabela Admin.' });
    }

    var admin_name = admin.name + " " + admin.last_name

    const meeting = await Meeting.findByPk(id);

    if (!meeting) {
      return res.status(404).json({ message: 'Reunião não encontrada' });
    }

    res.status(200).json({ meeting, admin_name: admin_name });
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
