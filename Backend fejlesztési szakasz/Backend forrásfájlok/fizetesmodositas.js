const express = require("express");
const router = express.Router();

const pool = require("../db");

router.put("/:id", async (req, res) => {

    const {
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
            `UPDATE fizetesek
            SET
            osszeg = ?,
            fizetesdatum = ?,
            statusz = ?,
            fizetesmod = ?,
            megjegyzes = ?
            WHERE id = ?`,
            [
                osszeg,
                fizetesdatum,
                statusz,
                fizetesmod,
                megjegyzes,
                req.params.id
            ]
        );

        res.json({
            siker: true,
            uzenet: "Fizetes modositva!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;