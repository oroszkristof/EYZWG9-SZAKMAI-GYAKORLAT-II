const express = require("express");
const router = express.Router();

const pool = require("../db");

router.put("/:id", async (req, res) => {

    const {
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
            `UPDATE ingatlanok
            SET
            cim = ?,
            tipus = ?,
            szobakszama = ?,
            haviar = ?,
            leiras = ?
            WHERE id = ?`,
            [
                cim,
                tipus,
                szobakszama,
                haviar,
                leiras,
                req.params.id
            ]
        );

        res.json({
            siker: true,
            uzenet: "Ingatlan modositva!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;