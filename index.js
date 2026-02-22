const express = require('express');
const connectDB = require('./database/config');
require('dotenv').config();




const app = express();


connectDB();



// Reading and parsing
app.use(express.json());




//Routes
// TODO Auth, New user, login, renew token

app.use('/api/auth', require('./routes/auth'))


//CRUD



app.use(express.static('public'));

app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${3001}`);
})





