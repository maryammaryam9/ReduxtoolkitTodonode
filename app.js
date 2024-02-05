
const express = require('express')
const cors = require('cors')
const app = express()
app.use(express.json({ limit: '1024mb', extended: true, parameterLimit: 50000 }),)
app.use(cors());
let mongoose = require("mongoose");
// maryamkhankk123
// JFdFZcXF9O0IVeeU
mongoose.connect('mongodb+srv://maryamkhankk123:JFdFZcXF9O0IVeeU@cluster0.5gzebez.mongodb.net/', { useNewUrlParser: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB: ' + err);
    });
app.use('/user', require('./routes/user'));
app.listen(4040, () => {
     console.log(" i am challing ")
 });
