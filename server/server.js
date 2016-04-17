// server.js

// 必要なパッケージの読み込み
var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var autoIncrement = require('mongoose-auto-increment');

// DBへの接続
var mongoose   = require('mongoose');
var db = mongoose.connect('mongodb://localhost/kotonoha_development');
autoIncrement.initialize(db);

// モデルの宣言
var Entry       = require('./app/models/entry');

// POSTでdataを受け取るための記述
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// 3000番を指定
var port = process.env.PORT || 3000;

// expressでAPIサーバを使うための準備
var router = express.Router();

router.use(function(req, res, next) {
    console.log('Something is happening.');
    next();
});

// 正しく実行出来るか左記にアクセスしてテストする (GET http://localhost:3000/api)
router.get('/', function(req, res) {
    res.json({ message: 'Successfully Posted a test message.' });
});

router.route('/entries')

// ユーザの作成 (POST http://localhost:3000/api/users)
    .post(function(req, res) {

        // 新しいユーザのモデルを作成する．
        var entry = new Entry();

        // ユーザの各カラムの情報を取得する．
        entry.entry_id = req.body.entry_id;
        entry.headline = req.body.headline;
        entry.detail = req.body.detail;
        entry.link = req.body.link;
        entry.tags = req.body.tags;
        entry.likes = req.body.likes;

        // ユーザ情報をセーブする．
        entry.save(function(err) {
            if (err)
                res.send(err);
            res.json({ message: 'Entry created!' });
        });
    })

// 全てのユーザ一覧を取得 (GET http://localhost:8080/api/users)
    .get(function(req, res) {
        Entry.find(function(err, entries) {
            if (err)
                res.send(err);
            res.json(entries);
        });
    });

router.route('/entries/:entry_id')

  .get(function(req, res) {
    Entry.findById(req.params.entry_id, function(err, entry) {
      if (err)
          res.send(err);
      res.json(entry);
    });
  })

  .put(function(req, res) {
    Entry.findById(req.params.entry_id, function(err, entry) {
      if (err)
        res.send(err);

        entry.entry_id = req.body.entry_id;
        entry.headline = req.body.headline;
        entry.detail = req.body.detail;
        entry.link = req.body.link;
        entry.tags = req.body.tags;
        entry.likes = req.body.likes;

      entry.save(function(err) {
        if (err)
          res.send(err);
          res.json({ message: 'Entry updated!' });
      });
    });
  })

// 1人のユーザの情報を削除 (DELETE http://localhost:3000/api/users/:user_id)
  .delete(function(req, res) {
    Entry.remove({
      _id: req.params.entry_id
    }, function(err, entry) {
      if (err)
        res.send(err);
      res.json({ message: 'Successfully deleted' });
    });
  });



// ルーティング登録
app.use('/api', router);

//サーバ起動
app.listen(port);
console.log('listen on port ' + port);
