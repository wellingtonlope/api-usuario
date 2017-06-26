var express = require('express'),
bodyParser = require('body-parser'),
multer = require('multer');

var upload = multer(),
app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const pool = require('./lib/db');

app.get('/usuario', function (req, res){
	pool.query('SELECT * FROM usuario', function(err, result) {
		var resultado = {}
		resultado.usuario = result.rows;
		res.json(resultado);
	});
});

app.get('/usuario/:id', function (req, res) {
	var url = req.url;
	url = url.replace('/usuario/', '');
	url = parseInt(url);
	pool.query('SELECT * FROM usuario WHERE id = ' + url, function (err ,result) {
		var resultado = {}
		resultado.usuario = result.rows;
		res.json(resultado);
	});
});

app.post('/usuario', function (req, res) {
	pool.query('INSERT INTO usuario (nome, idade) VALUES (\'' + req.body.nome +'\', ' + req.body.idade + ')', function(err, result) {
		
	});
	console.log('Espere');
	pool.query('SELECT * FROM usuario WHERE id = (SELECT MAX(id) FROM usuario)', function (err, result) {
		var resultado = {};
		resultado.usuario = result.rows;
		res.json(resultado);
	});
});

app.put('/usuario/:id', function (req, res) {
	var url = req.url;
	url = url.replace('/usuario/', '');
	url = parseInt(url);
	pool.query('UPDATE usuario SET nome = \'' + req.body.nome +'\', idade = ' + req.body.idade + ' WHERE id = ' + url, function (err, result) {
		
	});
	console.log('espere');
	pool.query('SELECT * FROM usuario WHERE id = ' + url, function (err, result) {
		var resultado = {};
		resultado.usuario = result.rows;
		res.json(resultado);
	});
});

app.delete('/usuario/:id', function (req, res) {
	var url = req.url;
	url = url.replace('/usuario/', '');
	url = parseInt(url);
	pool.query('DELETE FROM usuario WHERE id = ' + url, function (err, result) {
		console.log('deletado');
	});
	res.send('deletado');
});
app.listen(3000);