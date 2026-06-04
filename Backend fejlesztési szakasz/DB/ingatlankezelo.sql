-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jún 04. 18:52
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `ingatlankezelo`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `berlok`
--

CREATE TABLE `berlok` (
  `id` int(11) NOT NULL,
  `userid` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `telefonszam` varchar(30) DEFAULT NULL,
  `szemelyiszam` varchar(50) DEFAULT NULL,
  `lakcim` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `berlok`
--

INSERT INTO `berlok` (`id`, `userid`, `nev`, `email`, `telefonszam`, `szemelyiszam`, `lakcim`) VALUES
(2, 1, 'Kiss Bela', 'kissbela@gmail.com', '06301234567', 'AA123456', 'Budapest'),
(3, 3, 'Tóth Péter', '[peter.toth@gmail.com](mailto:peter.toth@gmail.com)', '06303333333', 'AA123456', 'Budapest'),
(4, 4, 'Kiss Anna', '[anna.kiss@gmail.com](mailto:anna.kiss@gmail.com)', '06304444444', 'BB234567', 'Debrecen'),
(5, 5, 'Szabó Dávid', '[david.szabo@gmail.com](mailto:david.szabo@gmail.com)', '06305555555', 'CC345678', 'Miskolc'),
(6, 6, 'Varga Éva', '[eva.varga@gmail.com](mailto:eva.varga@gmail.com)', '06306666666', 'DD456789', 'Nyíregyháza'),
(7, 7, 'Molnár Gábor', '[gabor.molnar@gmail.com](mailto:gabor.molnar@gmail.com)', '06307777777', 'EE567890', 'Eger'),
(8, 8, 'Farkas Dóra', '[dora.farkas@gmail.com](mailto:dora.farkas@gmail.com)', '06308888888', 'FF678901', 'Szeged'),
(9, 9, 'Horváth Balázs', '[balazs.horvath@gmail.com](mailto:balazs.horvath@gmail.com)', '06309999999', 'GG789012', 'Pécs'),
(10, 10, 'Lakatos Krisztián', '[krisztian.lakatos@gmail.com](mailto:krisztian.lakatos@gmail.com)', '06301234567', 'HH890123', 'Győr'),
(11, 11, 'Papp Renáta', '[renata.papp@gmail.com](mailto:renata.papp@gmail.com)', '06307654321', 'II901234', 'Kecskemét'),
(12, 12, 'Biró Zoltán', '[zoltan.biro@gmail.com](mailto:zoltan.biro@gmail.com)', '06302345678', 'JJ012345', 'Székesfehérvár');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `fizetesek`
--

CREATE TABLE `fizetesek` (
  `id` int(11) NOT NULL,
  `szerzodesid` int(11) NOT NULL,
  `osszeg` decimal(10,2) NOT NULL,
  `fizetesdatum` date NOT NULL,
  `statusz` varchar(50) DEFAULT NULL,
  `fizetesmod` varchar(50) DEFAULT NULL,
  `megjegyzes` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `fizetesek`
--

INSERT INTO `fizetesek` (`id`, `szerzodesid`, `osszeg`, `fizetesdatum`, `statusz`, `fizetesmod`, `megjegyzes`) VALUES
(2, 4, 180000.00, '2026-01-10', 'Befizetve', 'Atutalas', 'Januari lakber'),
(23, 4, 150000.00, '2026-01-05', 'Befizetve', 'Átutalás', 'Januári bérleti díj'),
(24, 5, 180000.00, '2026-01-05', 'Befizetve', 'Bankkártya', 'Januári bérleti díj'),
(25, 16, 220000.00, '2026-02-05', 'Befizetve', 'Átutalás', 'Februári bérleti díj'),
(26, 17, 250000.00, '2026-03-05', 'Befizetve', 'Átutalás', 'Márciusi bérleti díj'),
(27, 18, 140000.00, '2026-01-20', 'Befizetve', 'Készpénz', 'Januári bérleti díj'),
(28, 19, 120000.00, '2026-04-05', 'Befizetve', 'Bankkártya', 'Áprilisi bérleti díj'),
(29, 20, 160000.00, '2026-05-05', 'Befizetve', 'Átutalás', 'Májusi bérleti díj'),
(30, 21, 210000.00, '2026-06-05', 'Befizetve', 'Átutalás', 'Júniusi bérleti díj'),
(31, 22, 145000.00, '2026-07-05', 'Befizetve', 'Készpénz', 'Júliusi bérleti díj'),
(32, 23, 170000.00, '2026-08-05', 'Befizetve', 'Bankkártya', 'Augusztusi bérleti díj');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `ingatlanok`
--

CREATE TABLE `ingatlanok` (
  `id` int(11) NOT NULL,
  `tulajdonosid` int(11) NOT NULL,
  `cim` varchar(255) NOT NULL,
  `tipus` varchar(100) DEFAULT NULL,
  `szobakszama` int(11) DEFAULT NULL,
  `haviar` decimal(10,2) DEFAULT NULL,
  `leiras` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `ingatlanok`
--

INSERT INTO `ingatlanok` (`id`, `tulajdonosid`, `cim`, `tipus`, `szobakszama`, `haviar`, `leiras`) VALUES
(2, 1, 'Budapest, Kossuth utca 10.', 'Tarsashaz', 3, 180000.00, 'Felujitott lakas'),
(3, 1, 'Budapest, Kossuth utca 10.', 'Tarsashaz', 3, 180000.00, 'Felujitott lakas'),
(4, 1, 'Budapest, Kossuth utca 12.', 'Panel', 2, 150000.00, 'Felújított panel lakás'),
(5, 1, 'Budapest, Petőfi utca 8.', 'Társasház', 3, 180000.00, 'Belvárosi lakás'),
(6, 1, 'Debrecen, Fő utca 21.', 'Ház', 4, 220000.00, 'Családi ház'),
(7, 1, 'Nyíregyháza, Sóstó utca 4.', 'Ház', 5, 250000.00, 'Kertes ingatlan'),
(8, 1, 'Miskolc, Arany János utca 7.', 'Panel', 2, 140000.00, 'Jó állapotú lakás'),
(9, 2, 'Szeged, Tisza utca 15.', 'Garzon', 1, 120000.00, 'Belvárosi garzon'),
(10, 2, 'Pécs, Rákóczi utca 3.', 'Társasház', 2, 160000.00, 'Felújított lakás'),
(11, 2, 'Győr, Bartók Béla utca 10.', 'Ház', 4, 210000.00, 'Nagy családi ház'),
(12, 2, 'Kecskemét, Dózsa György út 5.', 'Panel', 2, 145000.00, 'Központi elhelyezkedés'),
(13, 2, 'Eger, Vár utca 11.', 'Társasház', 3, 170000.00, 'Újszerű ingatlan');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `szerzodesek`
--

CREATE TABLE `szerzodesek` (
  `id` int(11) NOT NULL,
  `ingatlanid` int(11) NOT NULL,
  `berloid` int(11) NOT NULL,
  `kezdetdatum` date NOT NULL,
  `vegdatum` date NOT NULL,
  `havidij` decimal(10,2) DEFAULT NULL,
  `statusz` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `szerzodesek`
--

INSERT INTO `szerzodesek` (`id`, `ingatlanid`, `berloid`, `kezdetdatum`, `vegdatum`, `havidij`, `statusz`) VALUES
(4, 3, 2, '2026-01-01', '2026-12-31', 180000.00, 'Aktiv'),
(5, 3, 2, '2026-01-01', '2026-12-31', 180000.00, 'Aktiv'),
(16, 2, 2, '2026-01-01', '2026-12-31', 150000.00, 'Aktív'),
(17, 3, 3, '2026-01-01', '2026-12-31', 180000.00, 'Aktív'),
(18, 4, 4, '2026-02-01', '2027-01-31', 220000.00, 'Aktív'),
(19, 5, 5, '2026-03-01', '2027-02-28', 250000.00, 'Aktív'),
(20, 6, 6, '2026-01-15', '2026-12-15', 140000.00, 'Aktív'),
(21, 7, 7, '2026-04-01', '2027-03-31', 120000.00, 'Aktív'),
(22, 8, 8, '2026-05-01', '2027-04-30', 160000.00, 'Aktív'),
(23, 9, 9, '2026-06-01', '2027-05-31', 210000.00, 'Aktív'),
(24, 10, 10, '2026-07-01', '2027-06-30', 145000.00, 'Aktív'),
(25, 11, 11, '2026-08-01', '2027-07-31', 170000.00, 'Aktív');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nev` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `jelszo` varchar(255) NOT NULL,
  `szerepkor` varchar(50) NOT NULL,
  `telefonszam` varchar(30) DEFAULT NULL,
  `letrehozasdatum` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `nev`, `email`, `jelszo`, `szerepkor`, `telefonszam`, `letrehozasdatum`) VALUES
(1, 'Teszt Bela', 'teszt@teszt.hu', '123456', 'berlo', '06301234567', '2026-05-25 22:35:35'),
(2, 'Kovács István', '[istvan.kovacs@gmail.com](mailto:istvan.kovacs@gmail.com)', '1234', 'admin', '06301111111', '2026-06-02 22:30:14'),
(3, 'Nagy József', '[jozsef.nagy@gmail.com](mailto:jozsef.nagy@gmail.com)', '1234', 'admin', '06302222222', '2026-06-02 22:30:14'),
(4, 'Tóth Péter', '[peter.toth@gmail.com](mailto:peter.toth@gmail.com)', '1234', 'berlo', '06303333333', '2026-06-02 22:30:14'),
(5, 'Kiss Anna', '[anna.kiss@gmail.com](mailto:anna.kiss@gmail.com)', '1234', 'berlo', '06304444444', '2026-06-02 22:30:14'),
(6, 'Szabó Dávid', '[david.szabo@gmail.com](mailto:david.szabo@gmail.com)', '1234', 'berlo', '06305555555', '2026-06-02 22:30:14'),
(7, 'Varga Éva', '[eva.varga@gmail.com](mailto:eva.varga@gmail.com)', '1234', 'berlo', '06306666666', '2026-06-02 22:30:14'),
(8, 'Molnár Gábor', '[gabor.molnar@gmail.com](mailto:gabor.molnar@gmail.com)', '1234', 'berlo', '06307777777', '2026-06-02 22:30:14'),
(9, 'Farkas Dóra', '[dora.farkas@gmail.com](mailto:dora.farkas@gmail.com)', '1234', 'berlo', '06308888888', '2026-06-02 22:30:14'),
(10, 'Horváth Balázs', '[balazs.horvath@gmail.com](mailto:balazs.horvath@gmail.com)', '1234', 'berlo', '06309999999', '2026-06-02 22:30:14'),
(11, 'Lakatos Krisztián', '[krisztian.lakatos@gmail.com](mailto:krisztian.lakatos@gmail.com)', '1234', 'berlo', '06301234567', '2026-06-02 22:30:14'),
(12, 'Papp Renáta', '[renata.papp@gmail.com](mailto:renata.papp@gmail.com)', '1234', 'berlo', '06307654321', '2026-06-02 22:30:14'),
(13, 'Biró Zoltán', '[zoltan.biro@gmail.com](mailto:zoltan.biro@gmail.com)', '1234', 'berlo', '06302345678', '2026-06-02 22:30:14');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `uzenetek`
--

CREATE TABLE `uzenetek` (
  `id` int(11) NOT NULL,
  `kuldoid` int(11) NOT NULL,
  `targy` varchar(255) DEFAULT NULL,
  `uzenet` text NOT NULL,
  `kuldesdatum` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `uzenetek`
--

INSERT INTO `uzenetek` (`id`, `kuldoid`, `targy`, `uzenet`, `kuldesdatum`) VALUES
(1, 2, 'Hibabejelentes', 'A futes nem mukodik a lakasban.', '2026-06-02 22:13:21'),
(12, 2, 'Fűtési probléma', 'A nappaliban nem működik megfelelően a fűtés.', '2026-06-02 22:48:24'),
(13, 3, 'Csőtörés bejelentése', 'A konyhában szivárog a víz a mosogató alatt.', '2026-06-02 22:48:24'),
(14, 4, 'Kulcsmásolat igénylése', 'Szeretnék egy pótkulcsot kérni az ingatlanhoz.', '2026-06-02 22:48:24'),
(15, 5, 'Villanykapcsoló hiba', 'A hálószobában nem működik a villanykapcsoló.', '2026-06-02 22:48:24'),
(16, 6, 'Festési igény', 'A lakás egyik falának újrafestését szeretném kérni.', '2026-06-02 22:48:24'),
(17, 7, 'Internet probléma', 'Nem működik az internetkapcsolat az ingatlanban.', '2026-06-02 22:48:24'),
(18, 8, 'Parkolóhely kérés', 'Érdeklődnék a parkolóhely bérlésének lehetőségéről.', '2026-06-02 22:48:24'),
(19, 9, 'Lift meghibásodás', 'A társasház liftje nem üzemel megfelelően.', '2026-06-02 22:48:24'),
(20, 10, 'Ablak javítás', 'Az egyik ablak nehezen zárható és huzatos.', '2026-06-02 22:48:24'),
(21, 11, 'Szerződés hosszabbítás', 'Szeretnék érdeklődni a szerződés meghosszabbításáról.', '2026-06-02 22:48:24');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `berlok`
--
ALTER TABLE `berlok`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userid` (`userid`);

--
-- A tábla indexei `fizetesek`
--
ALTER TABLE `fizetesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_fizetes_szerzodes` (`szerzodesid`);

--
-- A tábla indexei `ingatlanok`
--
ALTER TABLE `ingatlanok`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_ingatlan_tulajdonos` (`tulajdonosid`);

--
-- A tábla indexei `szerzodesek`
--
ALTER TABLE `szerzodesek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_szerzodes_ingatlan` (`ingatlanid`),
  ADD KEY `fk_szerzodes_berlo` (`berloid`);

--
-- A tábla indexei `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- A tábla indexei `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_uzenet_kuldo` (`kuldoid`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `berlok`
--
ALTER TABLE `berlok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `fizetesek`
--
ALTER TABLE `fizetesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT a táblához `ingatlanok`
--
ALTER TABLE `ingatlanok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `szerzodesek`
--
ALTER TABLE `szerzodesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `berlok`
--
ALTER TABLE `berlok`
  ADD CONSTRAINT `fk_berlo_user` FOREIGN KEY (`userid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `fizetesek`
--
ALTER TABLE `fizetesek`
  ADD CONSTRAINT `fk_fizetes_szerzodes` FOREIGN KEY (`szerzodesid`) REFERENCES `szerzodesek` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `ingatlanok`
--
ALTER TABLE `ingatlanok`
  ADD CONSTRAINT `fk_ingatlan_tulajdonos` FOREIGN KEY (`tulajdonosid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `szerzodesek`
--
ALTER TABLE `szerzodesek`
  ADD CONSTRAINT `fk_szerzodes_berlo` FOREIGN KEY (`berloid`) REFERENCES `berlok` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_szerzodes_ingatlan` FOREIGN KEY (`ingatlanid`) REFERENCES `ingatlanok` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  ADD CONSTRAINT `fk_uzenet_kuldo` FOREIGN KEY (`kuldoid`) REFERENCES `berlok` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
