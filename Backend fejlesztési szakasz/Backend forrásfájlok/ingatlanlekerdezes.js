const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/:id", async (req, res) => {

    let conn;

    try {

        conn = await pool.getConnection();

        const adat = await conn.query(
            "SELECT * FROM ingatlanok WHERE id = ?",
            [req.params.id]
        );

        res.json(adat);

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;