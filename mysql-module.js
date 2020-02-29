const fs = require('fs');
const mysql = require('mysql');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

module.exports = {
    getConnection:     function() {
        const connection = mysql.createConnection({
            host: conf.host,
            user: conf.user,
            password: conf.password,
            port: conf.port,
            database: conf.database
        });
        connection.connect(function(err) {
            if (err) {
                console.log('mysql connection error :' + err);
            } else {
                console.log('mysql is connected successfully.');
            }
        });
        return connection;
    },
    getCustomers:  function(callback) {
        const conn = this.getConnection();
        const sql = 'select * from customer';

        conn.query(sql, function(err, rows, fields) {
            if (err)
                console.log(err);
            else
                callback(rows);
        });
        conn.end();
    }
}