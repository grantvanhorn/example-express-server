import { Router } from 'express';
import {
  validatePost,
} from '../lib/posts';
import Post from '../models/post';
import logger from '../lib/logger';

const postsRouter = Router();

postsRouter.get('/', (req, res) => {
  const {
    posts,
  } = req.context.models;
  const {
    user,
  } = req.query;
  const userId = String(user);

  if (user) {
    const filteredPosts = posts.filter(p => String(p.userId) === userId);
    logger({
      controller: 'post',
      method: 'index',
      result: 'success',
      message: `filter on ${ userId }`,
    });
    return res.send(filteredPosts);
  }

  logger({
    controller: 'post',
    method: 'index',
    result: 'success',
    message: `all`,
  });
  return res.send(posts);
});

postsRouter.get('/:id', (req, res) => {
  const {
    posts,
  } = req.context.models;
  const [post] = posts.filter(p => String(p.id) === String(req.params.id));

  if (!post) {
    logger({
      controller: 'post',
      method: 'get',
      result: 'failure',
      message: `post ${req.params.id} does not exist`,
    });
    return res.status(404).send('Post does not exist.');
  }

  logger({
    controller: 'post',
    method: 'get',
    result: 'success',
    message: `${req.params.id} found`,
  });
  return res.send(post);
});

postsRouter.post('/', (req, res) => {
  const newPost = new Post(req.body);

  const posts = req.context.models.posts;

  if (!validatePost(newPost)) {
    logger({
      controller: 'post',
      method: 'create',
      result: 'failure',
      message: `invalid post model`,
    });
    return res.status(400).send('invalid post model');
  }

  newPost.id = posts.length + 1;

  req.context.models.posts = [...posts, newPost];
  logger({
    controller: 'post',
    method: 'create',
    result: 'success',
    message: `${JSON.stringify(newPost)}`,
  });

  return res.send(newPost);
});

postsRouter.put('/:id', (req, res) => {
  const {
    posts,
  } = req.context.models;
  const updateBody = req.body;
  const postId = String(req.params.id);
  const [foundPost] = posts.filter(p => String(p.id) === postId);
  let updatedPost;

  if (!foundPost) {
    logger({
      controller: 'post',
      method: 'update',
      result: 'failure',
      message: `post ${postId} does not exist`,
    });
    return res.status(404).send('Post does not exist.');
  }

  posts.forEach(p => {
    if (String(p.id) === postId) {
      p.title = updateBody.title;
      p.body = updateBody.body;
      updatedPost = p;
      logger({
        controller: 'post',
        method: 'update',
        result: 'success',
        message: `${JSON.stringify(updatedPost)}`,
      });
    }
  });

  return res.send(updatedPost);
});

postsRouter.delete('/:id', (req, res) => {
  const {
    posts,
  } = req.context.models;
  const postId = String(req.params.id);
  const [postLookup] = posts.filter(p => String(p.id) === postId);

  if (!postLookup) {
    logger({
      controller: 'post',
      method: 'delete',
      result: 'failure',
      message: `${postId} does not exist`,
    });
    return res.status(404).send('Post does not exist.');
  }

  const filteredPosts = posts.filter(p => String(p.id) !== postId);
  req.context.models.posts = filteredPosts;

  logger({
    controller: 'post',
    method: 'delete',
    result: 'success',
    message: `${postId} deleted`,
  });
  return res.send(`Post ${postId} successfully deleted`);
});

export default postsRouter;
