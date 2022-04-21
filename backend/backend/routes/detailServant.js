const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");

router = express.Router();

// Require multer for file upload
const multer = require("multer");
// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./static/uploads");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

//Insert Data servant
router.post(
  "/detailServant/add", async function (req, res, next) {
      const uri = req.body.image;
      let uriArray = [];

      if (!uri) {
        return res.status(400).json({ message: "Please upload a URL image" });
      }

      const name = req.body.name;
      const atk = req.body.atk;
      const hp = req.body.hp;
      const attribute = req.body.attribute;
      const growth_curve = req.body.growth_curve;
      const star_absorption = req.body.star_absorption;
      const star_generation = req.body.star_generation;
      const np_charge_atk = req.body.np_charge_atk;
      const np_charge_def = req.body.np_charge_def;
      const death_rate = req.body.death_rate;
      const alignments = req.body.alignments;
      const gender = req.body.gender;
      const stats = req.body.stats;
      const bond_level = req.body.bond_level;
      const deck_card = req.body.deck_card;

      const class_name = req.body.class_name;

      const conn = await pool.getConnection();
      // Begin transaction
      await conn.beginTransaction();

      try {
        let [rows, cols] = await conn.query('SELECT class_id FROM class WHERE class_name = ?', [class_name]);
        var class_id = rows[0].class_id


        let results = await conn.query(
          "insert into SERVANT(`name`, atk, hp, attribute, growth_curve, star_absorption, star_generation, np_charge_atk, np_charge_def, death_rate, alignments, gender, stats, bond_level, deck_card, class_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
          [name, atk, hp, attribute, growth_curve, star_absorption, star_generation, np_charge_atk, np_charge_def, death_rate, alignments, gender, stats, bond_level, deck_card, class_id]
        );

        const servantId = results[0].insertId

        req.body.image.forEach((uri, index) => {
          let List = [index+1, uri, servantId, index+1];
          uriArray.push(List);
        });

        await conn.query(
          "INSERT INTO images(stage, saint_graphs, servant_id, illustrator_id) VALUES ?;",
          [uriArray]
        );

        await conn.commit();
        res.send("Insert success!");
      } catch (err) {
        console.log(err);
        await conn.rollback();
        return res.status(400).json(err);
      } finally {
        console.log("finally");
        conn.release();
      }
  }
);

//filter Path
router.get("/detailServant/filter", async function (req, res, next) {
  try {

    const check = req.query.class
    const convert = JSON.stringify(check)
    // var val = "(" + convert + ")"
    var re = convert.replace("[", "(");
    var re2 = re.replace("]", ")");

    const sql0 = "SELECT s.name, s.id, s.atk, s.stats, i.saint_graphs FROM servant AS s RIGHT JOIN images AS i ON (s.id = i.servant_id) join class AS c on (c.class_id = s.class_id)  WHERE i.stage = ? and c.class_name in "
    // console.log(sql0 + re2)

    const [rows, fields] = await pool.query(sql0 + re2, [1]);
    return res.json(rows);

  } catch (error) {
    console.log(error)
    return res.status(400).json(error)
  }
})

