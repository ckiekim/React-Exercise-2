const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const dm = require('./mysql-module.js');
const app = express();
const port = process.env.PORT || 5000;
const upload = multer({dest: './upload'});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/image', express.static('./upload'));

app.get('/api/customers', (req, res) => {
    dm.getCustomers(function(users) {
        res.send(users);        
    });
});
app.post('/api/customers', upload.single('image'), (req, res) => {
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    dm.addCustomer(params, function() {
        res.send('OK');
    });
});
app.delete('/api/customers/:id', (req, res) => {
    //let params = [req.params.id];       // 이렇게 해도 실행됨
    //console.log(typeof(params), params);
    let idVal = parseInt(req.params.id);
    dm.deleteCustomer(idVal, function() {
        res.send('OK');
    });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
