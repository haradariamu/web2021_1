const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into megido ("名前","HP","攻撃力","防御力","素早さ","スタイル","クラス") values ("ウェパル",5646,1188,287,699,5,1);
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