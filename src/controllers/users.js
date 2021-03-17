import { Router } from 'express';
import {
  validateUser,
} from '../lib/users';

const usersRouter = Router();

usersRouter.get('/', (req, res) => {
  return res.send(req.context.models.users);
});

usersRouter.post('/', (req, res) => {
  const users = req.context.models.users;
  const newUser = req.body;

  if (!validateUser(newUser)) {
    return res.status(400).send('invalid user model');
  }

  newUser.id = users.length + 1;

  req.context.models.users = [...users, newUser];

  return res.send(newUser);
});

export default usersRouter;
