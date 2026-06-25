const express = require("express");
const router = express.Router();

const pool = require("../db");

router.put("/:id", async (req, res) => {

    const {
        kezdetdatum,
        vegdatum,
        havidij,
        statusz
    } = req.body;

    let conn;

    try {

        conn = await pool.getConnection();

        await conn.query(
            `UPDATE szerzodesek
            SET
            kezdetdatum = ?,
            vegdatum = ?,
            havidij = ?,
            statusz = ?
            WHERE id = ?`,
            [
                kezdetdatum,
                vegdatum,
                havidij,
                statusz,
                req.params.id
            ]
        );

        res.json({
            siker: true,
            uzenet: "Szerződés módosítva!"
        });

    } catch (err) {

        res.status(500).json(err);

    } finally {

        if(conn) conn.release();

    }

});

module.exports = router;