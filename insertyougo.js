const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into QA ("Q","A") values ("基本","このゲームを楽しむ上で知っとくべき基本知識");
`

db.serialize( () => {
	db.run( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "データを追加しました" );
	});
});