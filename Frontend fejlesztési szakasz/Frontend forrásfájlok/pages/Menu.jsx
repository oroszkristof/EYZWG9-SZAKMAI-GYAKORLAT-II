import { Link, useNavigate } from "react-router-dom";

function Menu() {

    const navigate = useNavigate();

    const user =
        JSON.parse(localStorage.getItem("user"));

    const kijelentkezes = () => {

        localStorage.removeItem("user");

        navigate("/bejelentkezes");

    };

    return (

        <header>

            <Link to="/" className="logo">
                Ingatlankezelő rendszer
            </Link>

            <nav>

                {!user ? (

                    <Link to="/bejelentkezes">
                        Bejelentkezés
                    </Link>

                ) : (

                    <>

                        <Link to="/ingatlanok">
                            Ingatlanok
                        </Link>

                        {user.szerepkor === "admin" && (

                            <Link to="/berlok">
                                Bérlők
                            </Link>

                        )}

                        <Link to="/szerzodesek">
                            Szerződések
                        </Link>

                        <Link to="/fizetesek">
                            Fizetések
                        </Link>

                        <Link to="/profil">
                            Profil
                        </Link>

                        <button
                            onClick={kijelentkezes}
                            className="logout-btn"
                        >
                            Kijelentkezés
                        </button>

                    </>

                )}

            </nav>

        </header>

    );

}

export default Menu;