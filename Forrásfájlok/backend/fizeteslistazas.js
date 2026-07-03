const express = require("express");
const router = express.Router();

const pool = require("../db");

router.get("/", async (req, res) => {

    let conn;

    try {

        conn = await pool.getConnection();

        const fizetesek = await conn.query(`
            SELECT
                fizetesek.id,
                fizetesek.szerzodesid,
                fizetesek.osszeg,
                fizetesek.fizetesdatum,
                fizetesek.statusz,
                fizetesek.fizetesmod,
                fizetesek.megjegyzes,

                berlok.id AS berloid,
                berlok.nev AS berlonev,
                berlok.email AS berloemail,
                berlok.telefonszam,

                szerzodesek.ingatlanid,
                szerzodesek.kezdetdatum,
                szerzodesek.vegdatum,
                szerzodesek.havidij,
                szerzodesek.statusz AS szerzodesstatusz

            FROM fizetesek

            INNER JOIN szerzodesek
                ON szerzodesek.id = fizetesek.szerzodesid

            INNER JOIN berlok
                ON berlok.id = szerzodesek.berloid

            ORDER BY fizetesek.fizetesdatum DESC
        `);

        res.status(200).json(fizetesek);

    } catch (err) {

        console.error("Fizetések lekérdezési hiba:", err);

        res.status(500).json({
            siker: false,
            uzenet: "Hiba történt a fizetések lekérdezése során!"
        });

    } finally {

        if (conn) {
            conn.release();
        }

    }

});

module.exports = router;