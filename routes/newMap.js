const express = require("express");
const router = express.Router();

const apikey = require("../apikey");

function insertPin(db, pinObj, mapID){

  pinObj['map_id'] = Number(mapID[0]);
  console.log('PinObj', pinObj.map_id);

  db('pins')
  .insert(pinObj)
  .returning("*")
  .then(result => console.log(result))
  .catch(function(error) {
      console.error(error);
  });
}

function insertMap(db, inputString){
  console.log("woooooo");
  return new Promise(function(resolve, reject){
    console.log(inputString)
    let mapObj = inputString[0];
    db('maps')
    .insert({title: mapObj.title, description: mapObj.description, user_id: 6})
    .returning("id")
    .then(function(result){
      console.log(result)
      resolve(result);
    })
    .catch(function(error) {
        console.error(error);
    });
  });
}

module.exports = (db, apikey) => {
  router.post("/", (req, res) => {
    console.log(req.body.data)
    let inputString = req.body;

    insertMap(db, req.body)
    .then(function(result){
      inputString.forEach((element, index) => {
        if(index > 0){
          insertPin(db, element, result);
        }
      })
    }).then(res.sendStatus(200));
  });

  router.get("/", (req, res) => {
    res.render("makeMap", {
      apiKey: apikey.key
    });
  });

  return router;
};
