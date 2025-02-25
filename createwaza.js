const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let schema = `
create table waza(
  id integer primary key,
  megidoID integer not null,
  種類 text not null,
  効果 text not null
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