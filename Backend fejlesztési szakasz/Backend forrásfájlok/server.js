const express = require("express");
const cors = require("cors");

const regisztracioRoutes =
    require("./routes/regisztracio");
const bejelentkezesRoutes =
    require("./routes/bejelentkezes");

const ingatlanletrehozasRoutes =
    require("./routes/ingatlanletrehozas");
const ingatlanlistazasRoutes =
    require("./routes/ingatlanlistazas");
const ingatlanmodositasRoutes =
    require("./routes/ingatlanmodositas");
const inglantorlesRoutes =
    require("./routes/inglantorles");

const berlolistazasRoutes =
    require("./routes/berlolistazas");

const szerzodesletrehozasRoutes =
    require("./routes/szerzodesletrehozas");
const szerzodeslistazasRoutes =
    require("./routes/szerzodeslistazas");
const szerzodesmodositasRoutes =
    require("./routes/szerzodesmodositas");
const szerzodestorlesRoutes =
    require("./routes/szerzodestorles");

const fizetesletrehozasRoutes =
    require("./routes/fizetesletrehozas");
const fizeteslistazasRoutes =
    require("./routes/fizeteslistazas");
const fizetesmodositasRoutes =
    require("./routes/fizetesmodositas");
const fizetestorlesRoutes =
    require("./routes/fizetestorles");

const uzenetkuldesRoutes =
    require("./routes/uzenetkuldes");
const uzenetlistazasRoutes =
    require("./routes/uzenetlistazas");

const profilmodositasRoutes =
    require("./routes/profilmodositas");
const profiltorlesRoutes =
    require("./routes/profiltorles");

const app = express();

app.use(cors());
app.use(express.json());

/* Hitelesítés */

app.use(
    "/api/regisztracio",
    regisztracioRoutes
);

app.use(
    "/api/bejelentkezes",
    bejelentkezesRoutes
);

/* Ingatlanok */

app.use(
    "/api/ingatlanletrehozas",
    ingatlanletrehozasRoutes
);

app.use(
    "/api/ingatlanlistazas",
    ingatlanlistazasRoutes
);

app.use(
    "/api/ingatlanmodositas",
    ingatlanmodositasRoutes
);

app.use(
    "/api/inglantorles",
    inglantorlesRoutes
);

/* Bérlők */

app.use(
    "/api/berlolistazas",
    berlolistazasRoutes
);

/* Szerződések */

app.use(
    "/api/szerzodesletrehozas",
    szerzodesletrehozasRoutes
);

app.use(
    "/api/szerzodeslistazas",
    szerzodeslistazasRoutes
);

app.use(
    "/api/szerzodesmodositas",
    szerzodesmodositasRoutes
);

app.use(
    "/api/szerzodestorles",
    szerzodestorlesRoutes
);

/* Fizetések */

app.use(
    "/api/fizetesletrehozas",
    fizetesletrehozasRoutes
);

app.use(
    "/api/fizeteslistazas",
    fizeteslistazasRoutes
);

app.use(
    "/api/fizetesmodositas",
    fizetesmodositasRoutes
);

app.use(
    "/api/fizetestorles",
    fizetestorlesRoutes
);

/* Üzenetek */

app.use(
    "/api/uzenetkuldes",
    uzenetkuldesRoutes
);

app.use(
    "/api/uzenetlistazas",
    uzenetlistazasRoutes
);

/* Profil */

app.use(
    "/api/profilmodositas",
    profilmodositasRoutes
);

app.use(
    "/api/profiltorles",
    profiltorlesRoutes
);

/* Teszt végpont */

app.get("/", (req, res) => {

    res.json({
        siker: true,
        uzenet: "Backend működik!"
    });

});

/* 404 */

app.use((req, res) => {

    res.status(404).json({
        siker: false,
        uzenet: "A kért végpont nem található!"
    });

});

app.listen(3001, () => {

    console.log(
        "A backend sikeresen elindult a 3001-es porton."
    );

});