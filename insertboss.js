const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into boss ("名前","ステージ","覚醒ゲージ","HP","攻撃力","防御力","素早さ","スタイル","クラス") values ("アカマル","一章八節",8,26783,1643,631,488,"バースト","スナイパー" );
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