router.get("/detailServant/filter/sort", async function (req, res, next) {
  try {
    const sort = req.query.sort
    console.log(sort)
    // const test = 'select s.name, s.stats, i.saint_graphs from servant as s join images as i on (s.id = i.servant_id) WHERE i.stage = ? order by atk'
    const sql = 'SELECT s.name, s.stats, i.saint_graphs FROM servant AS s JOIN images AS i ON (s.id = i.servant_id) WHERE i.stage = ? order by '
    const [rows, fields] = await pool.query(sql + sort, [1]);
    return res.json(rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})



router.get("/detailServant/:id", function (req, res, next) {
  // Query data from 3 tables
  const sql0 = "SELECT * FROM servant WHERe id = ?"
  const promise0 = pool.query(sql0, [req.params.id]);

  const sql1 = "SELECT i.saint_graphs, i.stage, il.name FROM servant AS s join images AS i ON (s.id = i.servant_id) join illustrator AS il ON (il.id = i.illustrator_id) WHERe s.id = ?"
  const promise1 = pool.query(sql1, [req.params.id]);

  const sql2 = "SELECT t.traits FROM servant AS s join servant_traits AS st ON (s.id = st.servant_id) join traits AS t ON (t.id = st.traits_id) WHERE s.id = ?"
  const promise2 = pool.query(sql2, [req.params.id]);

  const sql3 = "SELECT va.name FROM servant AS s join servant_voce_actor AS sva ON (s.id = sva.servant_id) join voice_actor AS va ON (va.id = sva.voice_actor_id) WHERE s.id = ?"
  const promise3 = pool.query(sql3, [req.params.id]);

  // Use Promise.all() to make sure that all queries are successful
  Promise.all([promise0, promise1, promise2, promise3])
    .then((results) => {
      const [servants, servantFields] = results[0];
      const [images, imageFields] = results[1];
      const [traits, traitFields] = results[2];
      const [voice, voiceFields] = results[3];
      res.json({
        servant: servants,
        image: images,
        trait: traits,
        voice: voice[0],
        error: null,
      });
    })
    .catch((err) => {
      return res.status(500).json(err);
    });
});


router.get("/detailServant/dialog/:id", async function (req, res, next) {
  try {
    const sql = "select servant.name, dialogue.occasion, dialogue.dialogue from servant join dialogue on (dialogue.servant_id = servant.id) where servant.id = ?"
    const [rows, cols] = await pool.query(sql, [req.params.id]);


    return res.json(rows);
  } catch (error) {
      console.log(error)
      return res.status(400).json(error)
  }
})

router.get("/detailServant/image/:id", async function (req, res, next) {
  try {

    const sql = 'SELECT s.id, s.name, s.stats, i.saint_graphs, i.stage FROM servant AS s JOIN images AS i ON (s.id = i.servant_id) where s.id = ?'
    const [rows, fields] = await pool.query(sql, [req.params.id]);
    return res.json(rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

router.get("/detailServant/ascension/:id", async function (req, res, next) {
  try {
    const sql = 'SELECT s.id, s.name, s.stats, sa.ascension_id, a.rank, a.qp, ai.item, ai.qty FROM servant AS s JOIN servant_ascension as sa ON (s.id = sa.servant_id) join ascension as a ON (a.id = sa.ascension_id) join ascension_item as ai ON (a.id = ai.ascension_id) where s.id = ?'
    const [rows, fields] = await pool.query(sql, [req.params.id]);

    return res.json(rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

router.get("/detailServant/biography/:id", async function (req, res, next) {
  try {

    const sql = 'SELECT s.id, s.name, s.stats, b.description, b.unlock_condition FROM servant AS s JOIN biography AS b ON (s.id = b.servant_id) where s.id = ?'
    const [rows, fields] = await pool.query(sql, [req.params.id]);
    return res.json(rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})

router.get("/detailServant/class/:id", async function (req, res, next) {
  try {
    const sql = 'SELECT s.name, c.class_name FROM servant AS s JOIN class as c ON (s.class_id = c.class_id) where s.id = ?'
    const [rows, fields] = await pool.query(sql, [req.params.id]);

    return res.json(rows);
  } catch (err) {
    console.log(err)
    return res.status(500).json(err)
  }
})


// Update servantDetail
router.put('/detailServant/update/:id', async function (req, res, next) {
  try {
    const name = req.body.name;
    const atk = req.body.atk;
    const hp = req.body.hp;
    const attribute = req.body.attribute;
    const growth_curve = req.body.growth_curve;
    const star_absorption = req.body.star_absorption;
    const star_generation = req.body.star_generation;
    const np_charge_atk = req.body.np_charge_atk;
    const np_charge_def = req.body.np_charge_def;
    const death_rate = req.body.death_rate;
    const alignments = req.body.alignments;
    const gender = req.body.gender;
    const stats = req.body.stats;
    const bond_level = req.body.bond_level;
    const deck_card = req.body.deck_card;

      const [rows1, fields1] = await pool.query(
          'UPDATE servant SET name = ?, atk = ?, hp = ?, attribute = ?, growth_curve = ?, star_absorption = ?, star_generation = ?, np_charge_atk = ?, np_charge_def = ?, death_rate = ?, alignments = ?, gender = ?, stats = ?, bond_level = ?, deck_card = ? WHERE id=?', 
          [name, atk, hp, attribute, growth_curve, star_absorption, star_generation, np_charge_atk, np_charge_def, death_rate, alignments, gender, stats, bond_level, deck_card, req.params.id]
      )

      // console.log(rows1)
      res.json({ message: "Update Success!",
      name: name,
      atk: atk,
      hp: hp,
      attribute: attribute,
      growth_curve: growth_curve,
      star_absorption: star_absorption,
      star_generation: star_generation,
      np_charge_atk: np_charge_atk,
      np_charge_def: np_charge_def,
      death_rate: death_rate,
      alignments: alignments,
      gender: gender,
      stats: stats,
      bond_level: bond_level,
      deck_card: deck_card
    })
  } catch (error) {
      res.status(500).json(error)
  }
});


// delete servant and image
router.delete("/detailServant/delete/:id", async function (req, res, next) {
  // Your code here
  const conn = await pool.getConnection();
  await conn.beginTransaction();

  try {
    console.log(req.params.id)
    const id = parseInt(req.params.id)
    // Delete images
    await conn.query("DELETE FROM servant_skills WHERE `servant_id` = ?", [id]);
    await conn.query("DELETE FROM servant_ascension WHERE `servant_id` = ?", [id]);
    await conn.query("DELETE FROM servant_voce_actor WHERE `servant_id` = ?", [id]);
    await conn.query("DELETE FROM biography WHERE `servant_id` = ?", [id]);
    await conn.query("DELETE FROM dialogue WHERE `servant_id` = ?", [id]);
    await conn.query("DELETE FROM servant_traits WHERE `servant_id` = ?", [id]);
    await conn.query("DELETE FROM servant_team WHERE `servant_id` = ?", [id]);
    await conn.query("DELETE FROM `images` WHERE `servant_id` = ?", [
      id,
    ]);
    // Delete the selected blog
    const [ rows2, fields2] = await conn.query("DELETE FROM servant WHERE id = ?;", [
      id,
    ]);

    if (rows2.affectedRows === 1) {
      await conn.commit();
      res.send("Delete success!");
    } else {
      throw "Cannot delete the selected servant";
    }
  } catch (err) {
    console.log(err)
    await conn.rollback();
    return res.status(500).json(err);
  } finally {
    conn.release();
  }
});

exports.router = router;
