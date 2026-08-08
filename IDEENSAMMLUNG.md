# Vorlesungskalender – Ideensammlung

Noch nicht umgesetzte Funktionen, sortiert nach Umsetzbarkeit/Aufwand.
*(Stand: 8. August 2026)*

## ⚡ Schnell — geringer Aufwand

- **Druck-Stylesheet** – eigenes CSS für den Ausdruck: Passwort-Overlay,
  Buttons und Navigation ausgeblendet, nur eine saubere Monatsübersicht
  auf Papier.
  **✅ Umgesetzt** (v3.1.0)
- **QR-Code für den Kalender-Abo-Link** – ein QR-Code neben "🔗 Abo-Link
  kopieren" im Verwalten-Menü.
  **✅ Umgesetzt** (v3.4.0) – Toggle-Button "📱 QR-Code anzeigen" blendet
  den Code direkt darunter ein. Kodiert dieselbe HTTPS-Feed-URL wie der
  Kopieren-Button, rein lokal generiert (eingebettete Bibliothek statt
  Drittanbieter-Dienst, da der Dateiname der einzige Schutz des Feeds
  ist, s. `scripts/generate-ics.js`).
- **Suchfilter nach Termin-Typ** – die bestehende Live-Suche um einen
  Filter/Umschalter "nur Prüfungen/Abgaben" ergänzen, damit gezielt
  danach gesucht werden kann, statt sie zwischen den normalen Terminen
  suchen zu müssen.
- **Feed-Aktualität anzeigen** – ein kleiner Hinweis im Verwalten-Menü
  ("Feed zuletzt aktualisiert am …").
  **✅ Umgesetzt** (v3.4.0) – liest eine eigene
  `X-KALENDER-GENERATED-AT`-Property aus der ausgelieferten ICS-Datei
  aus (zuverlässiger als HTTP-Caching-Header, die GitHub Pages nicht
  konsistent setzt), wird bei jedem Öffnen des Menüs neu geprüft.
  Service Worker behandelt den Feed dafür jetzt wie HTML als
  network-first statt cache-first.

## ⚙ Mittel — machbar, etwas Umbau nötig

- **Dark Mode** – umschaltbares dunkles Farbschema, wie im
  Modulverzeichnis bereits umgesetzt; eigene abgestimmte Dunkel-Varianten
  für die Modulfarben statt reiner Invertierung.
- **Push-Benachrichtigungen über ntfy.sh (Phase 2)** – kurz vor einem
  Termin eine Push-Benachrichtigung aufs Handy, über einen kostenlosen
  Dienst und einen GitHub-Actions-Workflow, ohne eigenen Server. Konzept
  bereits besprochen, nur noch nicht gebaut.
- **Next-Up-Leiste um Prüfungen/Abgaben erweitern** – Damit Prüfungs- und
  Abgabetermine zwischen den normalen Terminen nicht untergehen, zeigt
  die bestehende Next-Up-Leiste künftig zusätzlich zum nächsten Termin
  allgemein eine zweite Zeile mit der nächsten anstehenden Prüfung/
  Abgabe – unabhängig davon, wie weit sie in der Zukunft liegt. Nur wenn
  der ohnehin nächste Termin selbst schon eine Prüfung/Abgabe ist,
  entfällt die zweite Zeile (keine Dopplung). Technisch: `EVENTS`
  semesterübergreifend (wie beim bestehenden Next-Up schon der Fall)
  nach `type: "pruefung"/"abgabe"` filtern, chronologisch nächsten
  Eintrag suchen, mit Icon (📝/📤) als zweite Zeile ergänzen.
