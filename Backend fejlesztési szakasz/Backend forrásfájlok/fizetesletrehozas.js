const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {

    const {
        szerzodesid,
        osszeg,
        fizetesdatum,
        statusz,
        fizetesmod,
        megjegyzes
    } = req.body;

    let conn;

    try {

        conn = await pool.getConnection();

        await conn.query(
            `INSERT INTO fizetesek
            (szerzodesid, osszeg, fizetesdatum, statusz, fizetesmod, megjegyzes)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                szerzodesid,
                osszeg,
                fizetesdatum,
                statusz,
                fizetesmod,
                megjegyzes
            ]
        );

        res.json({
            siker: true,
            uzenet: "Fizetes sikeresen rogzitve!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;