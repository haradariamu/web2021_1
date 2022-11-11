const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let schema = `
create table recode(
  id integer primary key,
  レースid integer not null,
  レース名 text not null,
  馬名 text not null,
  時間 text not null,
  年 data not null,
  騎手 text not null
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