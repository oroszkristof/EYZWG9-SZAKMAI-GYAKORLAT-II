const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {

    const {
        nev,
        email,
        jelszo,
        szerepkor,
        telefonszam,
        szemelyiszam,
        lakcim
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
                uzenet: "Ez az email már létezik!"
            });

        }

        await conn.query(
            `INSERT INTO users
            (
                nev,
                email,
                jelszo,
                szerepkor,
                telefonszam,
                szemelyiszam,
                lakcim
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                nev,
                email,
                jelszo,
                szerepkor,
                telefonszam,
                szemelyiszam,
                lakcim
            ]
        );

        res.json({
            siker: true,
            uzenet: "Sikeres regisztráció!"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            siker: false,
            uzenet: "Szerverhiba történt!"
        });

    } finally {

        if (conn) {
            conn.release();
        }

    }

});

module.exports = router;