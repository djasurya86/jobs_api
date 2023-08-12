const express = require('express');
const cors = require('cors');

var app = express();
const port = 50001;
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.text());
app.use(express.json());

const userRoutes = require('./src/routes/user');
const jobRoutes = require('./src/routes/job');
app.use('/user', userRoutes);
app.use('/job', jobRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});