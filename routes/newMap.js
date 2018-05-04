const express = require("express");
const router = express.Router();

function insertPin(db, pinObj, mapID){
  console.log(mapID[0])
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

function insertMap(db){
  return new Promise(function(resolve, reject){
    db('maps')
    .insert({title: "map", description: "cool map", user_id: 1})
    .returning("id")
    .then(function(result){
      resolve(result);
    })
    .catch(function(error) {
        console.error(error);
    });
  });


}

module.exports = db => {

  router.post("/", (req, res) => {
    let inputString = req.body;

    insertMap(db)
    .then(function(result){
      inputString.forEach(element => insertPin(db, element, result));
    }).then(res.sendStatus(200));
  });

  return router;
};

