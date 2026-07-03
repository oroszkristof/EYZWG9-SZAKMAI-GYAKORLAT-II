const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {

    let conn;

    try {

        conn = await pool.getConnection();

        const adatok = await conn.query(
            "SELECT * FROM ingatlanok"
        );

        res.json(adatok);

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;