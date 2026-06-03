const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {

    const {
        userid,
        nev,
        email,
        telefonszam,
        szemelyiszam,
        lakcim
    } = req.body;

    let conn;

    try {

        conn = await pool.getConnection();

        await conn.query(
            `INSERT INTO berlok
            (userid, nev, email, telefonszam, szemelyiszam, lakcim)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                userid,
                nev,
                email,
                telefonszam,
                szemelyiszam,
                lakcim
            ]
        );

        res.json({
            siker: true,
            uzenet: "Berlo sikeresen letrehozva!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;