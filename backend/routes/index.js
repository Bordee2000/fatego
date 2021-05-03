const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  try {

    let sql = 'SELECT * FROM servant AS s RIGHT JOIN images AS i ON (s.id = i.servant_id) WHERE i.stage = ?;'

    const [rows, fields] = await pool.query(sql, [1]);
    return res.json(rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
});

exports.router = router;
