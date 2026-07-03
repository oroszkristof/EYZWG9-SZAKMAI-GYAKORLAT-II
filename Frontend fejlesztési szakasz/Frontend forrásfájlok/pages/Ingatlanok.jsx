import { useEffect, useState } from "react";
import "../styles/ingatlanok.css";

function Ingatlanok() {
    const user =
        JSON.parse(localStorage.getItem("user"));

    const [ingatlanok, setIngatlanok] = useState([]);

    const [urlapLathato, setUrlapLathato] =
        useState(false);

    const [szerkesztettIngatlan,
        setSzerkesztettIngatlan] =
        useState(null);

    const [ujIngatlan, setUjIngatlan] = useState({
        tulajdonosid: "",
        cim: "",
        tipus: "",
        szobakszama: "",
        haviar: "",
        leiras: ""
    });

    const lekeres = async () => {

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

        lekeres();

    }, []);

    const szerkesztes = (ingatlan) => {

        setSzerkesztettIngatlan(ingatlan);

        setUjIngatlan({
            tulajdonosid: ingatlan.tulajdonosid,
            cim: ingatlan.cim,
            tipus: ingatlan.tipus,
            szobakszama: ingatlan.szobakszama,
            haviar: ingatlan.haviar,
            leiras: ingatlan.leiras
        });

        setUrlapLathato(true);

    };

    const torles = async (id) => {

        if (!window.confirm("Biztosan törli az ingatlant?")) {
            return;
        }

        try {

            const valasz = await fetch(
                `http://localhost:3001/api/inglantorles/${id}`,
                {
                    method: "DELETE"
                }
            );

            const adat = await valasz.json();

            alert(adat.uzenet);

            lekeres();

        } catch (err) {

            console.error(err);

        }

    };

    const letrehozas = async (e) => {

        e.preventDefault();

        try {

            if (szerkesztettIngatlan) {

                const valasz = await fetch(
                    `http://localhost:3001/api/ingatlanmodositas/${szerkesztettIngatlan.id}`,
                    {
                        method: "PUT",
                        headers: {
                            "Content-Type":
                                "application/json"
                        },
                        body: JSON.stringify(
                            ujIngatlan
                        )
                    }
                );

                const adat =
                    await valasz.json();

                alert(adat.uzenet);

                setSzerkesztettIngatlan(null);

                setUrlapLathato(false);

                lekeres();

                return;
            }

            const valasz = await fetch(
                "http://localhost:3001/api/ingatlanletrehozas",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify(
                        ujIngatlan
                    )
                }
            );

            const adat = await valasz.json();

            alert(adat.uzenet);

            setUjIngatlan({
                tulajdonosid: "",
                cim: "",
                tipus: "",
                szobakszama: "",
                haviar: "",
                leiras: ""
            });

            setUrlapLathato(false);

            lekeres();

        } catch (err) {

            console.error(err);

            alert("Hiba történt!");

        }

    };

    return (

        <div className="ingatlan-container">

            <h1>Ingatlanok</h1>

            {user?.szerepkor === "admin" && (

                <button
                    className="uj-btn"
                    onClick={() =>
                        setUrlapLathato(
                            !urlapLathato
                        )
                    }
                >
                    {
                        urlapLathato
                            ? "Űrlap bezárása"
                            : "Új ingatlan felvétele"
                    }
                </button>

            )}

            {user?.szerepkor === "admin" &&
                urlapLathato && (

                    <form
                        className="ingatlan-form"
                        onSubmit={letrehozas}
                    >

                        <input
                            type="number"
                            placeholder="Tulajdonos ID"
                            value={
                                ujIngatlan.tulajdonosid
                            }
                            onChange={(e) =>
                                setUjIngatlan({
                                    ...ujIngatlan,
                                    tulajdonosid:
                                        e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Cím"
                            value={ujIngatlan.cim}
                            onChange={(e) =>
                                setUjIngatlan({
                                    ...ujIngatlan,
                                    cim: e.target.value
                                })
                            }
                        />

                        <input
                            type="text"
                            placeholder="Típus"
                            value={ujIngatlan.tipus}
                            onChange={(e) =>
                                setUjIngatlan({
                                    ...ujIngatlan,
                                    tipus:
                                        e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Szobák száma"
                            value={
                                ujIngatlan.szobakszama
                            }
                            onChange={(e) =>
                                setUjIngatlan({
                                    ...ujIngatlan,
                                    szobakszama:
                                        e.target.value
                                })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Havi ár"
                            value={
                                ujIngatlan.haviar
                            }
                            onChange={(e) =>
                                setUjIngatlan({
                                    ...ujIngatlan,
                                    haviar:
                                        e.target.value
                                })
                            }
                        />

                        <textarea
                            placeholder="Leírás"
                            value={
                                ujIngatlan.leiras
                            }
                            onChange={(e) =>
                                setUjIngatlan({
                                    ...ujIngatlan,
                                    leiras:
                                        e.target.value
                                })
                            }
                        />

                        <button type="submit">

                            {
                                szerkesztettIngatlan
                                    ? "Módosítás mentése"
                                    : "Új ingatlan felvétele"
                            }

                        </button>

                    </form>

                )}

            <div className="ingatlan-grid">

                {ingatlanok.map((ingatlan) => (

                    <div
                        className="ingatlan-card"
                        key={ingatlan.id}
                    >

                        <h3>
                            {ingatlan.cim}
                        </h3>

                        <p>
                            <strong>
                                Típus:
                            </strong>{" "}
                            {ingatlan.tipus}
                        </p>

                        <p>
                            <strong>
                                Szobák száma:
                            </strong>{" "}
                            {ingatlan.szobakszama}
                        </p>

                        <p>
                            <strong>
                                Havi ár:
                            </strong>{" "}
                            {ingatlan.haviar}
                            {" "}Ft
                        </p>

                        <p>
                            <strong>
                                Leírás:
                            </strong>{" "}
                            {ingatlan.leiras}
                        </p>

                        {user?.szerepkor === "admin" && (

                            <div className="gombok">

                                <button
                                    className="modositas-btn"
                                    onClick={() =>
                                        szerkesztes(
                                            ingatlan
                                        )
                                    }
                                >
                                    Módosítás
                                </button>

                                <button
                                    className="torles-btn"
                                    onClick={() =>
                                        torles(
                                            ingatlan.id
                                        )
                                    }
                                >
                                    Törlés
                                </button>

                            </div>

                        )}

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Ingatlanok;