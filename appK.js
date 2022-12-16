const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test3.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  const message = "このページは競馬に関するサイトです。";
  res.render('toppage', {mes:message});
});

app.get("/keibajyou", (req, res) => {
    db.serialize( () => {
        db.all("select * from　keibajyou ;", (error, row) => {
            if( error ) {
                res.render('toppage', {mes:"エラーです"});
            }
            res.render('keibajyou', {data:row});
        })
    })
})

app.get("/kyousouba", (req, res) => {
    db.serialize( () => {
        db.all("select * from genneki ;", (error, row) => {
            if( error ) {
                res.render('toppage', {mes:"エラーです"});
            }
            res.render('kyousouba', {data:row});
        })
    })
})

app.get("/race/:id", (req, res) => {
    db.serialize( () => {
        db.all("select id, name, course,kyori from rece where keibajyou.id="+req.params.id+";", (error, row) => {
            if( error ) {
                res.render('toppage', {mes:"エラーです"});
            }
            res.render('race', {data:row});
        })
    })
})
app.get("/uma/:id", (req, res) => {
    db.serialize( () => {
        db.all("select id, name from rece where genneki.id="+req.params.id+";", (error, row) => {
            if( error ) {
                res.render('toppage', {mes:"エラーです"});
            }
            res.render('uma', {data:row});
        })
    })
})
app.get("/top", (req, res) => {
    //console.log(req.query.pop);    // ①
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id, 都道府県, 人口 from example order by 人口" + desc + " limit " + req.query.pop + ";";
    //console.log(sql);    // ②
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('show', {mes:"エラーです"});
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
