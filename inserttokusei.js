const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into  tokusei("megidoID","名前","効果") values ("1","面倒くさい","最初のターンのみこのキャラの攻撃力が２５％上昇する");
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
