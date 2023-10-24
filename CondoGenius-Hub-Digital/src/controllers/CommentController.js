const db = require('../models');
const Comment = db.comments;


exports.createComment = async (req, res) => {
  try {
    const {
      post_id,
      description,
      user_id
    } = req.body;

    const newComment = await Comment.create({
      post_id,
      description,
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
      }
    });

    res.status(200).json(comments);
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
      description,
    } = req.body;

    const comment = await Comment.update({
      description,
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