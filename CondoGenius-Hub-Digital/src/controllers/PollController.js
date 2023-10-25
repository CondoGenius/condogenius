const db = require('../models');
const Poll = db.polls;
const PollOption = db.poll_options;
const PollVote = db.poll_votes;

exports.createPoll = async (req, res) => {
  try {
    const {
      post_id,
      title,
      description,
      // porcentagem de votos 
      user_id
    } = req.body;

    const newPoll = await Poll.create({
      post_id,
      title,
      description,
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).json({ message: 'Enquete criada com sucesso', poll: newPoll });
  } catch (error) { 
    res.status(500).json({ message: 'Erro ao criar enquete' });
  } 
};

exports.updatePoll = async (req, res) => {
  try {
    const { id } = req.params

    const {
      title,
      description,
    } = req.body;

    const poll = await Poll.update({
      title,
      description,
      updated_at: new Date()
    }, {
      where: {
        id: id
      }
    });

    res.status(200).json({ message: 'Enquete atualizada com sucesso', poll: poll });
  } catch (error) {
    console.error('Erro ao atualizar enquete:', error);
    res.status(500).json({ message: 'Erro ao atualizar enquete' });
  }
};

exports.getPoll = async (req, res) => {
  try {
    const { id } = req.params;

    const poll = await Poll.findOne({
      where: {
        id: id
      },
      include: [{
        model: PollOption
      }]
    });

    res.status(200).json(poll);
  } catch (error) {
    console.error('Erro ao listar enquete:', error);
    res.status(500).json({ message: 'Erro ao listar enquete' });
  }
};

exports.deletePoll = async (req, res) => {
  try {
    const { id } = req.params;

    const poll = await Poll.destroy({
      where: {
        id: id
      }
    });

    res.status(200).json({ message: 'Enquete removida com sucesso', poll: poll });
  } catch (error) {
    console.error('Erro ao remover enquete:', error);
    res.status(500).json({ message: 'Erro ao remover enquete' });
  }
};

exports.addPollOption = async (req, res) => {
  try {
    const {
      poll_id,
      title
    } = req.body;

    const newPollOption = await PollOption.create({
      poll_id,
      title,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).json({ message: 'Opção de enquete criada com sucesso', pollOption: newPollOption });
  } catch (error) { 
    res.status(500).json({ message: 'Erro ao criar opção de enquete' });
  } 
};

exports.removePollOption = async (req, res) => {
  try {
    const { id } = req.params;

    const pollOption = await PollOption.destroy({
      where: {
        id: id
      }
    });

    res.status(200).json({ message: 'Opção de enquete removida com sucesso', pollOption: pollOption });
  } catch (error) {
    console.error('Erro ao remover opção de enquete:', error);
    res.status(500).json({ message: 'Erro ao remover opção de enquete' });
  }
};

exports.votePoll = async (req, res) => {
  try {
    const {
      poll_option_id,
      resident_id
    } = req.body;

    var poll_option = await PollOption.findOne({
      where: {
        id: poll_option_id
      }
    });

    if (!poll_option) {
      return res.status(404).json({ message: 'Opção de enquete não encontrada' });
    }

    // Verificar se o residente já votou nesta opção
    const existingVote = await PollVote.findOne({
      where: {
        poll_option_id: poll_option_id,
        resident_id: resident_id
      }
    });

    if (existingVote) {
      return res.status(400).json({ message: 'Este residente já votou nesta enquete' });
    }

     // Verificar se o residente já votou em outras opções desta enquete
     const otherVotes = await PollVote.findOne({
      where: {
        resident_id: resident_id
      },
      include: [{
        model: PollOption,
        where: {
          poll_id: poll_option.poll_id
        }
      }]
    });

    if (otherVotes) {
      otherVotes.destroy();
      console.log('Voto anterior removido')
    }

    const newPollVote = await Poll.create({
      poll_option_id,
      resident_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).json({ message: 'Voto computado com sucesso', pollVote: newPollVote });
  } catch (error) { 
    res.status(500).json({ message: 'Erro ao computar voto' });
  } 
}