const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

let sql = `
insert into recode ("レースid","レース名","馬名","タイム","年","騎手") values (1,"フェブラリーステークス","カフェファラオ","1:33.8","2022-2-20","福永雄一");
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