const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test2.db');

let sql = `
select yuusyouba.umaid, yuusyouba.umaname, yuusyouba.kyakusitu, reace.name as name2
from yuusyouba inner join reace
on yuusyouba.katireaceid=reace.reaceid;
`

db.serialize( () => {
db.all( sql, (error, row) => {
if(error) {
console.log('Error: ', error );
return;
}
for( let yuusyouba of row ) {
console.log( yuusyouba.umaid + ' : ' + yuusyouba.umaname + ':' + yuusyouba.kyakusitu + ':'+yuusyouba.name2 );
}
});
});