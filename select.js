const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
select id, 名前,HP,攻撃力,防御力,素早さ,スタイル, クラス from megido;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.名前 + data.HP + data.攻撃力 + data.防御力 + data.素早さ + data.スタイル + data.クラス );
		}
	});
});
