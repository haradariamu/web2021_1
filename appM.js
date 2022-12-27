const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const message = "このページはメギド72のキャラに関する情報とボスの攻略に関するページです。";
  res.render('toppageM', {mes:message});
});

app.get("/boss", (req, res) => {
    db.serialize( () => {
        db.all("select ステージ, 名前 from example;", (error, row) => {
            if( error ) {
                res.render('toppageM', {mes:"エラーです"});
            }
            res.render('boss', {data:row});
        })
    })
})

app.get("/megido", (req, res) => {
    db.serialize( () => {
        db.all("select id, 名前 from megido;", (error, row) => {
            if( error ) {
                res.render('toppageM', {mes:"エラーです"});
            }
            res.render('itirann', {data:row});
        })
    })
})

app.get("/s-megido", (req, res) => {
    db.serialize( () => {
        db.all("CREATE VIEW MKS AS select megido.名前, megido.HP, megido.攻撃力, megido.防御力, megido.素早さ,KS.名前 as KS from megido,MKS inner join KS on ( (megido.id=MKS.megido_id) and (KS.id=MKS.KS_id) );", (error, row) => {
            if( error ) {
                res.render('toppageM', {mes:"エラーです"});
            }
            res.render('megido', {data:row});
        })
    })
})
app.get("/megido1", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select megido.名前, megido.HP, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('toppageM', {mes:"エラーです"});
            }
            //console.log(data);    // ③
            res.render('select', {data:data});
        })
    })
})
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
