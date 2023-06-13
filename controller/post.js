const PostModel = require('../model/post');

exports.getPosts = async (_, res) => {
  try {
    const result = await PostModel.findAll({
      attributes: ['id', 'title', 'content'],
    });
    res.status(200).json({
      status: 'success',
      posts: result,
    });
  } catch (er) {
    res.status(500).json({
      status: 'failed',
      message: er.message,
    });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, subtitle, content } = req.body;
    const result = await PostModel.create({ title, subtitle, content });
    res.status(201).json({
      status: 'success',
      post: result.dataValues,
    });
  } catch (er) {
    res.status(500).json({
      status: 'failed',
      message: er.message,
    });
  }
};

exports.updatepost = async (req, res) => {
  try {
    const result = await PostModel.update(
      { ...req.body },
      { returning: true, where: { id: req.params.id } }
    );
    const getUpdated = await PostModel.findOne({
      attributes: ['id', 'title'],
      where: {
        id: req.params.id,
      },
    });
    res.status(201).json({
      status: 'success',
      post: getUpdated,
    });
  } catch (er) {
    res.status(500).json({
      status: 'failed',
      message: er.message,
    });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await PostModel.destroy({
      where: {
        id,
      },
    });
    res.status(201).json({
      status: 'success',
      message: 'Post deleted successfully',
    });
  } catch (er) {
    res.status(500).json({
      status: 'failed',
      message: er.message,
    });
  }
};
