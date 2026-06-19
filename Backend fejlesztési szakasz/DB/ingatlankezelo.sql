-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2026. Jún 19. 12:31
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
(37, 33, 14500.00, '2026-06-19', 'Függőben', 'Bankkártya', 'Új fizetési kötelezettség!');

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
(39, 15, 'Debrecen, Fő utca 21.', 'Ház', 4, 220000.00, 'Családi ház'),
(40, 15, 'Nyíregyháza, Sóstó utca 4.', 'Ház', 5, 250000.00, 'Kertes ingatlan'),
(41, 15, 'Miskolc, Arany János utca 7.', 'Panel', 2, 140000.00, 'Jó állapotú lakás'),
(42, 19, 'Szeged, Tisza utca 15.', 'Garzon', 1, 120000.00, 'Belvárosi garzon'),
(43, 19, 'Pécs, Rákóczi utca 3.', 'Társasház', 2, 160000.00, 'Felújított lakás'),
(44, 19, 'Győr, Bartók Béla utca 10.', 'Ház', 4, 210000.00, 'Nagy családi ház'),
(45, 20, 'Kecskemét, Dózsa György út 5.', 'Panel', 2, 145000.00, 'Központi elhelyezkedés'),
(46, 20, 'Eger, Vár utca 11.', 'Társasház', 3, 170000.00, 'Újszerű ingatlan');

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
(33, 39, 12, '2025-12-31', '2026-12-30', 120000.00, 'Lejárt'),
(34, 39, 10, '2026-01-01', '2026-02-27', 14500.00, 'Aktív');

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
  `letrehozasdatum` datetime DEFAULT current_timestamp(),
  `szemelyiszam` varchar(50) DEFAULT NULL,
  `lakcim` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- A tábla adatainak kiíratása `users`
--

INSERT INTO `users` (`id`, `nev`, `email`, `jelszo`, `szerepkor`, `telefonszam`, `letrehozasdatum`, `szemelyiszam`, `lakcim`) VALUES
(10, 'Lakatos Krisztián', 'krisztian.lakatos@gmail.com', '1234', 'berlo', '06301234567www', '2026-06-02 22:30:14', 'HH890123', 'Miskolc'),
(12, 'Papp Renáta', 'renata.papp@gmail.com', '1234', 'berlo', '06307654321', '2026-06-02 22:30:14', 'Nincs megadva', 'Nincs megadva'),
(13, 'Biró Zoltán', 'zoltan.biro@gmail.com', '1234', 'berlo', '06302345678', '2026-06-02 22:30:14', 'Nincs megadva', 'Nincs megadva'),
(14, 'Kristóf', 'kristof.orosz.11@gmail.com', '1111', 'felhasznalo', '625025', '2026-06-04 22:45:59', 'Nincs megadva', 'Nincs megadva'),
(15, 'kristóf', 'kristof.orosz.10@gmail.com', 'ddd', 'admin', '3453', '2026-06-04 22:57:59', 'Nincs megadva', 'Nincs megadva'),
(16, 'krtk', 'kristof.orosz.09@gmail.com', '11', 'felhasznalo', '3453', '2026-06-04 23:00:20', 'Nincs megadva', 'Nincs megadva'),
(17, 'ktkz', 'kristof.orosz.07@gmail.com', 'tt', 'felhasznalo', '3453', '2026-06-04 23:45:08', 'Nincs megadva', 'Nincs megadva'),
(18, 'Kristóf', 'kristof.orosz.05@gmail.com', 'AAA', 'felhasznalo', '3453', '2026-06-08 22:09:44', 'Nincs megadva', 'Nincs megadva'),
(19, 'Kristóf Orosz', 'kristof.orosz.04@gmail.com', 'AAQQ', 'admin', '34335353', '2026-06-08 22:19:26', 'Nincs megadva', 'Nincs megadva'),
(20, 'Kristóf Orosz', 'kristof.orosz.03@gmail.com', 'AA', 'admin', '34335353', '2026-06-08 22:20:32', 'Nincs megadva', 'Nincs megadva'),
(21, 'gm', 'kristof.orosz.01@gmail.com', 'qq', 'felhasznalo', '34335353', '2026-06-09 23:14:02', 'Nincs megadva', 'Nincs megadva'),
(22, 'Orosz', 'kristof.orosz.20@gmail.com', 'ff', 'felhasznalo', '34335353', '2026-06-09 23:19:24', 'Nincs megadva', 'Nincs megadva'),
(23, 'Kristof', 'kristof.orosz.21@gmail.com', 'ff', 'felhasznalo', '34335353', '2026-06-09 23:19:55', 'Nincs megadva', 'Nincs megadva'),
(24, 'kuk', 'kristof.orosz.22@gmail.com', 'ht', 'berlo', '34335354', '2026-06-09 23:22:27', 'Nincs megadva', 'Nincs megadva'),
(25, 'Teszt Béla', 'tesztberlo@gmail.com', '123456', 'berlo', '+36301234567', '2026-06-09 23:45:11', '123456AB', '1111 Budapest Teszt utca 1.'),
(26, 'Kristóf', 'kristof.orosz.23@gmail.com', 'AA', 'berlo', '34335353', '2026-06-10 11:22:01', '225', '5522, szerencs magyar utca 21'),
(28, 'Kristóf', 'kristoforosz@gmail.com', 'AA', 'berlo', '0112', '2026-06-11 20:22:51', '573753FE', '2951, Bodrogkisfalud');

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
(20, 10, 'Ablak javítás', 'Az egyik ablak nehezen zárható és huzatos.', '2026-06-02 22:48:24'),
(30, 24, 'Próba', 'Ez itt egy üzenet.', '2026-06-11 20:25:04');

--
-- Indexek a kiírt táblákhoz
--

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
-- AUTO_INCREMENT a táblához `fizetesek`
--
ALTER TABLE `fizetesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT a táblához `ingatlanok`
--
ALTER TABLE `ingatlanok`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- AUTO_INCREMENT a táblához `szerzodesek`
--
ALTER TABLE `szerzodesek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT a táblához `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT a táblához `uzenetek`
--
ALTER TABLE `uzenetek`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- Megkötések a kiírt táblákhoz
--

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
  ADD CONSTRAINT `fk_uzenet_kuldo` FOREIGN KEY (`kuldoid`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
