# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

## [Unreleased]

_Noch keine offenen Änderungen._

## [2.0.0] - 2026-08-04

_Versionssprung auf 2.0 statt 1.11: Der Kalender wechselt hier die Kategorie
– von "Website, die man besucht" zu "App, die man installiert und auch
offline nutzen kann". Das ist ein größerer Schritt als ein normales
Funktions-Update, daher die erste Ziffer statt nur die zweite._

### Added
- **PWA Phase 1 – Installierbarkeit & Offline-Fähigkeit:**
  * `manifest.webmanifest` ergänzt (Name, Icons, Standalone-Anzeige,
    Theme-Farbe) – Kalender ist auf Android jetzt als App installierbar
  * `sw.js` (Service Worker) ergänzt: Network-first für HTML-Seiten (bei
    bestehender Verbindung immer aktuellster Stand, da laufend Updates
    kommen), Cache-first für statische Assets (Icons). Per Playwright mit
    echtem Offline-Modus getestet (Netzwerk vollständig deaktiviert) –
    Kalender und Modulverzeichnis laden beide korrekt aus dem Cache
  * Service-Worker-Registrierung in `index.html` UND `module.html` (beide
    Seiten funktionieren offline, unabhängig vom Einstiegspunkt)
- **Private Notizen pro Termin:** neues Textfeld in der Termin-Detailan-
  sicht, rein lokal im `localStorage` gespeichert (kein Server, kein Sync,
  bleibt auf dem jeweiligen Gerät). Automatisches Speichern mit kurzer
  Bestätigung ("Gespeichert ✓").
- README um Abschnitt "App-Installation (PWA)" ergänzt, inkl. Hinweis zur
  `CACHE_VERSION` in `sw.js` bei künftigen Updates.

## [1.10.1] - 2026-08-04

### Added
- Planungsdokument `PLANUNG_Modulverzeichnis-v2.md` ergänzt: dokumentiert
  den Plan, das Modulverzeichnis zu einem eigenständigen, öffentlich mit
  anderen Studierenden teilbaren Projekt auszubauen (eigenes Repo + eigene
  Subdomain, Semesterauswahl statt fester Vorauswahl, alle 28 Module farbig
  nach Studienbereich statt nur 6, Modulverantwortliche, Workload-Aufteilung,
  Verwendbarkeit in anderen Studiengängen, Link zum offiziellen PDF-Hand-
  buch, Stand-Hinweis, Disclaimer, Kontakt-E-Mail, QR-Code). Reine Doku-
  mentation, keine Umsetzung – zurückgestellt bis nach der PWA-Einführung.
- Kurzer Verweis darauf in der README ("Geplant"-Abschnitt) ergänzt.

## [1.10.0] - 2026-08-03

### Added
- **"Heute"-Button** neben der Monatsnavigation, springt direkt zum
  aktuellen Monat. Liegt "heute" außerhalb des angezeigten Semester-
  zeitraums (z. B. vor Vorlesungsbeginn), springt der Button stattdessen
  zum jeweils nächstgelegenen Rand (erster bzw. letzter angezeigter Monat).

### Changed
- Code-Aufräumen (per Pixel-Diff gegen die Vorversion verifiziert, keine
  sichtbaren Änderungen):
  * Modulfarben (Hintergrund/Text/Rahmen pro Modul) waren doppelt gepflegt
    – einmal hartkodiert als CSS-Variablen, einmal im JS-Objekt `MODS`.
    Die CSS-Variablen werden jetzt zur Laufzeit aus `MODS` gesetzt, `MODS`
    ist die einzige Quelle. Dabei auch uneinheitliche Schreibweise der
    Variablennamen (`--m10-bg`/`--za-bg` klein vs. Rest groß) vereinheitlicht.
  * Überflüssige zweite Sortierung der Termine pro Tageszelle entfernt
    (Termine kommen bereits sortiert aus dem `byDate`-Index, da `EVENTS`
    schon vorab global sortiert wird)
  * Zwei separate `keydown`-Listener (einer für Pfeiltasten/Escape, einer
    nur für Escape bei der Suche) zu einem gemeinsamen Listener
    zusammengeführt
  * `subscribeLink`-Element wird beim "Link kopieren"-Klick jetzt einmal
    gecacht statt bei jedem Klick neu per `getElementById` gesucht

## [1.9.0] - 2026-08-03

### Added
- Neues Logo (eigenes Design des Nutzers, Kalender-Icon in der
  "Textmarker og"-Farbpalette) als Favicon auf beiden Seiten (Kalender +
  Modulverzeichnis) gesetzt, ersetzt das bisherige violette Punkt-Icon.
- Vollständiger Icon-Satz unter `icons/` abgelegt: `favicon.ico`,
  16/32/48 px PNGs (schattenfreie Flachversion – der Schlagschatten des
  Originaldesigns ist bei so kleinen Größen kontraproduktiv), Apple-Touch-Icon
  (180 px), sowie 192 px und 512 px PNGs sowie eine maskable-Variante
  (512 px, vollflächiger Hintergrund + Sicherheitsabstand) für die künftige
  PWA-Umsetzung. Vektor-Quelldatei als `icons/logo.svg` mit abgelegt.

