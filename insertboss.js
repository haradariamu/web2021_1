const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
insert into boss ("名前","ステージ","覚醒ゲージ","HP",攻撃力","防御力","素早さ","スタイル","クラス","攻略の基本") values ("アカマル","１－９",8,26783,1643,631,488,"バースト","スナイパー","基本的にあまりスキルを打たれたくない相手なので感電を利用すると戦闘が楽になるそのほかにもフォトン破壊を利用すると相手に行動をさせずに戦闘を行える。");
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