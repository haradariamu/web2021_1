const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let schema = `
create table megido(
  id integer primary key,
  名前 text not null,
  HP integer not null,
  攻撃力 integer not null,
  防御力 integer not null,
  素早さ integer not null,
  スタイル text not null,
  クラス text not null
);
`

db.serialize( () => {
	db.run( schema, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		console.log( "テーブルを作成しました" );
	});
});
