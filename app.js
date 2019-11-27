const express = require('express');
const mysql = require('mysql');

// membuat koneksi
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'nodemysql'
})

// test koneksi database
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('Mysql Terhubung..')
});

const app = express();

// menambahkan postingan
app.get('/addpost1', (req, res) => {
    let post = { judul:'Membuat koneksi kedua', konten: 'Ini adalah postingan kedua menghubungkan koneksi mysql' };
    let sql = 'INSERT INTO posts SET ?';
    let query = db.query(sql, post, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Post 1 di tambahkan');
    });
});

// menampilkan semua data query dari database
app.get('/getpost', (req, res) => {    
    let sql = 'SELECT * From posts';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

// menampilkan 1 data yang ada di database
app.get('/getpost/:id', (req, res) => {    
    let sql = `SELECT * From posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Posts fetched...');
    });
});

// update data di database
app.get('/updatepost/:id', (req, res) => {    
    let newJudul = 'Database Mysql'
    let sql = `UPDATE posts SET judul = '${newJudul}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Post updated...');
    });
});

// delete postingan
app.get('/deletepost/:id', (req, res) => {        
    let sql = `DELETE FROM posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send('Post deleted...');
    });
});


app.listen('5000', () => {
    console.log('Server started on port 5000')
});