- **Eigene Freitext-Termine (rein lokal)** – ein "+"-Button ermöglicht
  das Anlegen persönlicher Ad-hoc-Termine (Gruppentreffen,
  Bibliothekstermin o. Ä.) direkt im Browser, gespeichert in
  `localStorage` analog zu den bestehenden privaten Notizen, ohne Pflege
  im Quellcode. Für die Geräteübertragung wird der bestehende
  Export/Import-Mechanismus ("📋 Notizen übertragen") erweitert statt
  eines zweiten, separaten Sync-Wegs – die eigenen Termine würden mit im
  selben JSON-Blob wie die Notizen wandern. Verortet in der
  Tagesansicht statt im Verwalten-Menü: ein zusätzlicher Listeneintrag
  "+ Eigenen Termin hinzufügen" ganz unten in der Terminliste des Tages
  öffnet ein kleines Inline-Formular (Titel, optional Uhrzeit) für genau
  diesen Tag – bewusst getrennt vom Verwalten-Menü, da es sich um eine
  datumsgebundene statt App-weite Aktion handelt.
- **Kalender ↔ Modulverzeichnis verknüpfen** – von einem Kalendertermin
  direkt zum zugehörigen Modul im Modulverzeichnis springen.
  **✅ Umgesetzt** (v2.2.0) – Modul-Badge im Termin-Detail verlinkt
  direkt zur passenden Detailkarte im Modulverzeichnis.
- **Archiv-Konzept für alte Semester** – Frage, wie alte, abgeschlossene
  Semester langfristig gehandhabt werden.
  **✅ Umgesetzt** (v3.0.0) – alles in einer Datei mit Semester-Umschalter
  statt eingefrorener Einzelseiten pro Semester.

## 🏗 Größer — größere technische Themen

- **Echter geräteübergreifender Notiz-Sync** – ein richtiges Backend
  statt des manuellen Export/Imports, damit Notizen automatisch zwischen
  Geräten synchron bleiben. Bewusst als Fernziel zurückgestellt.
  **📄 Technisches Konzept ausgearbeitet** – siehe
  [`Notiz-Sync-Konzept.md`](./Notiz-Sync-Konzept.md)
- **Prospektive Belastungs-Heatmap** – eine farbcodierte Semesterkurve
  aus SWS, CP-Workload und Prüfungsterminen, kombiniert aus Kalender- und
  Modulverzeichnis-Daten. Als konkretes Vorhaben eingestuft, nicht nur
  Vision – technisch anspruchsvollster Punkt, da Daten aus beiden
  Projekten zusammengeführt werden müssen (bisher keine gemeinsame
  Datenbrücke zwischen den beiden statischen Seiten).
- **UI-Neuordnung: Buttons & Funktionen konsolidieren** – Bedienelemente
  waren über Header, Toolbar, Footer, Tagesansicht und Notiz-Sync-Overlay
  verteilt, gewachsen Feature für Feature ohne übergreifendes Konzept.
  **✅ Umgesetzt** (v3.3.0) – neuer "⚙️ Verwalten"-Button links vor der
  Monatsnavigation im Header öffnet ein zentrales Menü (gleiches
  Overlay-Muster wie Notiz-Sync/Termin-Details) mit drei Gruppen:
  Abonnieren (Google Kalender, Abo-Link), Drucken, Notizen. Toolbar
  enthält jetzt nur noch die Suche, der Footer wurde entfernt. Die beiden
  gleichnamigen "Link kopieren"-Buttons sind zusätzlich eindeutig
  benannt ("Abo-Link kopieren" im Menü, "Kopieren" in der Tagesansicht).

## 💭 Abstrakt — Vision, aber trotzdem nützlich

- **Workload-Transparenz** – eine einfache Statistik ("X Kontaktstunden
  diese Woche"), um die eigene Auslastung über das Semester hinweg im
  Blick zu behalten. Würde durch die "Prospektive Belastungs-Heatmap"
  mit abgedeckt, bleibt aber als eigenständiger, kleinerer Punkt stehen.
- **Semester-Rückblick** – eine kleine, automatisch erzeugte
  Zusammenfassung am Semesterende ("X Termine, Y Prüfungen absolviert")
  als kleiner persönlicher Abschluss. Ließe sich komplett aus den
  ohnehin schon vorhandenen Daten in `EVENTS_BY_SEMESTER` berechnen
  (Anzahl Termine, Prüfungen, Abgaben je Semester) – kein neuer
  Datenbedarf. Denkbar z. B. als kleine Karte, die erscheint, sobald man
  im Dropdown auf ein bereits vergangenes Semester wechselt.
