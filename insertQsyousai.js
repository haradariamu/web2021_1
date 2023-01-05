const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into Qsyousai ("QID","Q",詳細) values (5,"覚醒ゲージ","ゲージが最大まで溜まっているとスキルが覚醒スキルにアタックが奥義に変化する");
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