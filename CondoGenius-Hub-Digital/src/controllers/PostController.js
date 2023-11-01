const db = require('../models');
const Post = db.posts;
const Comment = db.comments;
const User = db.users;
const Admin = db.administrators;
const Resident = db.residents;
const Poll = db.polls;
const PollOption = db.poll_options;

exports.createPost = async (req, res) => {
  try {
    const {
      title,
      content,
      fixed,
      user_id
    } = req.body;

    let fixedValue = fixed ? fixed : false;

    const newPost = new Post({
      title,
      user_id,
      content,
      fixed: fixedValue,
      created_at: new Date(),
      updated_at: new Date()
    });

    const resident = await Resident.findOne({
      where: {
        user_id: user_id
      }
    });

    const admin = await Admin.findOne({
      where: {
        user_id: user_id
      }
    });

    if (resident || admin){
      await newPost.save();

      let name = resident ? resident.name : admin.name;
      let last_name = resident ? resident.last_name : admin.last_name;

      res.status(201).json({ message: 'Post criado com sucesso', post: newPost, name: name, last_name: last_name });
    } else {
      res.status(500).json({ message: 'Erro ao criar post, residente não encontrado!' });
    }

  } catch (error) { 
    console.log(error)
    res.status(500).json({ message: 'Erro ao criar post' });
  } 
};

exports.listPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['email'],
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
        },
        {
          model: Poll,
          as: 'poll',
          attributes: ['description'],
          include: [
            {
              model: PollOption,
              as: 'options',
              attributes: ['title', 'percentage_of_votes'],
            }
          ]

        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['email'],
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
                // 
              ]
            }
          ]
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Erro ao listar posts:', error);
    res.status(500).json({ message: 'Erro ao listar posts' });
  }
};


exports.listPostsByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const posts = await Post.findAll({
      where: {
        user_id: user_id
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['email'],
          include: [
            {
              model: Resident,
              as: 'resident',
              attributes: ['name', 'last_name']
            }
          ]
        },
        {
          model: Poll,
          as: 'poll',
          attributes: ['title', 'description'],
          include: [
            {
              model: PollOption,
              as: 'options',
              attributes: ['title', 'percentage_of_votes'],
            }
          ]

        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['email'],
              include: [
                {
                  model: Resident,
                  as: 'resident',
                  attributes: ['name', 'last_name']
                }
              ]
            }
          ]
        }
      ]
    });

    res.status(200).json(posts);
  } catch (error) {
    console.error('Erro ao listar posts:', error);
    res.status(500).json({ message: 'Erro ao listar posts' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['email'],
          include: [
            {
              model: Resident,
              as: 'resident',
              attributes: ['name', 'last_name']
            }
          ]
        },
        {
          model: Poll,
          as: 'poll',
          attributes: ['title', 'description'],
          include: [
            {
              model: PollOption,
              as: 'options',
              attributes: ['title', 'percentage_of_votes'],
            }
          ]

        },
        {
          model: Comment,
          as: 'comments',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['email'],
              include: [
                {
                  model: Resident,
                  as: 'resident',
                  attributes: ['name', 'last_name']
                }
              ]
            }
          ]
        }
      ]
    });

    res.status(200).json(post);
  } catch (error) {
    console.error('Erro ao listar post:', error);
    res.status(500).json({ message: 'Erro ao listar post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      description,
      content,
      fixed,
      user_id
    } = req.body;

    const post = await Post.update({
      title,
      description,
      user_id,
      content,
      fixed,
      updated_at: new Date()
    }, {
      where: {
        id: id
      }
    });

    res.status(200).json({ message: 'Post atualizado com sucesso', post: post });
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ message: 'Erro ao atualizar post' });
  }
};

exports.pinPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: {
        id: id
      }
    });

    await post.update({
      fixed: !post.fixed,
      updated_at: new Date()
    }, {
      where: {
        id: id
      }
    });

    res.status(200).json({ message: 'Post fixado com sucesso', post: post });
  } catch (error) {
    console.error('Erro ao fixar post:', error);
    res.status(500).json({ message: 'Erro ao fixar post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.destroy({
      where: {
        id: id
      }
    });

    res.status(200).json({ message: 'Post deletado com sucesso', post: post });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    res.status(500).json({ message: 'Erro ao deletar post' });
  }
};