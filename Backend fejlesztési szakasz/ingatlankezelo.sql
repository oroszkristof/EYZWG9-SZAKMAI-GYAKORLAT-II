CREATE DATABASE ingatlankezelo;
USE ingatlankezelo;



CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nev VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    jelszo VARCHAR(255) NOT NULL,
    szerepkor VARCHAR(50) NOT NULL,
    telefonszam VARCHAR(30),
    letrehozasdatum DATETIME DEFAULT CURRENT_TIMESTAMP
);



CREATE TABLE ingatlanok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tulajdonosid INT NOT NULL,
    cim VARCHAR(255) NOT NULL,
    tipus VARCHAR(100),
    szobakszama INT,
    haviar DECIMAL(10,2),
    leiras TEXT,

    CONSTRAINT fk_ingatlan_tulajdonos
    FOREIGN KEY (tulajdonosid)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



CREATE TABLE berlok (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid INT NOT NULL UNIQUE,
    nev VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    telefonszam VARCHAR(30),
    szemelyiszam VARCHAR(50),
    lakcim VARCHAR(255),

    CONSTRAINT fk_berlo_user
    FOREIGN KEY (userid)
    REFERENCES users(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



CREATE TABLE szerzodesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ingatlanid INT NOT NULL,
    berloid INT NOT NULL,
    kezdetdatum DATE NOT NULL,
    vegdatum DATE NOT NULL,
    havidij DECIMAL(10,2),
    statusz VARCHAR(50),

    CONSTRAINT fk_szerzodes_ingatlan
    FOREIGN KEY (ingatlanid)
    REFERENCES ingatlanok(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE,

    CONSTRAINT fk_szerzodes_berlo
    FOREIGN KEY (berloid)
    REFERENCES berlok(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);



CREATE TABLE fizetesek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    szerzodesid INT NOT NULL,
    osszeg DECIMAL(10,2) NOT NULL,
    fizetesdatum DATE NOT NULL,
    statusz VARCHAR(50),
    fizetesmod VARCHAR(50),
    megjegyzes TEXT,

    CONSTRAINT fk_fizetes_szerzodes
    FOREIGN KEY (szerzodesid)
    REFERENCES szerzodesek(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


CREATE TABLE uzenetek (
    id INT AUTO_INCREMENT PRIMARY KEY,
    kuldoid INT NOT NULL,
    targy VARCHAR(255),
    uzenet TEXT NOT NULL,
    kuldesdatum DATETIME DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_uzenet_kuldo
    FOREIGN KEY (kuldoid)
    REFERENCES berlok(id)
    ON DELETE CASCADE
    ON UPDATE CASCADE
);


INSERT INTO users (nev, email, jelszo, szerepkor, telefonszam) VALUES
('Kovács István', 'istvan.kovacs@gmail.com', '1234', 'admin', '06301111111'),
('Nagy József', 'jozsef.nagy@gmail.com', '1234', 'admin', '06302222222'),
('Tóth Péter', 'peter.toth@gmail.com', '1234', 'berlo', '06303333333'),
('Kiss Anna', 'anna.kiss@gmail.com', '1234', 'berlo', '06304444444'),
('Szabó Dávid', 'david.szabo@gmail.com', '1234', 'berlo', '06305555555'),
('Varga Éva', 'eva.varga@gmail.com', '1234', 'berlo', '06306666666'),
('Molnár Gábor', 'gabor.molnar@gmail.com', '1234', 'berlo', '06307777777'),
('Farkas Dóra', 'dora.farkas@gmail.com', '1234', 'berlo', '06308888888'),
('Horváth Balázs', 'balazs.horvath@gmail.com', '1234', 'berlo', '06309999999'),
('Lakatos Krisztián', 'krisztian.lakatos@gmail.com', '1234', 'berlo', '06301234567'),
('Papp Renáta', 'renata.papp@gmail.com', '1234', 'berlo', '06307654321'),
('Biró Zoltán', 'zoltan.biro@gmail.com', '1234', 'berlo', '06302345678');


INSERT INTO berlok (userid, nev, email, telefonszam, szemelyiszam, lakcim) VALUES
(3,'Tóth Péter','peter.toth@gmail.com','06303333333','AA123456','Budapest'),
(4,'Kiss Anna','anna.kiss@gmail.com','06304444444','BB234567','Debrecen'),
(5,'Szabó Dávid','david.szabo@gmail.com','06305555555','CC345678','Miskolc'),
(6,'Varga Éva','eva.varga@gmail.com','06306666666','DD456789','Nyíregyháza'),
(7,'Molnár Gábor','gabor.molnar@gmail.com','06307777777','EE567890','Eger'),
(8,'Farkas Dóra','dora.farkas@gmail.com','06308888888','FF678901','Szeged'),
(9,'Horváth Balázs','balazs.horvath@gmail.com','06309999999','GG789012','Pécs'),
(10,'Lakatos Krisztián','krisztian.lakatos@gmail.com','06301234567','HH890123','Győr'),
(11,'Papp Renáta','renata.papp@gmail.com','06307654321','II901234','Kecskemét'),
(12,'Biró Zoltán','zoltan.biro@gmail.com','06302345678','JJ012345','Székesfehérvár');

INSERT INTO ingatlanok (tulajdonosid, cim, tipus, szobakszama, haviar, leiras) VALUES
(1,'Budapest, Kossuth utca 12.','Panel',2,150000,'Felújított panel lakás'),
(1,'Budapest, Petőfi utca 8.','Társasház',3,180000,'Belvárosi lakás'),
(1,'Debrecen, Fő utca 21.','Ház',4,220000,'Családi ház'),
(1,'Nyíregyháza, Sóstó utca 4.','Ház',5,250000,'Kertes ingatlan'),
(1,'Miskolc, Arany János utca 7.','Panel',2,140000,'Jó állapotú lakás'),
(2,'Szeged, Tisza utca 15.','Garzon',1,120000,'Belvárosi garzon'),
(2,'Pécs, Rákóczi utca 3.','Társasház',2,160000,'Felújított lakás'),
(2,'Győr, Bartók Béla utca 10.','Ház',4,210000,'Nagy családi ház'),
(2,'Kecskemét, Dózsa György út 5.','Panel',2,145000,'Központi elhelyezkedés'),
(2,'Eger, Vár utca 11.','Társasház',3,170000,'Újszerű ingatlan');

INSERT INTO szerzodesek
(ingatlanid, berloid, kezdetdatum, vegdatum, havidij, statusz)
VALUES
(2,2,'2026-01-01','2026-12-31',150000,'Aktív'),
(3,3,'2026-01-01','2026-12-31',180000,'Aktív'),
(4,4,'2026-02-01','2027-01-31',220000,'Aktív'),
(5,5,'2026-03-01','2027-02-28',250000,'Aktív'),
(6,6,'2026-01-15','2026-12-15',140000,'Aktív'),
(7,7,'2026-04-01','2027-03-31',120000,'Aktív'),
(8,8,'2026-05-01','2027-04-30',160000,'Aktív'),
(9,9,'2026-06-01','2027-05-31',210000,'Aktív'),
(10,10,'2026-07-01','2027-06-30',145000,'Aktív'),
(11,11,'2026-08-01','2027-07-31',170000,'Aktív');

INSERT INTO fizetesek
(szerzodesid, osszeg, fizetesdatum, statusz, fizetesmod, megjegyzes)
VALUES
(4,150000,'2026-01-05','Befizetve','Átutalás','Januári bérleti díj'),
(5,180000,'2026-01-05','Befizetve','Bankkártya','Januári bérleti díj'),
(16,220000,'2026-02-05','Befizetve','Átutalás','Februári bérleti díj'),
(17,250000,'2026-03-05','Befizetve','Átutalás','Márciusi bérleti díj'),
(18,140000,'2026-01-20','Befizetve','Készpénz','Januári bérleti díj'),
(19,120000,'2026-04-05','Befizetve','Bankkártya','Áprilisi bérleti díj'),
(20,160000,'2026-05-05','Befizetve','Átutalás','Májusi bérleti díj'),
(21,210000,'2026-06-05','Befizetve','Átutalás','Júniusi bérleti díj'),
(22,145000,'2026-07-05','Befizetve','Készpénz','Júliusi bérleti díj'),
(23,170000,'2026-08-05','Befizetve','Bankkártya','Augusztusi bérleti díj');

INSERT INTO uzenetek
(kuldoid, targy, uzenet)
VALUES
(2,'Fűtési probléma','A nappaliban nem működik megfelelően a fűtés.'),
(3,'Csőtörés bejelentése','A konyhában szivárog a víz a mosogató alatt.'),
(4,'Kulcsmásolat igénylése','Szeretnék egy pótkulcsot kérni az ingatlanhoz.'),
(5,'Villanykapcsoló hiba','A hálószobában nem működik a villanykapcsoló.'),
(6,'Festési igény','A lakás egyik falának újrafestését szeretném kérni.'),
(7,'Internet probléma','Nem működik az internetkapcsolat az ingatlanban.'),
(8,'Parkolóhely kérés','Érdeklődnék a parkolóhely bérlésének lehetőségéről.'),
(9,'Lift meghibásodás','A társasház liftje nem üzemel megfelelően.'),
(10,'Ablak javítás','Az egyik ablak nehezen zárható és huzatos.'),
(11,'Szerződés hosszabbítás','Szeretnék érdeklődni a szerződés meghosszabbításáról.');
