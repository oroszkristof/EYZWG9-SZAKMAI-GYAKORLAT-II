import { useEffect, useState } from "react";
import "../styles/szerzodesek.css";

function Szerzodesek() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const [szerzodesek, setSzerzodesek] = useState([]);
    const [berlok, setBerlok] = useState([]);
    const [ingatlanok, setIngatlanok] = useState([]);
    const [szerkesztettId, setSzerkesztettId] = useState(null);
    const [statuszSzuro, setStatuszSzuro] = useState("Mind");

    const [ujSzerzodes, setUjSzerzodes] = useState({
        ingatlanid: "",
        berloid: "",
        kezdetdatum: "",
        vegdatum: "",
        havidij: "",
        statusz: "Aktív"
    });

    const szerzodesekBetoltese = async () => {

        try {

            const valasz = await fetch(
                "http://localhost:3001/api/szerzodeslistazas"
            );

            const adatok = await valasz.json();

            setSzerzodesek(adatok);

        } catch (err) {

            console.error(err);

        }

    };

    const berlokBetoltese = async () => {

        try {

            const valasz = await fetch(
                "http://localhost:3001/api/berlolistazas"
            );

            const adatok = await valasz.json();

            setBerlok(adatok);

        } catch (err) {

            console.error(err);

        }

    };

    const ingatlanokBetoltese = async () => {

        try {

            const valasz = await fetch(
                "http://localhost:3001/api/ingatlanlistazas"
            );

            const adatok = await valasz.json();

            setIngatlanok(adatok);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        szerzodesekBetoltese();
        berlokBetoltese();
        ingatlanokBetoltese();

    }, []);

    const mentes = async (e) => {

        e.preventDefault();

        try {

            let url =
                "http://localhost:3001/api/szerzodesletrehozas";

            let method = "POST";

            if (szerkesztettId) {

                url =
                    `http://localhost:3001/api/szerzodesmodositas/${szerkesztettId}`;

                method = "PUT";

            }

            const valasz = await fetch(
                url,
                {
                    method,
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(
                        ujSzerzodes
                    )
                }
            );

            const adat =
                await valasz.json();

            alert(adat.uzenet);

            setUjSzerzodes({
                ingatlanid: "",
                berloid: "",
                kezdetdatum: "",
                vegdatum: "",
                havidij: "",
                statusz: "Aktív"
            });

            setSzerkesztettId(null);

            szerzodesekBetoltese();

        } catch (err) {

            console.error(err);

            alert("Hiba történt!");

        }

    };

    const torles = async (id) => {

        if (
            !window.confirm(
                "Biztosan törlöd a szerződést?"
            )
        ) {
            return;
        }

        try {

            const valasz = await fetch(
                `http://localhost:3001/api/szerzodestorles/${id}`,
                {
                    method: "DELETE"
                }
            );

            const adat =
                await valasz.json();

            alert(adat.uzenet);

            szerzodesekBetoltese();

        } catch (err) {

            console.error(err);

        }

    };

    return (

        <div className="tenant-container">

            <h1>Szerződések</h1>

            {user?.szerepkor === "admin" && (

                <form
                    className="tenant-form"
                    onSubmit={mentes}
                >

                    <select
                        value={
                            ujSzerzodes.ingatlanid
                        }
                        onChange={(e) =>
                            setUjSzerzodes({
                                ...ujSzerzodes,
                                ingatlanid:
                                    e.target.value
                            })
                        }
                        required
                    >

                        <option value="">
                            Válassz ingatlant
                        </option>

                        {ingatlanok.map(
                            (ingatlan) => (

                                <option
                                    key={
                                        ingatlan.id
                                    }
                                    value={
                                        ingatlan.id
                                    }
                                >
                                    {
                                        ingatlan.cim
                                    }
                                </option>

                            )
                        )}

                    </select>

                    <select
                        value={
                            ujSzerzodes.berloid
                        }
                        onChange={(e) =>
                            setUjSzerzodes({
                                ...ujSzerzodes,
                                berloid:
                                    e.target.value
                            })
                        }
                        required
                    >

                        <option value="">
                            Válassz bérlőt
                        </option>

                        {berlok.map(
                            (berlo) => (

                                <option
                                    key={
                                        berlo.id
                                    }
                                    value={
                                        berlo.id
                                    }
                                >
                                    {
                                        berlo.nev
                                    }
                                </option>

                            )
                        )}

                    </select>

                    <input
                        type="date"
                        value={
                            ujSzerzodes.kezdetdatum
                        }
                        onChange={(e) =>
                            setUjSzerzodes({
                                ...ujSzerzodes,
                                kezdetdatum:
                                    e.target.value
                            })
                        }
                        required
                    />

                    <input
                        type="date"
                        value={
                            ujSzerzodes.vegdatum
                        }
                        onChange={(e) =>
                            setUjSzerzodes({
                                ...ujSzerzodes,
                                vegdatum:
                                    e.target.value
                            })
                        }
                        required
                    />

                    <input
                        type="number"
                        placeholder="Havi díj"
                        value={
                            ujSzerzodes.havidij
                        }
                        onChange={(e) =>
                            setUjSzerzodes({
                                ...ujSzerzodes,
                                havidij:
                                    e.target.value
                            })
                        }
                        required
                    />

                    <select
                        value={
                            ujSzerzodes.statusz
                        }
                        onChange={(e) =>
                            setUjSzerzodes({
                                ...ujSzerzodes,
                                statusz:
                                    e.target.value
                            })
                        }
                    >

                        <option value="Aktív">
                            Aktív
                        </option>

                        <option value="Lejárt">
                            Lejárt
                        </option>

                    </select>

                    <button
                        type="submit"
                    >
                        {
                            szerkesztettId
                                ? "Módosítás mentése"
                                : "Szerződés létrehozása"
                        }
                    </button>

                </form>
            )}
            <div className="filter-container">

                <select
                    value={statuszSzuro}
                    onChange={(e) =>
                        setStatuszSzuro(
                            e.target.value
                        )
                    }
                >

                    <option value="Mind">
                        Összes szerződés
                    </option>

                    <option value="Aktív">
                        Aktív
                    </option>

                    <option value="Lejárt">
                        Lejárt
                    </option>

                </select>

            </div>

            <div className="tenant-grid">

                {szerzodesek
                    .filter((szerzodes) => {

                        if (
                            statuszSzuro ===
                            "Mind"
                        ) {
                            return true;
                        }

                        return (
                            szerzodes.statusz ===
                            statuszSzuro
                        );

                    })
                    .map(
                        (szerzodes) => (

                            <div
                                className="tenant-card"
                                key={
                                    szerzodes.id
                                }
                            >

                                <h3>
                                    {
                                        szerzodes.ingatlancim
                                    }
                                </h3>

                                <p>
                                    <strong>
                                        Bérlő:
                                    </strong>{" "}
                                    {
                                        szerzodes.berlonev
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Kezdet:
                                    </strong>{" "}
                                    {
                                        new Date(
                                            szerzodes.kezdetdatum
                                        ).toLocaleDateString(
                                            "hu-HU"
                                        )
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Vége:
                                    </strong>{" "}
                                    {
                                        new Date(
                                            szerzodes.vegdatum
                                        ).toLocaleDateString(
                                            "hu-HU"
                                        )
                                    }
                                </p>

                                <p>
                                    <strong>
                                        Havi díj:
                                    </strong>{" "}
                                    {
                                        szerzodes.havidij
                                    } Ft
                                </p>

                                <p>

                                    <strong>
                                        Státusz:
                                    </strong>

                                    <span
                                        className={
                                            szerzodes.statusz ===
                                                "Aktív"
                                                ? "active-status"
                                                : "expired-status"
                                        }
                                    >
                                        {" "}
                                        {
                                            szerzodes.statusz
                                        }
                                    </span>

                                </p>
                                {user?.szerepkor === "admin" && (

                                    <div className="buttons">

                                        <button
                                            type="button"
                                            className="edit-btn"
                                            onClick={() => {

                                                setSzerkesztettId(
                                                    szerzodes.id
                                                );

                                                setUjSzerzodes({
                                                    ingatlanid:
                                                        szerzodes.ingatlanid,
                                                    berloid:
                                                        szerzodes.berloid,
                                                    kezdetdatum:
                                                        szerzodes.kezdetdatum?.split("T")[0] ||
                                                        szerzodes.kezdetdatum,
                                                    vegdatum:
                                                        szerzodes.vegdatum?.split("T")[0] ||
                                                        szerzodes.vegdatum,
                                                    havidij:
                                                        szerzodes.havidij,
                                                    statusz:
                                                        szerzodes.statusz
                                                });

                                                window.scrollTo({
                                                    top: 0,
                                                    behavior: "smooth"
                                                });

                                            }}
                                        >
                                            Módosítás
                                        </button>

                                        <button
                                            type="button"
                                            className="delete-btn"
                                            onClick={() =>
                                                torles(
                                                    szerzodes.id
                                                )
                                            }
                                        >
                                            Törlés
                                        </button>

                                    </div>

                                )}

                            </div>

                        )
                    )}

            </div>

        </div>

    );


}

export default Szerzodesek;
