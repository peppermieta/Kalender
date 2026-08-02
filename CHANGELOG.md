# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

## [Unreleased]

_Noch keine offenen Änderungen._

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
