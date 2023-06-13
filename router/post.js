const express = require('express');
const router = express.Router();

const {
  createPost,
  getPosts,
  updatepost,
  deletePost,
} = require('../controller/post');

router
  .get('/', getPosts)
  .post('/', createPost)
  .patch('/:id', updatepost)
  .delete('/:id', deletePost);

module.exports = router;
