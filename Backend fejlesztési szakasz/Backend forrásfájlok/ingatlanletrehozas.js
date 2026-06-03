const express = require("express");
const router = express.Router();

const pool = require("../db");

router.post("/", async (req, res) => {

    const {
        tulajdonosid,
        cim,
        tipus,
        szobakszama,
        haviar,
        leiras
    } = req.body;

    let conn;

    try {

        conn = await pool.getConnection();

        await conn.query(
            `INSERT INTO ingatlanok
            (tulajdonosid, cim, tipus, szobakszama, haviar, leiras)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                tulajdonosid,
                cim,
                tipus,
                szobakszama,
                haviar,
                leiras
            ]
        );

        res.json({
            siker: true,
            uzenet: "Ingatlan sikeresen letrehozva!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;