const express = require("express");
const pool = require("../config");

router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    const search = req.query.search || ''
    let sql = 'SELECT s.name, s.id, s.stats, s.hp, s.atk, c.class_name, i.saint_graphs FROM servant AS s RIGHT JOIN images AS i ON (s.id = i.servant_id) join class as c on (c.class_id = s.class_id) WHERE i.stage = ?'
    let val = [1]

    if (search.length > 0) {
      sql += " AND s.name LIKE ?;"
      val = [1, `%${search}%`]
    }
    const [rows, fields] = await pool.query(sql, val);
    return res.json(rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
});

exports.router = router;
