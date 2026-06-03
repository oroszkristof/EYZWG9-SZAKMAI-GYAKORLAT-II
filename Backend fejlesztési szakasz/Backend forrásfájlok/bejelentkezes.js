const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {

    const {
        email,
        jelszo
    } = req.body;

    let conn;

    try {

        conn = await pool.getConnection();

        const users = await conn.query(
            "SELECT * FROM users WHERE email = ? AND jelszo = ?",
            [email, jelszo]
        );

        if (users.length === 0) {

            return res.json({
                siker: false,
                uzenet: "Hibas email vagy jelszo!"
            });

        }

        const user = users[0];

        res.json({
            siker: true,
            uzenet: "Sikeres bejelentkezes!",
            user: {
                id: user.id,
                nev: user.nev,
                email: user.email,
                szerepkor: user.szerepkor
            }
        });

    } catch (err) {

        res.status(500).json({
            siker: false,
            hiba: err
        });

    } finally {

        if (conn) conn.release();

    }

});

module.exports = router;