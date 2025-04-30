const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const blogRoutes = require('./routes/blogs');
const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/blogApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to DB');

  app.listen(5000, () => {
    console.log('Server running on port 5000');
  });
}).catch((error) => {
  console.error('DB Connection Error:', error);
});

app.use('/api/blogs', require('./routes/blogs'));
app.use('/api/users', require('./routes/users'));
app.use('/api',require('./routes/users'));