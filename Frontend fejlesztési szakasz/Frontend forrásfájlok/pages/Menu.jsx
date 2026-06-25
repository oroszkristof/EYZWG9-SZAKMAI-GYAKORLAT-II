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

                <Link to="/ingatlanok">
                    Ingatlanok
                </Link>

                <Link to="/berlok">
                    Bérlők
                </Link>

                <Link to="/szerzodesek">
                    Szerződések
                </Link>

                <Link to="/fizetesek">
                    Fizetések
                </Link>

                <Link to="/profil">
                    Profil
                </Link>

                {!user && (

                    <Link to="/bejelentkezes">
                        Bejelentkezés
                    </Link>

                )}

                {user && (

                    <button
                        onClick={kijelentkezes}
                        className="logout-btn"
                    >
                        Kijelentkezés
                    </button>

                )}

            </nav>

        </header>

    );

}

export default Menu;