## [1.8.1] - 2026-08-03

### Fixed
- Versionsdaten im Changelog korrigiert: Ab Version 1.3.1 stand überall
  fälschlich "2026-08-01" (ein Platzhalter, der nach dem ersten Tag nicht
  mehr aktualisiert wurde). Anhand der echten Commit-Zeitstempel richtig-
  gestellt: 1.3.1–1.5.0 fanden am 2026-08-02 statt, 1.6.0–1.8.0 am
  2026-08-03. Versionen 1.0.0–1.3.0 waren bereits korrekt (2026-08-01).

## [1.8.0] - 2026-08-03

### Added
- **Neue Seite `module.html` – Modulverzeichnis:** Alle 28 Module des
  Studiengangs (Modul 01–28), basierend auf dem Modulhandbuch (Stand
  03/2026). Bewusst **ohne Modulverantwortliche**.
  - Studienverlaufsplan-Grafik: alle Module nach Semestern (1.–7.) sortiert,
    aktuelles Semester (2.) farblich identisch zu den Modulfarben im
    Kalender, frühere Semester gedimmt, kommende neutral dargestellt
  - Pro Modul: Bausteine (inkl. PL/UPL-Kennzeichnung), Modulprüfung
    (Nummer, Art, benotet/unbenotet), CP, SWS, Modulart (z. B.
    Wahlpflichtmodul)
  - Voraussetzungen als klickbare Verweise auf die jeweiligen Module (zeigt,
    wie Module aufeinander aufbauen, z. B. Praxissemester setzt Module
    01–18 voraus)
  - Frei zugänglich ohne Passwortschutz (Modulhandbuch-Inhalte sind nicht
    privat)
- Verlinkung zwischen den Seiten: "Modulverzeichnis →" im Kalender-Header,
  "← Zurück zum Kalender" im Modulverzeichnis

## [1.7.0] - 2026-08-03

### Added
- **Kalender-Abo (ICS):** Neue abonnierbare Kalenderdatei zum automatischen
  Import in Google/Apple/Outlook Kalender (`webcal://`-Link + kopierbare
  Alternative). Datei liegt unter einem zufälligen, nicht erratbaren
  Dateinamen (`feed-<hex>.ics`), da ICS-Feeds technisch bedingt außerhalb des
  Passwortschutzes liegen. Enthält Modul, Raum, LV-Nummer, Parallelgruppe und
  Lehrperson pro Termin, inkl. korrekter Zeitzonenbehandlung (Europe/Berlin,
  auch über die Zeitumstellung im Oktober hinweg getestet).
- Neues Skript `scripts/generate-ics.js` zur Neugenerierung der ICS-Datei
  direkt aus den EVENTS-Daten in `index.html` (eine einzige Datenquelle,
  Dateiname bleibt bei jeder Neugenerierung stabil).
- **Suchfunktion:** Freitextsuche nach Veranstaltung/Modulname in neuer
  Toolbar unterhalb der "Nächste Veranstaltung"-Anzeige. Ergebnis-Klick
  springt zum passenden Monat und öffnet die Detailansicht. Suche nach
  Dozierenden ist im Code vorbereitet, aber noch nicht aktiviert (Datenfeld
  vorhanden, Aktivierung ist eine Ein-Zeilen-Änderung in
  `eventMatchesQuery()`).

## [1.6.1] - 2026-08-03

### Fixed
- Passwortabfrage funktionierte nach Einrichtung der eigenen Domain nicht mehr
  (Klick auf "Weiter"/Enter reagierte nicht) – Ursache: Die Domain wurde über
  unverschlüsseltes HTTP statt HTTPS ausgeliefert (`https_enforced` war noch
  nicht aktiviert), wodurch die für die Passwortprüfung genutzte
  Web-Crypto-API (`crypto.subtle`) im Browser nicht verfügbar war, da diese
  nur in sicheren Kontexten (HTTPS) läuft. "Enforce HTTPS" in den
  GitHub-Pages-Einstellungen aktiviert, Fehler behoben und bestätigt getestet.

## [1.6.0] - 2026-08-03

### Added
- Eigene Domain eingerichtet: `CNAME`-Datei mit `kalender.xn--peppermita-lnb.de`
  ergänzt (Punycode-Version der Domain `kalender.peppermięta.de`, da GitHub
  Pages bei internationalisierten Domainnamen die Punycode-Schreibweise
  verlangt). DNS (CNAME-Record bei Strato) wurde vom Nutzer vorab eingerichtet.
- README-Live-Link auf die neue Domain aktualisiert; die bisherige
  `peppermieta.github.io/Kalender/`-Adresse bleibt zusätzlich erreichbar.

## [1.5.0] - 2026-08-02

### Added
- Neue Datei `PALETTE.md` mit der tatsächlich verwendeten Website-Farbpalette
  (Basis-UI + Modul-Akzentfarben), inklusive visueller Vorschaugrafik
  (`docs/website-palette.svg`) und Werten in mehreren Formaten (CSV, Hex,
  Array, Object, Extended Array mit RGB/CMYK/HSB/HSL/Lab, XML) unter
  `docs/website-palette.txt`.
