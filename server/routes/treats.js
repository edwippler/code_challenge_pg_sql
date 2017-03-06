var router = require('express').Router();
var pg = require('pg');
var config = {
  database: 'phi',
  host: 'localhost',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
};

var pool = new pg.Pool(config);

router.get('/', function(req, res){
  pool.connect(function(err, client, done){
    if (err) {
      console.log('error connecting to db');
      res.sendStatus(500);
    }else{
      client.query('SELECT * FROM treats;', function(err, result){
        done();
        if (err) {
          console.log('error making query');
        }else {
          res.send(result.rows);
        }
      }); //end of query
    }
  })
});//end get path

router.post('/', function(req, res){
  var treat = req.body;
  pool.connect(function(err, client, done){
    if (err) {
      console.log('error connecting to db');
      res.sendStatus(500);
    }else{
      client.query('INSERT INTO treats (name, description, pic) VALUES ($1, $2, $3);', [treat.name, treat.description, treat.url], function(err, result){
        done();
        if (err) {
          console.log('error making query');
        }else {
          res.sendStatus(201);
        }
      }); //end of query
    }
  })
});//end get path

router.get('/search:/name', function(req, res){
  var name = req.params.name;
  console.log(treat);
  pool.connect(function(err, client, done){
    if (err) {
      console.log('error connecting to db');
      res.sendStatus(500);
    }else{
      client.query('SELECT * FROM treats WHERE name ILIKE $1 ;', [treat.name], function(err, result){
        done();
        if (err) {
          console.log('error making query');
        }else {
          res.send(result.rows);
        }
      }); //end of query
    }
  })
});//end get path



module.exports = router;
