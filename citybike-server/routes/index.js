
const { response } = require("express");
const express = require("express");
const router = express.Router();
const fetch = require('node-fetch');

router.get("/", (req, res) => {
  fetch("http://api.citybik.es/v2/networks/decobike-miami-beach")
  .then(res => res.json())
  .then(json => res.send({response: json, message: "Request Ok"}).status(200));
});

module.exports = router;