const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {

    const {
        ingatlanid,
        berloid,
        kezdetdatum,
        vegdatum,
        havidij,
        statusz
    } = req.body;

    let conn;

    try {

        conn = await pool.getConnection();

        await conn.query(
            `INSERT INTO szerzodesek
            (ingatlanid, berloid, kezdetdatum, vegdatum, havidij, statusz)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                ingatlanid,
                berloid,
                kezdetdatum,
                vegdatum,
                havidij,
                statusz
            ]
        );

        res.json({
            siker: true,
            uzenet: "Szerzodes sikeresen letrehozva!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;