const express = require('express');



const app = express();



//Routes

/* app.get("/", (req, res) => {
    res.json({
        ok: true
    })
}) */

app.use(express.static('public'));

app.listen(3001, () => {
    console.log(`Server running in port ${3001}`);
})





