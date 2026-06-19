const express = require("express");
const router = express.Router();

const pool = require("../db");

router.delete("/:id", async (req, res) => {

    let conn;

    try {

        conn = await pool.getConnection();

        await conn.query(
            "DELETE FROM fizetesek WHERE id = ?",
            [req.params.id]
        );

        res.json({
            siker: true,
            uzenet: "Fizetés törölve!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;