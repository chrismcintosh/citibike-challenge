const express = require("express");
const router = express.Router();
const axios = require('axios');

// router.get("/", (req, res) => {
//   axios("http://api.citybik.es/v2/networks/decobike-miami-beach")
//   .then(res => res.json())
//   .then(json => res.send({response: json}).status(200));
// });

router.get('/',(req, res) => {
  axios.get('http://api.citybik.es/v2/networks/decobike-miami-beach').then(resp => {
    res.json(resp.data).status(200);
});
})

router.get("/test", (req, res) => {
  res.send("Hello").status(400)
});

module.exports = router;