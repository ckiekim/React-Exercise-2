const express = require('express');
const bodyParser = require('body-parser');
const dm = require('./mysql-module.js');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/customers', (req, res) => {
    dm.getCustomers(function(users) {
        res.send(users);        
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
