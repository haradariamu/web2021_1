const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let schema = `
create table reace(
  id integer primary key,
  name text not null,
  kyori integer not null,
  kaisaiti text not null,
  seibetu text not null,
  nennrei integer not null
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