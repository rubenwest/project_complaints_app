const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const District = require("../models/district");
const R = require("ramda");

//Creamos el metodo get
router.get("/", (req, res) => {
    res.json("GET District");
});

//creamos el metodo post

router.post("/", (req, res) => {

    // expected output: "Hello World"

    let body = req.body;
    let district = new District({
        district: body.district
    });
  
    district.save((err, districtDB) => { 
      if (err) {
        console.log("Error al insertar el distrito: ",err);
        res.status(400).json({
          ok: false,
          err,
        });
      } else {
        console.log("insertado el distrito: ",districtDB);
        res.json({
          ok: true,
          district: districtDB,
        });
      }
    });
  });

router.put("/", (req, res) => {

    res.json("PUT District");
});

router.delete("/", (req,res) => {
    res.json("DELETE District");
})

module.exports = router;