import { useEffect, useState } from "react";
import "../styles/berlok.css";

function Berlok() {

    const [berlok, setBerlok] = useState([]);

    const berlokBetoltese = async () => {

        try {

            const response = await fetch(
                "http://localhost:3001/api/berlolistazas"
            );

            const data = await response.json();

            setBerlok(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(error);

            alert(
                "Nem sikerült betölteni a bérlőket!"
            );

        }

    };

    useEffect(() => {

        berlokBetoltese();

    }, []);

    return (

        <div className="tenant-container">

            <h1>Bérlők</h1>

            <div className="tenant-grid">

                {berlok.map((berlo) => (

                    <div
                        key={berlo.id}
                        className="tenant-card"
                    >

                        <h3>
                            {berlo.nev}
                        </h3>

                        <p>
                            <strong>
                                E-mail:
                            </strong>{" "}
                            {
                                berlo.email ||
                                "Nincs megadva"
                            }
                        </p>

                        <p>
                            <strong>
                                Telefonszám:
                            </strong>{" "}
                            {
                                berlo.telefonszam ||
                                "Nincs megadva"
                            }
                        </p>

                        <p>
                            <strong>
                                Személyi szám:
                            </strong>{" "}
                            {
                                berlo.szemelyiszam ||
                                "Nincs megadva"
                            }
                        </p>

                        <p>
                            <strong>
                                Lakcím:
                            </strong>{" "}
                            {
                                berlo.lakcim ||
                                "Nincs megadva"
                            }
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );


}

export default Berlok;
