var express = require("express");
var router = express.Router();
var DBPASS = process.env.DBPASS;

var pgp = require('pg-promise')(/*PGP = postgres-promise */)
var db = pgp(`postgres://destin:${DBPASS}@localhost:5432/readyfoods`)
//destin:urQ1!1%jY9d!
//TODO: Change password and use .env to set instead of hard encoding it.


//db 
function getData(req,res, next) {    
    db.any('SELECT * FROM readyfood ')
    .then( function (data){
        console.log(data)
          res.status(200)
            .json({
              status : "success",
              data: data,
              message: "GET request successful"
          });
    })
    .catch(function (error) {
        return next(error);
    })
}

function getSingleData(req, res, next){
    var ID = parseInt(req.params.id);
    db.one('SELECT * from readyfood where id = $1', ID)
      .then(function(data){
          res.status(200)
            .json({
                status: "success:",
                data: data,
                message: "GET Single Successful"
            })
      })
      .catch(function(err){
        return next(err);
    })
}

function createData(req, res, next){
    //TODO: NEED TO SANITIZE THIS!!!
    //req.body.ID = parseInt(req.body.ID);
    console.log(req.body)
    db.none('INSERT into readyfood(name, quantity, unit, date_added, meal_type, location, expires)' +
    'values(${name}, ${quantity}, ${unit}, current_date, ${meal_type}, ${location}, ${expires})',
    req.body)

      .then(function() {
          res.status(200)
            .json({
                status: 'success',
                message: 'Inserted one new entry'
            });
      })
      .catch (function (err){
          return next(err);
      })
}
function deleteData(req,res,next){
    var ID = parseInt(req.params.id);
    db.result('delete from readyfood where id = $1', ID)
      .then(function(result){
          res.status(200)
            .json({
                status:'success',
                message: `Removed ${result.rowCount} readyfood`
            });
      })
      .catch(function(err){
          return next(err);
      })
}




//routing
router.get("/readyfood", getData);
router.get("/readyfood/:id", getSingleData);
router.post("/readyfood", createData);
router.delete("/readyfood/:id",deleteData)


module.exports = router;