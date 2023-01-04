const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into Q-syousai ("QID",詳細) values (1,"それぞれに大まかに特徴がありラッシュは覚醒ゲージが比較的に短く速攻向きのキャラが多い、バーストは覚醒ゲージが長めのキャラが多く溜めて強力な一撃を放つキャラが多い");
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