const db = require('../models');
const Poll = db.polls;
const Post = db.posts;
const PollOption = db.poll_options;
const PollVote = db.poll_votes;

exports.createPoll = async (req, res) => {
  try {
    const {
      title,
      content,
      user_id,
      options
    } = req.body;

    const post = await Post.create({
      content,
      user_id,
      fixed: false,
      created_at: new Date(),
      updated_at: new Date()
    });

    const poll = await Poll.create({
      post_id: post.id,
      title,
      content,
      created_at: new Date(),
      updated_at: new Date()
    });

    const pollOptions = [];
    for(const option of options) {
      const pollOption = await PollOption.create({
        poll_id: poll.id,
        title: option,
        percentage_of_votes: 0, // Inicializa a porcentagem de votos como 0
        quantity_of_votes: 0, // Inicializa a quantidade de votos como 0
        created_at: new Date(),
        updated_at: new Date()
      });

      pollOptions.push(pollOption);
    }

    res.status(201).json({ message: 'Enquete criada com sucesso', poll, pollOptions });
  } catch (error) { 
    console.log(error)
    res.status(500).json({ message: 'Erro ao criar enquete' });
  } 
};

exports.updatePoll = async (req, res) => {
  try {
    const { id } = req.params

    const {
      title,
      content,
    } = req.body;

    const poll = await Poll.update({
      title,
      content,
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
      }
    });

    const pollOptions = await PollOption.findAll({
      where: {
        poll_id: id
      }
    });

    res.status(200).json({ poll, pollOptions });
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


    console.log(req.body)
    // consultar por enquete antes de criar

    const newPollOption = await PollOption.create({
      poll_id,
      title,
      percentage_of_votes: 0,
      quantity_of_votes: 0,
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
  const {
    survey_id,
    poll_option_id,
    user_id
  } = req.body;

  var poll_option = await PollOption.findOne({
    where: {
      poll_id: survey_id,
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
      user_id: user_id
    }
  });

  if (existingVote) {
    return res.status(400).json({ message: 'Este residente já votou nesta enquete' });
  }
  
  const t = await db.sequelize.transaction(); // Inicia uma transação Sequelize

  try {
     // Verificar se o residente já votou em outras opções desta enquete
    const otherVotes = await PollVote.findOne({
      where: {
        user_id: user_id,
        poll_id: survey_id
      }
    });

    if (otherVotes) {
      otherVotes.destroy();
      console.log('Voto anterior removido')
    }

    const newPollVote = await PollVote.create({
      poll_id: survey_id,
      poll_option_id,
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

     // Contar o número total de votos para cada opção da enquete
    const totalVotesAllOptions = await PollVote.count({
      where: {
        poll_id: survey_id // Filtra por todas as opções desta enquete
      }
    });

    const pollOptions = await PollOption.findAll({
      where: {
        poll_id: survey_id
      }
    });

    const voteCounts = await PollVote.findAll({
      attributes: ['poll_option_id', [db.sequelize.fn('COUNT', db.sequelize.col('poll_option_id')), 'vote_count']],
      where: {
        poll_id: survey_id
      },
      group: ['poll_option_id']
    });

     // Atualize as porcentagens de votos na tabela PollOption
    for (const voteCount of voteCounts) {
      const { poll_option_id, vote_count } = voteCount.dataValues;
      const totalVotes = vote_count;

      // Calcule a porcentagem para esta opção da enquete
      const votePercentage = (totalVotes / totalVotesAllOptions) * 100;

      // Atualize a porcentagem no banco de dados
      await PollOption.update(
        { percentage_of_votes: votePercentage, quantity_of_votes: totalVotes, updated_at: new Date() },
        {
          where: { id: poll_option_id },
          transaction: t
        }
      );
    }

    await t.commit(); // Commit da transação
    res.status(201).json({ message: 'Voto computado com sucesso', pollVote: newPollVote });
  } catch (error) {
    console.error(error);
    await t.rollback(); // Rollback da transação em caso de erro
    res.status(500).json({ message: 'Erro ao computar voto' });
  } 
}