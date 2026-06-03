const express = require("express");
const router = express.Router();

const pool = require("../db");

router.put("/:id", async (req, res) => {

    const {
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
            `UPDATE berlok
            SET
            nev = ?,
            email = ?,
            telefonszam = ?,
            szemelyiszam = ?,
            lakcim = ?
            WHERE id = ?`,
            [
                nev,
                email,
                telefonszam,
                szemelyiszam,
                lakcim,
                req.params.id
            ]
        );

        res.json({
            siker: true,
            uzenet: "Berlo modositva!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;