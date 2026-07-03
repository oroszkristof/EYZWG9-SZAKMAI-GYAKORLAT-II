const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {

    const {
        kuldoid,
        targy,
        uzenet
    } = req.body;

    let conn;

    try {

        console.log("Beérkezett adat:", req.body);

        if (!kuldoid) {

            return res.status(400).json({
                siker: false,
                uzenet: "Hiányzik a kuldoid!"
            });

        }

        conn = await pool.getConnection();

        const eredmeny = await conn.query(
            `INSERT INTO uzenetek
            (
                kuldoid,
                targy,
                uzenet
            )
            VALUES (?, ?, ?)`,
            [
                kuldoid,
                targy,
                uzenet
            ]
        );

        console.log("INSERT eredmény:", eredmeny);

        res.json({
            siker: true,
            uzenet: "Üzenet elküldve!"
        });

    } catch (err) {

        console.error("Hiba:", err);

        res.status(500).json({
            siker: false,
            uzenet: "Szerverhiba történt!",
            hiba: err.message
        });

    } finally {

        if (conn) {
            conn.release();
        }

    }

});

module.exports = router;