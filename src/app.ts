import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';
dotenv.config();

// all configs
import './config/db.config';
import './config/passport.config';
import swaggerSpec from './config/swagger.config';

import authController from './auth/auth.controller';
import docController from './document/document.controller';
import passport from 'passport';

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use(morgan('tiny'));
app.use(passport.initialize());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (_, res) => {
  res.redirect('/docs');
});

app.use('/api/auth', authController);
app.use('/api/doc', docController);

app.listen(port, () => console.log(`Server running on port ${port}`));
