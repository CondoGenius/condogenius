const db = require('../models');
const Post = db.posts;
const Comment = db.comments;
const User = db.users;
const Admin = db.administrators;
const Resident = db.residents;
const Poll = db.polls;
const PollOption = db.poll_options;
const PollVote = db.poll_votes;

exports.createPost = async (req, res) => {
  try {
    const {
      content,
      fixed,
      user_id
    } = req.body;

    let fixedValue = fixed ? fixed : false;

    const newPost = new Post({
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
          attributes: ['id', 'content'],
          include: [
            {
              model: PollOption,
              as: 'options',
              attributes: ['id', 'title', 'percentage_of_votes', 'quantity_of_votes'],
              include: [
                {
                  model: PollVote,
                  as: 'votes',
                  attributes: ['user_id']
                }
              ]
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
      
      order: [ ['fixed', 'DESC'], ['createdAt', 'DESC']]
    });

    const formattedPosts = posts.map(post => {
      const formattedUser = {
        email: post.user.email,
        name: null,
        last_name: null
      };

      if (post.user.resident) {
        formattedUser.name = post.user.resident.name;
        formattedUser.last_name = post.user.resident.last_name;
      } else if (post.user.administrator) {
        formattedUser.name = post.user.administrator.name;
        formattedUser.last_name = post.user.administrator.last_name;
      }

      const formattedComments = []

      post?.comments?.forEach(comment => {
        let formattedComment = {
          id: comment?.id,
          user_id: comment.user_id,
          post_id: comment.post_id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          user: {
            email: comment.user.email,
            name: null,
            last_name: null
          }
        };

        if (comment.user.resident) {
          formattedComment.user.name = comment.user.resident.name;
          formattedComment.user.last_name = comment.user.resident.last_name;
        } else if (comment.user.administrator) {
          formattedComment.user.name = comment.user.administrator.name;
          formattedComment.user.last_name = comment.user.administrator.last_name;
        }

        formattedComments.push(formattedComment);
      });

      const poll = post.poll;

      const formattedOptions = poll?.options?.map(option => {
        const formattedVotes = option.votes.map(vote => {
          return vote.user_id;
        });

        return {
          id: option?.id,
          title: option.title,
          percentage_of_votes: option?.percentage_of_votes,
          quantity_of_votes: option?.quantity_of_votes,
          votes: formattedVotes
        };
      });

      const formattedPoll =  {
        id: poll?.id,
        content: poll?.content,
        options: formattedOptions
      };

      return {
        id: post.id,
        user_id: post.user_id,
        content: post.content,
        fixed: post.fixed,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: formattedUser,
        poll: formattedPoll,
        comments: formattedComments,
      };
    });

    res.status(200).json(formattedPosts);
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
          attributes: ['title', 'content'],
          include: [
            {
              model: PollOption,
              as: 'options',
              attributes: ['id', 'title', 'percentage_of_votes', 'quantity_of_votes'],
              include: [
                {
                  model: PollVote,
                  as: 'votes',
                  attributes: ['user_id']
                }
              ]
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
              ]
            }
          ]
        }
      ],

      order: [ ['fixed', 'DESC'], ['createdAt', 'DESC']]
    });

    const formattedPosts = posts.map(post => {
      const formattedUser = {
        email: post.user.email,
        name: null,
        last_name: null
      };

      if (post.user.resident) {
        formattedUser.name = post.user.resident.name;
        formattedUser.last_name = post.user.resident.last_name;
      } else if (post.user.administrator) {
        formattedUser.name = post.user.administrator.name;
        formattedUser.last_name = post.user.administrator.last_name;
      }

      const formattedComments = []

      post?.comments?.forEach(comment => {
        let formattedComment = {
          id: comment.id,
          user_id: comment.user_id,
          post_id: comment.post_id,
          content: comment.content,
          createdAt: comment.createdAt,
          updatedAt: comment.updatedAt,
          user: {
            email: comment.user.email,
            name: null,
            last_name: null
          }
        };

        if (comment.user.resident) {
          formattedComment.user.name = comment.user.resident.name;
          formattedComment.user.last_name = comment.user.resident.last_name;
        } else if (comment.user.administrator) {
          formattedComment.user.name = comment.user.administrator.name;
          formattedComment.user.last_name = comment.user.administrator.last_name;
        }

        formattedComments.push(formattedComment);
      });

      const poll = post.poll;

      const formattedOptions = poll?.options?.map(option => {
        const formattedVotes = option.votes.map(vote => {
          return vote.user_id;
        });

        return {
          id: option?.id,
          title: option.title,
          percentage_of_votes: option?.percentage_of_votes,
          quantity_of_votes: option?.quantity_of_votes,
          votes: formattedVotes
        };
      });

      const formattedPoll =  {
        id: poll?.id,
        content: poll?.content,
        options: formattedOptions
      };

      return {
        id: post.id,
        user_id: post.user_id,
        content: post.content,
        fixed: post.fixed,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
        user: formattedUser,
        poll: formattedPoll,
        comments: formattedComments,
      };
    });

    res.status(200).json(formattedPosts);
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
          attributes: ['title', 'content'],
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
      content,
      fixed,
      user_id
    } = req.body;

    const post = await Post.update({
      title,
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

    let status = post.fixed ? 'fixado' : 'desfixado';

    res.status(200).json({ message: `Post ${status} com sucesso.`, post: post });
  } catch (error) {
    console.error('Erro ao fixar post:', error);
    res.status(500).json({ message: 'Erro ao fixar post' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.destroy({
      where: {
        post_id: id
      }
    });

    const poll = await Poll.findOne({
      where: {
        post_id: id
      }
    });

    console.log(poll);

    if (poll) {
      const pollVotes = await PollVote.destroy({
        where: {
          poll_option_id: {
            [db.Sequelize.Op.in]: db.Sequelize.literal(
              `(SELECT id FROM poll_options WHERE poll_id IN (SELECT id FROM polls WHERE post_id = ${id}))`
            ),
          }
        }
      });

      const pollOptions = await PollOption.destroy({
        where: {
          poll_id: {
            [db.Sequelize.Op.in]: db.Sequelize.literal(
              `(SELECT id FROM polls WHERE post_id = ${id})`
            ),
          },
        }
      });
  
      await poll.destroy();
    }

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