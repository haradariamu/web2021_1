const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into waza("megidoID","種類","倍率","回数","効果") values (1,"スキル","１２５％",1,"５０％の確率で自身にアタックフォトンを１つ追加する");
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
