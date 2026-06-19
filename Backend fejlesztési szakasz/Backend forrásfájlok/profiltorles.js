const express = require("express");
const router = express.Router();

const pool = require("../db");

router.delete("/:id", async (req, res) => {

    const { id } = req.params;

    let conn;

    try {

        conn = await pool.getConnection();

        await conn.query(
            `
            DELETE FROM users
            WHERE id = ?
            `,
            [id]
        );

        res.json({
            siker: true,
            uzenet: "Profil sikeresen törölve!"
        });

    } catch (err) {

        console.error(err);

        res.status(500).json({
            siker: false,
            uzenet: "Hiba történt!"
        });

    } finally {

        if (conn) {
            conn.release();
        }

    }

});

module.exports = router;