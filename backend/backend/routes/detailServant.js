const express = require("express");
const path = require("path");
const pool = require("../config");
const fs = require("fs");

router = express.Router();

// Require multer for file upload
// const multer = require("multer");
// // SET STORAGE
// var storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, "./static/uploads");
//   },
//   filename: function (req, file, callback) {
//     callback(
//       null,
//       file.fieldname + "-" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });
// const upload = multer({ storage: storage });

// Like blog that id = blogId
// router.put("/blogs/addlike/:blogId", async function (req, res, next) {
//   const conn = await pool.getConnection();
//   // Begin transaction
//   await conn.beginTransaction();

//   try {
//     let [
//       rows,
//       fields,
//     ] = await conn.query("SELECT `like` FROM `blogs` WHERE `id` = ?", [
//       req.params.blogId,
//     ]);
//     let like = rows[0].like + 1;

//     await conn.query("UPDATE `blogs` SET `like` = ? WHERE `id` = ?", [
//       like,
//       req.params.blogId,
//     ]);

//     await conn.commit();
//     res.json({ like: like });
//   } catch (err) {
//     await conn.rollback();
//     return res.status(500).json(err);
//   } finally {
//     console.log("finally");
//     conn.release();
//   }
// });

//Insert Data servant
router.post(
  "/detailServant", async function (req, res, next) {
      // const file = req.files;
      // let pathArray = [];

      // if (!file) {
      //   return res.status(400).json({ message: "Please upload a file" });
      // }

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
        // const blogId = results[0].insertId;

        // req.files.forEach((file, index) => {
        //   let path = [blogId, file.path.substring(6), index == 0 ? 1 : 0];
        //   pathArray.push(path);
        // });

        await conn.query(
          "insert into SERVANT(`name`, atk, hp, attribute, growth_curve, star_absorption, star_generation, np_charge_atk, np_charge_def, death_rate, alignments, gender, stats, bond_level, deck_card, class_id) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);",
          [name, atk, hp, attribute, growth_curve, star_absorption, star_generation, np_charge_atk, np_charge_def, death_rate, alignments, gender, stats, bond_level, deck_card, class_id]
        );

        await conn.commit();
        res.send("Insert success!");
      } catch (err) {
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

    const sql0 = "SELECT s.name, s.id, s.atk, s.stats, i.saint_graphs FROM servant AS s JOIN images AS i ON (s.id = i.servant_id) join class AS c on (c.class_id = s.class_id)  WHERE i.stage = ? and c.class_name in "
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


// router.get("/detailServant/skill/:id", function (req, res, next) {
//   const sql = "SELECT *"
// })


// Blog detail
router.get("/detailServant/:id", function (req, res, next) {
  // Query data from 3 tables
  const sql0 = "SELECT * FROM servant WHERe id = ?"
  // const val = "[1, 2, 3]"
  // var re = val.replace("[", "(");
  // var re2 = re.replace("]", ")");
  // console.log(sql0 + re2)
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
    // console.log(req.params.id)
    // console.log(rows)

    return res.json(rows);
  } catch (error) {
      console.log(error)
      return res.status(400).json(error)
  }
})

router.get("/detailServant/image/:id", async function (req, res, next) {
  try {
    // const sort = req.query.sort
    // console.log(sort)
    // const test = 'select s.name, s.stats, i.saint_graphs from servant as s join images as i on (s.id = i.servant_id) WHERE i.stage = ? order by atk'
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
    // const sort = req.query.sort
    // console.log(sort)
    // const test = 'select s.name, s.stats, i.saint_graphs from servant as s join images as i on (s.id = i.servant_id) WHERE i.stage = ? order by atk'
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

// router.put("/blogs/:id", upload.array("myImage", 5), async function (req, res, next) {
//   // Your code here
//   const file = req.files;
//   let pathArray = []

//   if (!file) {
//     const error = new Error("Please upload a file");
//     error.httpStatusCode = 400;
//     next(error);
//   }

//   const title = req.body.title;
//   const content = req.body.content;
//   const status = req.body.status;
//   const pinned = req.body.pinned;

//   const conn = await pool.getConnection()
//   await conn.beginTransaction();

//   try {
//     console.log(content)
//     let results = await conn.query(
//       "UPDATE blogs SET title=?, content=?, status=?, pinned=? WHERE id=?",
//       [title, content, status, pinned, req.params.id]
//     )

//     if (file.length > 0) {
//       file.forEach((file, index) => {
//         let path = [req.params.id, file.path.substring(6), 0]
//         pathArray.push(path)
//       })

//       await conn.query(
//         "INSERT INTO images(blog_id, file_path, main) VALUES ?;",
//         [pathArray])
//     }

//     await conn.commit()
//     res.send("success!");
//   } catch (err) {
//     await conn.rollback();
//     next(err);
//   } finally {
//     console.log('finally')
//     conn.release();
//   }
//   return;
// });

// router.delete("/blogs/:blogId", async function (req, res, next) {
//   // Your code here
//   const conn = await pool.getConnection();
//   // Begin transaction
//   await conn.beginTransaction();

//   try {
//     // Check that there is no comments
//     const [
//       rows1,
//       fields1,
//     ] = await conn.query(
//       "SELECT COUNT(*) FROM `comments` WHERE `blog_id` = ?",
//       [req.params.blogId]
//     );
//     console.log(rows1);

//     if (rows1[0]["COUNT(*)"] > 0) {
//       return res
//         .status(400)
//         .json({ message: "Cannot delete blogs with comments" });
//     }

//     //Delete files from the upload folder
//     const [
//       images,
//       imageFields,
//     ] = await conn.query(
//       "SELECT `file_path` FROM `images` WHERE `blog_id` = ?",
//       [req.params.blogId]
//     );
//     const appDir = path.dirname(require.main.filename); // Get app root directory
//     console.log(appDir)
//     images.forEach((e) => {
//       const p = path.join(appDir, 'static', e.file_path);
//       fs.unlinkSync(p);
//     });

//     // Delete images
//     await conn.query("DELETE FROM `images` WHERE `blog_id` = ?", [
//       req.params.blogId,
//     ]);
//     // Delete the selected blog
//     const [
//       rows2,
//       fields2,
//     ] = await conn.query("DELETE FROM `blogs` WHERE `id` = ?", [
//       req.params.blogId,
//     ]);

//     if (rows2.affectedRows === 1) {
//       await conn.commit();
//       res.status(204).send();
//     } else {
//       throw "Cannot delete the selected blog";
//     }
//   } catch (err) {
//     console.log(err)
//     await conn.rollback();
//     return res.status(500).json(err);
//   } finally {
//     conn.release();
//   }
// });

exports.router = router;
