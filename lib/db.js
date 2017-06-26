const pg = require('pg');

var config = {
	user: 'postgres', //usuário do db
	database: 'postgres', //base de dados do db
	password: 'postgres', //senha do usuario do db
	host: 'localhost', //ip do db
	port: '5432', //porta do db
	max: 10, //número maximo de clientes
	idleTimeoutMillis: 30000 //quanto tempo um cliente pode permanecer ocioso antes de ser fechado
};

const pool = new pg.Pool(config); //iniciar conexão com a pool

pool.on('error', function (err, client) {
	//se um erro acontecer 
	console.error('idle client error', err.message, err.stack);
});

//exportar um query
module.exports.query = function (text, values, callback) {
	return pool.query(text, values, callback);
};

//conectar
module.exports.connect = function (callback) {
	return pool.connect(callback);
}