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
                uzenet: "Hibás email vagy jelszó!"
            });

        }

        const user = users[0];

        res.json({
            siker: true,
            uzenet: "Sikeres bejelentkezés!",
            user: {
                id: user.id,
                nev: user.nev,
                email: user.email,
                jelszo: user.jelszo,
                szerepkor: user.szerepkor,
                telefonszam: user.telefonszam,
                szemelyiszam: user.szemelyiszam,
                lakcim: user.lakcim,
                letrehozasdatum: user.letrehozasdatum
            }
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