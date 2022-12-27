const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

let sql = `
select id, 名前 from KS;
`

db.serialize( () => {
	db.all( sql, (error, row) => {
		if(error) {
			console.log('Error: ', error );
			return;
		}
		for( let data of row ) {
			console.log( data.id + ' : ' + data.名前 );
		}
	});
});
