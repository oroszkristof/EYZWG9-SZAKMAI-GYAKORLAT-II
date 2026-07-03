import { useEffect, useState } from "react";
import "../styles/uzenetek.css";

function Uzenetek() {

    const user =
        JSON.parse(localStorage.getItem("user"));

    const [uzenetek, setUzenetek] = useState([]);

    const [ujUzenet, setUjUzenet] = useState({
        targy: "",
        uzenet: ""
    });

    const lekeres = async () => {

        try {

            const valasz = await fetch(
                "http://localhost:3001/api/uzenetlistazas"
            );

            const adatok = await valasz.json();

            setUzenetek(adatok);

        } catch (err) {

            console.error(err);

        }

    };

    useEffect(() => {

        lekeres();

    }, []);

    const kuldes = async (e) => {

        e.preventDefault();

        try {

            const valasz = await fetch(
                "http://localhost:3001/api/uzenetkuldes",
                {
                    method: "POST",
                    headers: {
                        "Content-Type":
                            "application/json"
                    },
                    body: JSON.stringify({
                        kuldoid: user.id,
                        targy: ujUzenet.targy,
                        uzenet: ujUzenet.uzenet
                    })
                }
            );

            const adat = await valasz.json();

            console.log(adat);

            alert(
                adat.uzenet ||
                "Üzenet sikeresen elküldve!"
            );

            setUjUzenet({
                targy: "",
                uzenet: ""
            });

            lekeres();

        } catch (err) {

            console.error(err);

            alert("Hiba történt!");

        }

    };

    return (

        <div className="messages-container">

            <h1>Üzenetek</h1>

            <form
                className="message-form"
                onSubmit={kuldes}
            >

                <input
                    type="text"
                    placeholder="Tárgy"
                    value={ujUzenet.targy}
                    onChange={(e) =>
                        setUjUzenet({
                            ...ujUzenet,
                            targy: e.target.value
                        })
                    }
                    required
                />

                <textarea
                    placeholder="Üzenet"
                    value={ujUzenet.uzenet}
                    onChange={(e) =>
                        setUjUzenet({
                            ...ujUzenet,
                            uzenet: e.target.value
                        })
                    }
                    required
                />

                <button type="submit">
                    Üzenet küldése
                </button>

            </form>

            <div className="messages-grid">

                {uzenetek.map((uzenet) => (

                    <div
                        className="message-card"
                        key={uzenet.id}
                    >

                        <h3>
                            {uzenet.targy}
                        </h3>

                        <p>
                            <strong>
                                Feladó:
                            </strong>{" "}
                            {uzenet.nev || "Ismeretlen"}
                        </p>

                        <p>
                            <strong>
                                E-mail:
                            </strong>{" "}
                            {uzenet.email || "-"}
                        </p>

                        <p>
                            <strong>
                                Üzenet:
                            </strong>
                        </p>

                        <div className="message-text">
                            {uzenet.uzenet}
                        </div>

                        <p className="message-date">

                            {
                                uzenet.kuldesdatum
                                    ? new Date(
                                        uzenet.kuldesdatum
                                    ).toLocaleString(
                                        "hu-HU"
                                    )
                                    : "-"
                            }

                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default Uzenetek;