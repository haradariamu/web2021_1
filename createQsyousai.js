const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let schema = `
create table Qsyousai(
  id integer primary key,
  QID integer not null,
  Q text not null,
  詳細 text not null
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
