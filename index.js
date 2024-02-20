const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const User = require('./models/user.model.js')
const jwt = require('jsonwebtoken')

const PORT = process.env.PORT || 3030;

app.use(cors())
app.use(express.json())

mongoose.connect(
  `mongodb+srv://a:a@c0.jclsh5d.mongodb.net/kik?retryWrites=true&w=majority`,
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});


app.get('/hello', (req, res) => {
  console.log("Hello world indeed");
  res.send('hello world')
})






app.post('/api/register', async (req, res) => {
  try {
    await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    })
    res.json({ status: 'ok' })
  } catch (err) {
    res.json({ status: 'error', error: 'Duplicate' })
  }
})


app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
    password: req.body.password,
  })


  if (user) {
    const token = jwt.sign(
      {
        name: user.name,
        email: user.email,
      }, 'secret123')


    return res.json({ status: 'ok', user: token, user: user._id })
  } else {
    return res.json({ status: 'error', user: false })
  }
})


app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});