const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {

    const {
        nev,
        email,
        jelszo,
        szerepkor,
        telefonszam
    } = req.body;

    let conn;

    try {

        conn = await pool.getConnection();

        const letezik = await conn.query(
            "SELECT * FROM users WHERE email = ?",
            [email]
        );

        if (letezik.length > 0) {

            return res.json({
                siker: false,
                uzenet: "Ez az email mar letezik!"
            });

        }

        await conn.query(
            `INSERT INTO users
            (nev, email, jelszo, szerepkor, telefonszam)
            VALUES (?, ?, ?, ?, ?)`,
            [
                nev,
                email,
                jelszo,
                szerepkor,
                telefonszam
            ]
        );

        res.json({
            siker: true,
            uzenet: "Sikeres regisztracio!"
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