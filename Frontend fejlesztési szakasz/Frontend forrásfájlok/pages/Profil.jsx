import "../styles/profil.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Profil() {

    const navigate = useNavigate();

    const user = JSON.parse(
        localStorage.getItem("user")
    );

    const [szerkesztesMod,
        setSzerkesztesMod] =
        useState(false);

    const [adatok,
        setAdatok] =
        useState({
            nev: user?.nev || "",
            email: user?.email || "",
            telefonszam:
                user?.telefonszam || "",
            szemelyiszam:
                user?.szemelyiszam || "",
            lakcim:
                user?.lakcim || ""
        });

    if (!user) {

        return (

            <div className="profil-container">

                <div className="profil-card">

                    <h1>Profil</h1>

                    <p>
                        Nincs bejelentkezett felhasználó.
                    </p>

                </div>

            </div>

        );

    }

    const profilModositas =
        async () => {

            try {

                const valasz =
                    await fetch(
                        `http://localhost:3001/api/profilmodositas/${user.id}`,
                        {
                            method: "PUT",
                            headers: {
                                "Content-Type":
                                    "application/json"
                            },
                            body: JSON.stringify(
                                adatok
                            )
                        }
                    );

                const eredmeny =
                    await valasz.json();

                alert(
                    eredmeny.uzenet
                );

                const ujUser = {
                    ...user,
                    ...adatok
                };

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        ujUser
                    )
                );

                setSzerkesztesMod(
                    false
                );

            } catch (err) {

                console.error(
                    err
                );

                alert(
                    "Hiba történt!"
                );

            }

        };

    const profilTorles =
        async () => {

            const biztos =
                window.confirm(
                    "Biztosan törölni szeretné a profilját?"
                );

            if (!biztos) {
                return;
            }

            try {

                const valasz =
                    await fetch(
                        `http://localhost:3001/api/profiltorles/${user.id}`,
                        {
                            method:
                                "DELETE"
                        }
                    );

                const eredmeny =
                    await valasz.json();

                alert(
                    eredmeny.uzenet
                );

                localStorage.removeItem(
                    "user"
                );

                navigate("/");

            } catch (err) {

                console.error(
                    err
                );

                alert(
                    "Hiba történt!"
                );

            }

        };

    return (

        <div className="profil-container">

            <div className="profil-card">

                <h1>Profilom</h1>

                <div className="adat-sor">

                    <span>Név:</span>

                    {
                        szerkesztesMod ? (

                            <input
                                type="text"
                                value={
                                    adatok.nev
                                }
                                onChange={(e) =>
                                    setAdatok({
                                        ...adatok,
                                        nev:
                                            e.target.value
                                    })
                                }
                            />

                        ) : (

                            <strong>
                                {adatok.nev}
                            </strong>

                        )
                    }

                </div>

                <div className="adat-sor">

                    <span>E-mail:</span>

                    {
                        szerkesztesMod ? (

                            <input
                                type="email"
                                value={
                                    adatok.email
                                }
                                onChange={(e) =>
                                    setAdatok({
                                        ...adatok,
                                        email:
                                            e.target.value
                                    })
                                }
                            />

                        ) : (

                            <strong>
                                {adatok.email}
                            </strong>

                        )
                    }

                </div>

                <div className="adat-sor">

                    <span>Telefonszám:</span>

                    {
                        szerkesztesMod ? (

                            <input
                                type="text"
                                value={
                                    adatok.telefonszam
                                }
                                onChange={(e) =>
                                    setAdatok({
                                        ...adatok,
                                        telefonszam:
                                            e.target.value
                                    })
                                }
                            />

                        ) : (

                            <strong>
                                {
                                    adatok.telefonszam
                                }
                            </strong>

                        )
                    }

                </div>

                <div className="adat-sor">

                    <span>Személyi szám:</span>

                    {
                        szerkesztesMod ? (

                            <input
                                type="text"
                                value={
                                    adatok.szemelyiszam
                                }
                                onChange={(e) =>
                                    setAdatok({
                                        ...adatok,
                                        szemelyiszam:
                                            e.target.value
                                    })
                                }
                            />

                        ) : (

                            <strong>
                                {
                                    adatok.szemelyiszam
                                }
                            </strong>

                        )
                    }

                </div>

                <div className="adat-sor">

                    <span>Lakcím:</span>

                    {
                        szerkesztesMod ? (

                            <input
                                type="text"
                                value={
                                    adatok.lakcim
                                }
                                onChange={(e) =>
                                    setAdatok({
                                        ...adatok,
                                        lakcim:
                                            e.target.value
                                    })
                                }
                            />

                        ) : (

                            <strong>
                                {
                                    adatok.lakcim
                                }
                            </strong>

                        )
                    }

                </div>

                <div className="adat-sor">

                    <span>Jelszó:</span>

                    <strong>
                        ********
                    </strong>

                </div>

                <div className="adat-sor">

                    <span>Szerepkör:</span>

                    <strong>
                        {
                            user.szerepkor ||
                            "-"
                        }
                    </strong>

                </div>

                <div className="profil-menu">

                    <Link
                        to="/uzenetek"
                        className="profil-gomb"
                    >
                        Üzeneteim
                    </Link>

                    {
                        !szerkesztesMod ? (

                            <button
                                className="profil-gomb"
                                onClick={() =>
                                    setSzerkesztesMod(
                                        true
                                    )
                                }
                            >
                                Profil módosítása
                            </button>

                        ) : (

                            <button
                                className="profil-gomb"
                                onClick={
                                    profilModositas
                                }
                            >
                                Mentés
                            </button>

                        )
                    }

                    <button
                        className="profil-gomb torles-gomb"
                        onClick={
                            profilTorles
                        }
                    >
                        Profil törlése
                    </button>

                </div>

            </div>

        </div>

    );

}

export default Profil;