import "./App.css";

import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Menu from "./components/Menu";
import Bejelentkezes from "./components/Bejelentkezes";
import Regisztracio from "./components/Regisztracio";
import Profil from "./components/Profil";
import Ingatlanok from "./components/Ingatlanok";
import Berlok from "./components/Berlok";
import Uzenetek from "./components/Uzenetek";
import Szerzodesek from "./components/Szerzodesek";
import Fizetesek from "./components/Fizetesek";

function Fooldal() {

  return (

    <div className="hero-container">

      <div className="hero-left">

        <h1>
          Találja meg álmai ingatlanát!
        </h1>

        <p>
          Üdvözlöm az Ingatlankezelő rendszerben!
          A platform segítségével egyszerűen
          kezelheti ingatlanjaidat, bérlőit,
          szerződéseit és fizetéseit egyetlen
          modern felületen.
        </p>

        <p>
          Böngésszen az elérhető ingatlanok között,
          kövesse nyomon a bérleti folyamatokat
          és kezelje a kapcsolódó adminisztrációt
          gyorsan és hatékonyan.
        </p>

        <Link
          to="/ingatlanok"
          className="hero-button"
        >
          Ingatlanok megtekintése
        </Link>

      </div>

      <div className="hero-right">

        <img
          src="/images/ingatlan.png"
          alt="Ingatlan"
        />

      </div>

    </div>

  );

}

function App() {

  return (

    <BrowserRouter>

      <Menu />

      <Routes>

        <Route
          path="/"
          element={<Fooldal />}
        />

        <Route
          path="/ingatlanok"
          element={<Ingatlanok />}
        />

        <Route
          path="/berlok"
          element={<Berlok />}
        />

        <Route
          path="/szerzodesek"
          element={<Szerzodesek />}
        />

        <Route
          path="/fizetesek"
          element={<Fizetesek />}
        />

        <Route
          path="/profil"
          element={<Profil />}
        />

        <Route
          path="/uzenetek"
          element={<Uzenetek />}
        />

        <Route
          path="/bejelentkezes"
          element={<Bejelentkezes />}
        />

        <Route
          path="/regisztracio"
          element={<Regisztracio />}
        />

      </Routes>

    </BrowserRouter>

  );

}

export default App;