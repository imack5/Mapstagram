const express = require("express");
const router = express.Router();


module.exports = (db) => {
  router.get("/posts/:id", (req, res) => {
    knex('maps')
      .where('user_id', req.params.id)
      .select('*')
      .then( result => {
       // console.log("result", result);
        res.json(result);
      })

  });


  router.get("/:id", (req, res) => {
    console.log("sup")
    res.render("user_profiles");
  })

  return router;
};
