const express = require('express');
require('dotenv').config();




const app = express();



//Routes

/* app.get("/", (req, res) => {
    res.json({
        ok: true
    })
}) */

app.use(express.static('public'));

app.listen(process.env.PORT, () => {
    console.log(`Server running in port ${3001}`);
})





