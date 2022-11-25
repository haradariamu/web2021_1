const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let schema = `
create table yuusyouba(
  id integer primary key,
  name text not null,
  tekiseikyori text not null,
  course text not null,
  kyakusitu text not null,
  seiseki text not null,
  seibetu text not null
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