import express from 'express';

const app = express();

app.use(express.json());

const users = [];

app.get('/registration', (req, res) => {
  console.log("GET")
})

app.post('/registration', (req, res) => {
  console.log("POST");

  // users.push({
  //   id: 1,
  //   name: "Thiago",
  //   email: "email@gmail.com"
  // });

  // console.log("users", users);
})

app.listen(3333, () => console.log('Server is running!'));

