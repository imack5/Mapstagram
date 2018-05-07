"use strict";

const express = require('express');
const router  = express.Router();


module.exports = (knex) => {

// ---------------------------------
// End points for queries to the db
// ---------------------------------

	router.get("/maps/data/:mapid", (req, res) => {
		knex('maps')
			.leftOuterJoin('pins','maps.id','pins.map_id')
			.where('maps.id', req.params.mapid)
			.select('maps.title AS m_title', 'maps.description AS m_description', 'maps.created_at AS m_createdat', 'maps.user_id', 'pins.* AS p')
			.then( result => { res.json(result) })
	});

	router.get("/maps/data", (req, res) => {
		knex('maps')
			.select()
			.then( result => { res.json(result) })
	});

	router.get("/maps/:userid/data", (req, res) => {
		knex('maps')
			.select()
			.where('user_id', req.params.userid)
			.then( result => { res.json(result) })
	});


  return router;
}
