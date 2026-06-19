const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {

    let conn;

    try {

        conn = await pool.getConnection();

        const adatok = await conn.query(`
            SELECT
                szerzodesek.*,
                users.nev AS berlonev,
                ingatlanok.cim AS ingatlancim
            FROM szerzodesek
            INNER JOIN users
                ON users.id = szerzodesek.berloid
            INNER JOIN ingatlanok
                ON ingatlanok.id = szerzodesek.ingatlanid
            ORDER BY szerzodesek.id DESC
        `);

        res.json(adatok);

    } catch (err) {

        console.error(err);

        res.status(500).json(err);

    } finally {

        if (conn) {
            conn.release();
        }

    }

});

module.exports = router;