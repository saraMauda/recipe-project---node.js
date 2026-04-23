const mongoose= require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors =require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const userRoute = require('./routes/user.route');
app.use('/api/users', userRoute);

const PORT = process.env.PORT || 3005;

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB Atlas successfully!'))
    .catch(err => console.error('Could not connect to MongoDB:', err));

app.get('/', (req, res) =>{
    res.send('the server action sucsess.');
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});