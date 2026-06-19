const express = require("express");
const router = express.Router();

const pool = require("../db");

router.delete("/:id", async (req, res) => {

    let conn;

    try {

        conn = await pool.getConnection();

        await conn.query(
            "DELETE FROM ingatlanok WHERE id = ?",
            [req.params.id]
        );

        res.json({
            siker: true,
            uzenet: "Ingatlan törölve!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;