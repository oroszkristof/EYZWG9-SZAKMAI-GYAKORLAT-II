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

        conn = await pool.getConnection();

        await conn.query(
            `INSERT INTO uzenetek
            (kuldoid, targy, uzenet)
            VALUES (?, ?, ?)`,
            [
                kuldoid,
                targy,
                uzenet
            ]
        );

        res.json({
            siker: true,
            uzenet: "Uzenet elkuldve!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if (conn) conn.release();

    }

});

module.exports = router;