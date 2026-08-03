# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

## [Unreleased]

_Noch keine offenen Änderungen._

## [1.7.0] - 2026-08-01

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

## [1.6.1] - 2026-08-01

### Fixed
- Passwortabfrage funktionierte nach Einrichtung der eigenen Domain nicht mehr
  (Klick auf "Weiter"/Enter reagierte nicht) – Ursache: Die Domain wurde über
  unverschlüsseltes HTTP statt HTTPS ausgeliefert (`https_enforced` war noch
  nicht aktiviert), wodurch die für die Passwortprüfung genutzte
  Web-Crypto-API (`crypto.subtle`) im Browser nicht verfügbar war, da diese
  nur in sicheren Kontexten (HTTPS) läuft. "Enforce HTTPS" in den
  GitHub-Pages-Einstellungen aktiviert, Fehler behoben und bestätigt getestet.

## [1.6.0] - 2026-08-01

### Added
- Eigene Domain eingerichtet: `CNAME`-Datei mit `kalender.xn--peppermita-lnb.de`
  ergänzt (Punycode-Version der Domain `kalender.peppermięta.de`, da GitHub
  Pages bei internationalisierten Domainnamen die Punycode-Schreibweise
  verlangt). DNS (CNAME-Record bei Strato) wurde vom Nutzer vorab eingerichtet.
- README-Live-Link auf die neue Domain aktualisiert; die bisherige
  `peppermieta.github.io/Kalender/`-Adresse bleibt zusätzlich erreichbar.

## [1.5.0] - 2026-08-01

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

## [1.4.0] - 2026-08-01

### Changed
- Code-Aufräumen: doppelte Wochentags-/Monatsnamen-Arrays zu zentralen
  Konstanten zusammengeführt, unnötige Neuberechnungen pro Kalenderzelle
  entfernt, überflüssige no-op-Bedingung vereinfacht. Rein intern – per
  Pixel-Diff gegen die Vorversion als visuell identisch verifiziert.
- Lehrperson-Zeile aus der Termin-Detailansicht entfernt (nur Anzeige). Das
  Datenfeld bleibt in den Terminen erhalten, z. B. für eine spätere
  ICS-Export-Funktion.

## [1.3.1] - 2026-08-01

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
