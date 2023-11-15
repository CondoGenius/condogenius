const db = require('../models');
const Comment = db.comments;
const User = db.users;
const Resident = db.residents;
const Admin = db.administrators;


exports.createComment = async (req, res) => {
  try {
    const {
      post_id,
      content,
      user_id
    } = req.body;

    const newComment = await Comment.create({
      post_id,
      content,
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });

    res.status(201).json({ message: 'Comentário criado com sucesso', comment: newComment });
  } catch (error) { 
    res.status(500).json({ message: 'Erro ao criar comentário' });
  } 
};

exports.listComments = async (req, res) => {
  try {
    const { post_id } = req.params;

    const comments = await Comment.findAll({
      where: {
        post_id: post_id
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'email'],
          include: [
            {
              model: Resident,
              as: 'resident',
              attributes: ['name', 'last_name']
            },
            {
              model: Admin,
              as: 'administrator',
              attributes: ['name', 'last_name']
            }
          ]
        }
      ],
      order: [
        ['created_at', 'DESC']
      ]
    });

    const commentsWithUser = comments.map(comment => {
      let name = '';
      let last_name = '';
      
      if (comment.user.resident) {
        name = comment.user.resident.name;
        last_name = comment.user.resident.last_name;
      } else {
        name = comment.user.administrator.name;
        last_name = comment.user.administrator.last_name;
      }
      
      let formattedComment = {
        id: comment.id,
        post_id: comment.post_id,
        content: comment.content,
        created_at: comment.createdAt,
        updated_at: comment.updatedAt,
        user: {
          id: comment.user.id,
          name: name,
          last_name: last_name
        }
      }

      console.log(formattedComment);

      return formattedComment;
    });

    res.status(200).json(commentsWithUser);
  } catch (error) {
    console.error('Erro ao listar comentários:', error);
    res.status(500).json({ message: 'Erro ao listar comentários' });
  }
};

exports.getComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.findOne({
      where: {
        id: id
      }
    });

    res.status(200).json(comment);
  } catch (error) {
    console.error('Erro ao listar comentários:', error);
    res.status(500).json({ message: 'Erro ao listar comentários' });
  }
};

exports.updateComment = async (req, res) => {
  try {
    const { id } = req.params

    const {
      content,
    } = req.body;

    const comment = await Comment.update({
      content,
      updated_at: new Date()
    }, {
      where: {
        id: id
      }
    });

    res.status(200).json({ message: 'Comentário atualizado com sucesso', comment: comment });
  } catch (error) {
    console.error('Erro ao atualizar comentário:', error);
    res.status(500).json({ message: 'Erro ao atualizar comentário' });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    const comment = await Comment.destroy({
      where: {
        id: id
      }
    });

    res.status(200).json({ message: 'Comentário deletado com sucesso', comment: comment });
  } catch (error) {
    console.error('Erro ao deletar comentário:', error);
    res.status(500).json({ message: 'Erro ao deletar comentário' });
  }
};