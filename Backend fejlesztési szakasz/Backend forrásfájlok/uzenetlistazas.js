const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {

    let conn;

    try {

        conn = await pool.getConnection();

        const adatok = await conn.query(`
            SELECT
                uzenetek.*,
                users.nev,
                users.email
            FROM uzenetek
            INNER JOIN users
                ON users.id = uzenetek.kuldoid
            ORDER BY uzenetek.kuldesdatum DESC
        `);

        res.json(adatok);

    } catch (err) {

        console.error(err);

        res.status(500).json(err);

    } finally {

        if (conn) conn.release();

    }

});

module.exports = router;