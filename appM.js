const express = require("express");
const app = express();

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test4.db');

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

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
        db.all("select id,名前, HP, 攻撃力, 防御力, 素早さ,スタイル,クラス from megido;", (error, row) => {
            if( error ) {
                res.render('toppageM', {mes:"エラーです"});
            }
            res.render('itirann', {data:row});
        })
    })
})

app.get("/yougo", (req, res) => {
    db.serialize( () => {
        db.all("select id,Q, A from QA;", (error, row) => {
            if( error ) {
                res.render('toppageM', {mes:"エラーです"});
            }
            res.render('yougo', {data:row});
        })
    })
})

app.get("/M-syousai", (req, res) => {
    db.serialize( () => {
        db.all("select megidoID,種類, 効果 from waza;", (error, row) => {
            if( error ) {
                res.render('toppageM', {mes:"エラーです"});
            }
            res.render('M-syousai', {data:row});
        })
    })
})
app.get("/M-syousai/:id", (req, res) => {
    db.serialize( () => {
        db.all("select megidoID, 種類, 効果 from waza where megidoID=" + req.params.id + ";", (error, row) => {
          if( error ) {
              res.render('toppageM', {mes:"エラーです"});
          }
          res.render('M-syousai', {data:row});
        } )
    })
})


app.post("/insertmegido", (req, res) => {
let sql = `
insert into megido (名前,HP,攻撃力,防御力,素早さ,クラス,スタイル) values ("` + req.body.名前 + `",` + req.body.HP + `,` + req.body.攻撃力 + `,` + req.body.防御力 + `,` + req.body.素早さ + `,"` + req.body.クラス + `","` + req.body.スタイル + `");
`
console.log(sql);
db.serialize( () => {
db.run( sql, (error, row) => {
console.log(error);
if(error) {
res.render('toppageM', {mes:"エラーです"});
}
res.redirect('/megido');
});
});
console.log(req.body);
});

app.post("/insertwaza", (req, res) => {
let sql = `
insert into waza (megidoID,種類,効果) values (` + req.body.megidoID + `,"` + req.body.種類 + `","` + req.body.効果 + `");
`
console.log(sql);
db.serialize( () => {
db.run( sql, (error, row) => {
console.log(error);
if(error) {
res.render('toppageM', {mes:"エラーです"});
}
res.redirect('/megido');
});
});
console.log(req.body);
});

app.get("/topM", (req, res) => {
    let desc = "";
    if( req.query.desc ) desc = " desc";
    let sql = "select id,名前, HP, 攻撃力, 防御力, 素早さ, クラス, スタイル from megido order by 素早さ" + desc + " limit " + req.query.pop + ";";
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('toppageM', {mes:"エラーです"});
            }
            res.render('itirann', {data:data});
        })
    })
})

app.get("/topQ", (req, res) => {
    let sql = `
search into QA (Q,A) values Q = ("` + req.body.Q + `");
`
    db.serialize( () => {
        db.all(sql, (error, data) => {
            if( error ) {
                res.render('toppageM', {mes:"エラーです"});
            }
            res.render('yougo', {data:data});
        })
    })
})
app.use(function(req, res, next) {
  res.status(404).send('ページが見つかりません');
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
