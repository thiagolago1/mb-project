import express from 'express';
import cors from 'cors';
import { body, validationResult } from 'express-validator';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(path.join(__dirname, '../../frontend-mb/dist')));

app.use(express.json());
app.use(cors());


app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend-mb/dist', 'index.html'));
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../frontend-mb/dist', 'index.html'));
});

app.post('/registration', [
  body('email').isEmail().withMessage('Email is not valid'),
  body('accountType').isIn(['Pessoa física', 'Pessoa jurídica']).withMessage('Account type must be either "Pessoa física" or "Pessoa jurídica"'),
  body('phone').notEmpty().withMessage('Phone number is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

  body('accountType').custom((value, { req }) => {
    if (value === 'Pessoa física') {
      if (!req.body.cpf) {
        throw new Error('CPF is required for Pessoa física');
      }
      if (!req.body.name) {
        throw new Error('Name is required for Pessoa física');
      }
      if (!req.body.birthday) {
        throw new Error('Birthday is required for Pessoa física');
      }
    }
    return true;
  }),

  body('accountType').custom((value, { req }) => {
    if (value === 'Pessoa jurídica') {
      if (!req.body.cnpj) {
        throw new Error('CNPJ is required for Pessoa jurídica');
      }
      if (!req.body.socialName) {
        throw new Error('Social name is required for Pessoa jurídica');
      }
      if (!req.body.openDate) {
        throw new Error('Open date is required for Pessoa jurídica');
      }
    }
    return true;
  })
], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array(), statusCode: 400 });
  }

  res.status(200).json({ message: "Registration successful", statusCode: 200 });
});

app.listen(3333, () => console.log('Server is running!'));

