const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
console.log("Connecting to:", process.env.MONGO_URI);
connectDB(process.env.MONGO_URI);

app.use('/api/auth', require('./routes/auth'));
app.use('/api/tasks', require('./routes/tasks'));

app.get('/', (req, res) => res.send('Task Manager Backend')); 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
