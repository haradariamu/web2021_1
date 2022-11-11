const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const message = "Hello world";
  res.render('toppage', {mes:message});
});

app.get("/recode", (req, res) => {
    db.serialize( () => {
        db.all("select id,レースid,レース名, 馬名, タイム, 年, 騎手　from example;", (error, row) => {
            if( error ) {
                res.render('toppage', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})

app.get("/kyousouba", (req, res) => {
    db.serialize( () => {
        db.all("select id, 馬名, 適正コース, 適正距離, 性別, 獲得賞金　from example;", (error, row) => {
            if( error ) {
                res.render('toppage', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})
app.get("/race", (req, res) => {
    db.serialize( () => {
        db.all("select id, レース名, コース, 距離, 開催地, 性別,年齢,歴代勝利馬from example;", (error, row) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
            }
            res.render('select', {data:row});
        })
    })
})
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(80, () => console.log("Example app listening on port 80!"));