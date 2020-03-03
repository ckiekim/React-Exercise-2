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

app.get('/api/customer/:id', (req, res) => {
    let idVal = parseInt(req.params.id);
    dm.getCustomerById(idVal, function(user) {
        //console.log(user);
        res.send(user);
    });
});
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
    //console.log(params);
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
// 이미지가 바뀌지 않았을 때
app.post('/api/customer', (req, res) => {
    let id = req.body.id;
    let image = req.body.image;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job, id];
    //console.log(id, image, name, birthday, gender, job);
    dm.updateCustomer(params, function() {
        res.send('OK');
    });
});
// 이미지가 바뀌었을 때
app.post('/api/customer2', upload.single('image'), (req, res) => {
    let id = req.body.id;
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job, id];
    //console.log(params);
    dm.updateCustomer(params, function() {
        res.send('OK');
    });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
