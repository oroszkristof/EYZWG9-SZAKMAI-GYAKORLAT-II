import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/hitelesites.css";

function Regisztracio() {

    const [nev, setNev] = useState("");
    const [email, setEmail] = useState("");
    const [jelszo, setJelszo] = useState("");
    const [telefonszam, setTelefonszam] = useState("");
    const [szemelyiszam, setSzemelyiszam] = useState("");
    const [lakcim, setLakcim] = useState("");
    const [szerepkor, setSzerepkor] = useState("berlo");

    const navigate = useNavigate();

    const regisztracio = async (e) => {

        e.preventDefault();

        try {

            const valasz = await fetch(
                "http://localhost:3001/api/regisztracio",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        nev,
                        email,
                        jelszo,
                        szerepkor,
                        telefonszam,
                        szemelyiszam,
                        lakcim
                    })
                }
            );

            const adat = await valasz.json();

            alert(adat.uzenet);

            if (adat.siker) {

                navigate("/bejelentkezes");

            }

        } catch (err) {

            console.error(err);

            alert("Hiba történt!");

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Regisztráció</h2>

                <form onSubmit={regisztracio}>

                    <input
                        type="text"
                        placeholder="Név"
                        value={nev}
                        onChange={(e) =>
                            setNev(e.target.value)
                        }
                        required
                    />

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    <input
                        type="password"
                        placeholder="Jelszó"
                        value={jelszo}
                        onChange={(e) =>
                            setJelszo(e.target.value)
                        }
                        required
                    />

                    <input
                        type="text"
                        placeholder="Telefonszám"
                        value={telefonszam}
                        onChange={(e) =>
                            setTelefonszam(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Személyi szám"
                        value={szemelyiszam}
                        onChange={(e) =>
                            setSzemelyiszam(e.target.value)
                        }
                    />

                    <input
                        type="text"
                        placeholder="Lakcím"
                        value={lakcim}
                        onChange={(e) =>
                            setLakcim(e.target.value)
                        }
                    />

                    <select
                        value={szerepkor}
                        onChange={(e) =>
                            setSzerepkor(e.target.value)
                        }
                    >

                        <option value="berlo">
                            Bérlő
                        </option>

                        <option value="admin">
                            Admin
                        </option>

                    </select>

                    <button type="submit">
                        Regisztráció
                    </button>

                </form>

                <p>

                    Már rendelkezik fiókkal?{" "}

                    <Link to="/bejelentkezes">
                        Jelentkezzen be!
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Regisztracio;