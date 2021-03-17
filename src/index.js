import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import models from './models';
import routes from './controllers';

const {
  PORT,
  ENV,
} = process.env;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.context = {
    models,
  };
  next();
});

app.get('/health', (req, res) => {
  res.send();
});

app.use('/users', routes.users);
app.use('/posts', routes.posts);

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT} in the ${ENV} environment!`),
);

export default app;