- Neuer Abschnitt "Farbpalette" in der README mit eingebetteter Vorschau.

### Fixed
- Veraltete Erwähnung von "Lehrperson" in der README-Funktionsliste entfernt
  (seit Version 1.4.0 nicht mehr in der Termin-Detailansicht sichtbar).

## [1.4.0] - 2026-08-02

### Changed
- Code-Aufräumen: doppelte Wochentags-/Monatsnamen-Arrays zu zentralen
  Konstanten zusammengeführt, unnötige Neuberechnungen pro Kalenderzelle
  entfernt, überflüssige no-op-Bedingung vereinfacht. Rein intern – per
  Pixel-Diff gegen die Vorversion als visuell identisch verifiziert.
- Lehrperson-Zeile aus der Termin-Detailansicht entfernt (nur Anzeige). Das
  Datenfeld bleibt in den Terminen erhalten, z. B. für eine spätere
  ICS-Export-Funktion.

## [1.3.1] - 2026-08-02

### Removed
- Alte ⭐-Prioritäts-Markierungen aus drei Veranstaltungstiteln entfernt
  (Workshop/Methodikseminar Kunst, Sozialverwaltungsrecht, Rechtliche
  Grundlagen und Einführung in das Grundsicherungsrecht) – Überbleibsel aus
  der ursprünglichen Belegungs-/Priorisierungsphase, ohne aktuelle Bedeutung.
  Termine, Räume, Lehrpersonen und LV-Nummern bleiben unverändert.

## [1.3.0] - 2026-08-01

### Added
- "Nächste Veranstaltung"-Anzeige direkt unter dem Header: zeigt Uhrzeit, Modulfarbe
  und Titel des nächsten anstehenden Termins (bei einem Termin am selben Tag steht
  dort "heute, HH:MM Uhr"). Klick/Tap öffnet die gewohnte Detailansicht.

### Changed
- Seitentitel (Browser-Tab & Login-Screen) von "Vorlesungsverzeichnis" zurück zu
  "Vorlesungskalender" geändert.

## [1.2.1] - 2026-08-01

### Added
- README.md mit Projektbeschreibung, Feature-Übersicht und Pflegehinweisen (u. a.
  zur Raumnummern-Zuordnung).

### Removed
- Veraltete, nicht mehr genutzte `v1index.html` aus dem Repository entfernt.

## [1.2.0] - 2026-08-01

### Added
- Platzhalter-Mechanismus für Raumnummern: zentrale `ROOMS`-Zuordnung nach
  LV-Nummer im Code, Anzeige im Termin-Detail-Modal ("wird noch bekannt gegeben",
  bis ein Raum eingetragen ist).
- Modulkürzel (z. B. "M02") direkt im Termin-Chip sichtbar gemacht – vor allem
  relevant für die mobile Ansicht, da dort die Farb-Legende ausgeblendet ist.

## [1.1.1] - 2026-08-01

### Added
- Favicon ergänzt: violetter Punkt (#5B3FC8), passend zum Akzentton der Seite,
  als eingebettetes SVG direkt im Quellcode (keine separate Bilddatei nötig).

## [1.1.0] - 2026-08-01

### Changed
- Mobile Ansicht (unter 700px Breite) grundlegend überarbeitet: einspaltige
  Tagesliste statt gequetschtem 7-Spalten-Raster, Termine brechen jetzt um statt
  abgeschnitten zu werden, Wochentagskürzel steht direkt am Datum (z. B. "Mo 5").
- Auf Touch-Geräten Wisch-Geste (Swipe) zur Monatsnavigation ergänzt.

## [1.0.2] - 2026-08-01

### Changed
- Login-Screen (Titel & Browser-Tab) zeigte ab dieser Version nur noch einen
  generischen Titel ohne Semesterangabe, um vor dem Passwort keine Details
  preiszugeben. (In 1.3.0 wurde der sichtbare Text erneut angepasst.)

## [1.0.1] - 2026-08-01

### Changed
- Reihenfolge der Modul-Legende sortiert: M02 → M06 → M07 → M08 → M09 → M10,
  Freiwilliges Zusatzangebot (ZA) ans Ende gesetzt.

## [1.0.0] - 2026-08-01

### Added
- Erste Version des Vorlesungskalenders für WS 2026/27 (Bachelor Soziale Arbeit,
  2. Fachsemester), erstellt aus den bestätigten Veranstaltungsbelegungen der
  einzelnen Module (M02, M06–M10).
- Farbcodierung der Veranstaltungen nach Modul, inkl. Legende und Termin-
  Detailansicht (Datum, Uhrzeit, Modul, Lehrperson, LV-Nummer, Parallelgruppe).
- Anonymisierte Version ohne Name, Matrikelnummer und Hochschule.
- Clientseitiger Passwortschutz (SHA-256-Hash im Quellcode).
- Hosting über GitHub Pages eingerichtet: https://peppermieta.github.io/Kalender/
