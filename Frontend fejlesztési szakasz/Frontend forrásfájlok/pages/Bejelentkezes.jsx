import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../styles/hitelesites.css";

function Bejelentkezes() {

    const [email, setEmail] = useState("");
    const [jelszo, setJelszo] = useState("");

    const navigate = useNavigate();

    const bejelentkezes = async (e) => {

        e.preventDefault();

        try {

            const valasz = await fetch(
                "http://localhost:3001/api/bejelentkezes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        jelszo
                    })
                }
            );

            const adat = await valasz.json();

            console.log("Teljes válasz:", adat);
            console.log("Felhasználó:", adat.user);

            if (adat.siker) {

                localStorage.setItem(
                    "user",
                    JSON.stringify(adat.user)
                );

                console.log(
                    "LocalStorage:",
                    JSON.parse(localStorage.getItem("user"))
                );

                alert(adat.uzenet);

                navigate("/ingatlanok");

            } else {

                alert(adat.uzenet);

            }

        } catch (err) {

            console.error(err);

            alert("Hiba történt!");

        }

    };

    return (

        <div className="auth-container">

            <div className="auth-card">

                <h2>Bejelentkezés</h2>

                <form onSubmit={bejelentkezes}>

                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Jelszó"
                        value={jelszo}
                        onChange={(e) => setJelszo(e.target.value)}
                    />

                    <button type="submit">
                        Bejelentkezés
                    </button>

                </form>

                <p>

                    Nincs fiókja?{" "}

                    <Link to="/regisztracio">
                        Regisztráljon itt!
                    </Link>

                </p>

            </div>

        </div>

    );

}

export default Bejelentkezes;