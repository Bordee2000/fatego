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

// router.post(
//   "/blogs",
//   upload.array("myImage", 5),
//   async function (req, res, next) {
//     if (req.method == "POST") {
//       const file = req.files;
//       let pathArray = [];

//       if (!file) {
//         return res.status(400).json({ message: "Please upload a file" });
//       }

//       const title = req.body.title;
//       const content = req.body.content;
//       const status = req.body.status;
//       const pinned = req.body.pinned;

//       const conn = await pool.getConnection();
//       // Begin transaction
//       await conn.beginTransaction();

//       try {
//         let results = await conn.query(
//           "INSERT INTO blogs(title, content, status, pinned, `like`,create_date) VALUES(?, ?, ?, ?, 0,CURRENT_TIMESTAMP);",
//           [title, content, status, pinned]
//         );
//         const blogId = results[0].insertId;

//         req.files.forEach((file, index) => {
//           let path = [blogId, file.path.substring(6), index == 0 ? 1 : 0];
//           pathArray.push(path);
//         });

//         await conn.query(
//           "INSERT INTO images(blog_id, file_path, main) VALUES ?;",
//           [pathArray]
//         );

//         await conn.commit();
//         res.send("success!");
//       } catch (err) {
//         await conn.rollback();
//         return res.status(400).json(err);
//       } finally {
//         console.log("finally");
//         conn.release();
//       }
//     }
//   }
// );

//filter Path
router.get("/detailServant/filter", function (req, res, next) {
  const check = req.body.class
  var convert = check.toString()
  var val = "(" + convert + ")"
  const sql0 = "SELECT * FROM servant WHERe id in "
  const promise0 = pool.query(sql0 + val);
})

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
