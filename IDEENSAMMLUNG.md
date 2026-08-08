# Vorlesungskalender – Ideensammlung

Noch nicht umgesetzte Funktionen, sortiert nach Umsetzbarkeit/Aufwand.
*(Stand: 8. August 2026)*

## ⚡ Schnell — geringer Aufwand

- **Druck-Stylesheet** – eigenes CSS für den Ausdruck: Passwort-Overlay,
  Buttons und Navigation ausgeblendet, nur eine saubere Monatsübersicht
  auf Papier.
  **✅ Umgesetzt** (v3.1.0)
- **Wochenansicht / 7-Tage-Agenda** – zusätzliche Ansicht neben Monat und
  Tag: eine kompakte Liste der nächsten 7 Tage, praktisch für den
  schnellen Überblick unterwegs.
- **Anpassbare Akzentfarbe** – eine der fünf Textmarker-Farben statt fest
  Lila als persönliche Akzentfarbe wählbar, rein kosmetisch, lokal
  gespeichert.

## ⚙ Mittel — machbar, etwas Umbau nötig

- **Dark Mode** – umschaltbares dunkles Farbschema, wie im
  Modulverzeichnis bereits umgesetzt; eigene abgestimmte Dunkel-Varianten
  für die Modulfarben statt reiner Invertierung.
- **Barrierefreiheits-Check (Phase 3)** – vollständige
  Tastaturbedienbarkeit der Tageszellen, ARIA-Labels/aria-live für
  Screenreader, Kontrastprüfung. Schon länger als offener Punkt
  vorgemerkt.
- **Push-Benachrichtigungen über ntfy.sh (Phase 2)** – kurz vor einem
  Termin eine Push-Benachrichtigung aufs Handy, über einen kostenlosen
  Dienst und einen GitHub-Actions-Workflow, ohne eigenen Server. Konzept
  bereits besprochen, nur noch nicht gebaut.
- **Eigene "Nächste Prüfung"-Anzeige** – ähnlich der bestehenden
  Next-Up-Leiste, aber gezielt nur für Prüfungs-/Abgabetermine, damit die
  zwischen normalen Terminen nicht untergehen.
- **Kalender ↔ Modulverzeichnis verknüpfen** – von einem Kalendertermin
  direkt zum zugehörigen Modul im Modulverzeichnis springen; der
  Modulcode steht an jedem Termin ja schon.
- **Archiv-Konzept für alte Semester** – mit wachsender Semesterzahl
  (Mehrsemester-Technik seit v3.0.0 vorhanden) stellt sich die Frage, wie
  alte, abgeschlossene Semester langfristig gehandhabt werden: alles
  weiter in einer Datei mit Semester-Umschalter, oder eingefrorene
  Einzelseiten pro Semester. Optionen bereits besprochen, Empfehlung für
  Ersteres gegeben, Entscheidung aber noch offen.

## 🏗 Größer — größere technische Themen

- **Echter geräteübergreifender Notiz-Sync** – ein richtiges Backend
  statt des manuellen Export/Imports, damit Notizen automatisch zwischen
  Geräten synchron bleiben. Bewusst als Fernziel zurückgestellt.
  **📄 Technisches Konzept ausgearbeitet** – siehe
  [`Notiz-Sync-Konzept.md`](./Notiz-Sync-Konzept.md)
- **Automatisierte HISinOne-Synchronisation** – Termine direkt aus dem
  Hochschulsystem übernehmen statt manueller Pflege. Technisch und
  rechtlich der anspruchsvollste Punkt dieser Liste.
- **Prospektive Belastungs-Heatmap** – eine farbcodierte Semesterkurve
  aus SWS, CP-Workload und Prüfungsterminen, kombiniert aus Kalender- und
  Modulverzeichnis-Daten.

## 💭 Abstrakt — Vision, aber trotzdem nützlich

- **Workload-Transparenz** – eine einfache Statistik ("X Kontaktstunden
  diese Woche"), um die eigene Auslastung über das Semester hinweg im
  Blick zu behalten.
- **Semester-Rückblick** – eine kleine, automatisch erzeugte
  Zusammenfassung am Semesterende ("X Termine, Y Prüfungen absolviert")
  als kleiner persönlicher Abschluss.
- **Intelligente Konflikt-Erkennung** – warnt automatisch, falls beim
  Eintragen neuer Termine zeitliche Überschneidungen entstehen – eine
  automatisierte Version dessen, was bei der ursprünglichen
  Stundenplanung einmal manuell geprüft wurde.
