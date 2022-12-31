const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into QA ("Q","A") values ("スタイル","戦い方の種類ラッシュ、カウンター、バーストの三種類に分かれている。");
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