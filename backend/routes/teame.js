const { json } = require("express");
const express = require("express");
const pool = require("../config");

const router = express.Router();

// Get comment
router.get('/team', async function (req, res, next) {
    try {
        const type = req.query.type
        const [rows, cols] = await pool.query("SELECT s.id, s.name, s.stats, s.deck_card, i.saint_graphs, i.icon FROM servant as s join images as i on (s.id = i.servant_id) where i.stage = ?", [1])
        var result = []

        rows.forEach(element => {
            var deck = element.deck_card
            if (type == "Q") {
                if (deck.match(/Q/)) {
                    result.push(element)
                }
            }
            else if (type == "A") {
                if (deck.match(/A/)) {
                    result.push(element)
                }
            }
            else if (type == "B") {
                if (deck.match(/B/)) {
                    result.push(element)
                }
            }
        })
        return res.json(result);
    } catch (error) {
        console.log(error)
        return res.status(400).json(error)
    }

});

// team recommend
router.get("/team/recommend", function (req, res, next) {

    const type = req.query.type

    const sql0 = "SELECT s.id, s.name, i.icon, st.type, t.id as team_id, t.name as team_name, t.deck FROM servant as s join servant_team as st on (s.id = st.servant_id) join team as t on (st.team_id = t.id) JOIN images AS i ON (s.id = i.servant_id) where t.deck = ? and st.type = ? and i.stage = ?"
    const promise0 = pool.query(sql0, [type, "active", 1]);

    const sql1 = "SELECT s.id, s.name, i.icon, st.type, t.id as team_id, t.name as team_name, t.deck FROM servant as s join servant_team as st on (s.id = st.servant_id) join team as t on (st.team_id = t.id) JOIN images AS i ON (s.id = i.servant_id) where t.deck = ? and st.type = ? and i.stage = ?"
    const promise1 = pool.query(sql1, [type, "reserve", 1]);

    const sql2 = "SELECT s.id, s.name, i.icon, st.type, t.id as team_id, t.name as team_name, t.deck FROM servant as s join servant_team as st on (s.id = st.servant_id) join team as t on (st.team_id = t.id) JOIN images AS i ON (s.id = i.servant_id) where t.deck = ? and st.type = ? and i.stage = ?"
    const promise2 = pool.query(sql2, [type, "support", 1]);

    // Use Promise.all() to make sure that all queries are successful
    Promise.all([promise0, promise1, promise2])
        .then((results) => {
            const [actives, activesFields] = results[0];
            const [reserves, reserveFields] = results[1];
            const [supports, supportsFields] = results[2];
            res.json({
                active: actives,
                reserve: reserves,
                support: supports,
                error: null,
            });
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
});

exports.router = router