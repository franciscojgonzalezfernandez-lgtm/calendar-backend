const express = require('express');
const connectDB = require('./database/config');
require('dotenv').config();
const cors = require('cors')




const app = express();


connectDB();

app.use(cors());



// Reading and parsing
app.use(express.json());


app.use(express.static('public'));

//CRUD operations

//Routes
// TODO Auth, New user, login, renew token

app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))







app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${3001}`);
})





