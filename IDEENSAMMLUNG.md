# Vorlesungskalender – Ideensammlung

Noch nicht umgesetzte Funktionen, sortiert nach Umsetzbarkeit/Aufwand.
*(Stand: 9. August 2026)*

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
  Filter/Umschalter "nur Prüfungen/Abgaben" ergänzen.
  **✅ Umgesetzt** (v3.5.0) – Umschalter neben der Suche funktioniert auch
  eigenständig ganz ohne Texteingabe (zeigt dann alle Prüfungen/Abgaben
  semesterübergreifend), kombinierbar mit einem Suchbegriff. Aktuell
  ohne sichtbare Treffer, da noch keine echten Prüfungs-/Abgabetermine
  im Kalender eingetragen sind (Funktion selbst ist fertig und getestet).
  **Nachtrag (v3.5.1):** Button zeigt statt Text nur noch ein
  selbst gezeichnetes Trichter-Icon (kompakter, passt auf allen
  Größen direkt neben die Suche statt darunter umzubrechen), Bezeichnung
  weiterhin als Tooltip beim Hovern verfügbar.
- **Feed-Aktualität anzeigen** – ein kleiner Hinweis im Verwalten-Menü
  ("Feed zuletzt aktualisiert am …").
  **✅ Umgesetzt** (v3.4.0) – liest eine eigene
  `X-KALENDER-GENERATED-AT`-Property aus der ausgelieferten ICS-Datei
  aus (zuverlässiger als HTTP-Caching-Header, die GitHub Pages nicht
  konsistent setzt), wird bei jedem Öffnen des Menüs neu geprüft.
  Service Worker behandelt den Feed dafür jetzt wie HTML als
  network-first statt cache-first.
- **Kalenderwochen-Anzeige (KW)** – die ISO-Kalenderwoche zusätzlich
  anzeigen.
  **✅ Umgesetzt** (v3.7.0) – an zwei Stellen: die KW des jeweils
  angezeigten Tages im Datum der Tagesansicht ("Do, 1. Oktober 2026 ·
  KW 40"), und die tatsächlich aktuelle KW als dezente, nicht
  interaktive Anzeige neben dem Filter-Icon in der Toolbar. Standard-
  ISO-8601-Algorithmus (`getISOWeek()`), gegen mehrere Randfälle
  geprüft (Jahreswechsel-Wochen). Nebenbei: Zurück-/Kopieren-Buttons in
  der Tagesansicht zeigen auf Mobile jetzt nur noch die Icons (wie beim
  Verwalten-Button), sonst hätte für die KW kein Platz mehr gereicht.

## ⚙ Mittel — machbar, etwas Umbau nötig

- **Dark Mode** – umschaltbares dunkles Farbschema, wie im
  Modulverzeichnis bereits umgesetzt; eigene abgestimmte Dunkel-Varianten
  für die Modulfarben statt reiner Invertierung.
- **Push-Benachrichtigungen über ntfy.sh (Phase 2)** – kurz vor einem
  Termin eine Push-Benachrichtigung aufs Handy, über einen kostenlosen
  Dienst und einen GitHub-Actions-Workflow, ohne eigenen Server. Konzept
  bereits besprochen, nur noch nicht gebaut.
- **Next-Up-Leiste um Prüfungen/Abgaben erweitern** – Damit Prüfungs- und
  Abgabetermine zwischen den normalen Terminen nicht untergehen.
  **✅ Umgesetzt** (v3.6.0) – zweite Zeile mit der nächsten Prüfung/Abgabe,
  entfällt bei Dopplung mit der Hauptzeile. Wichtiger Fund unterwegs: die
  bestehende Next-Up-Logik filtert nur Termine mit Uhrzeit – Abgaben sind
  aber meist ganztägig. Die zweite Zeile nutzt daher eine eigene,
  ganztägig-sichere Datumslogik statt der ursprünglichen.
- **Eigene Freitext-Termine (rein lokal)** – ein "+"-Button ermöglicht
  das Anlegen persönlicher Ad-hoc-Termine direkt im Browser.
  **✅ Umgesetzt** (v3.6.0) – "+ Eigenen Termin hinzufügen" unten in der
  Terminliste der Tagesansicht öffnet ein Inline-Formular (Titel,
  optionale Uhrzeit), gespeichert in `localStorage`
  (`personalEvent:<uuid>`). Landen im selben Datentopf wie echte
  Termine und werden dadurch überall wie normale Veranstaltungen
  behandelt – Next-Up (auch die Hauptzeile, bei Uhrzeit), Suche,
  Monatsraster, Legende. Eigene Farbe (Bubblegum Pink, MODS-Eintrag
  "EIGEN") zur klaren Abgrenzung. Übertragung über den bestehenden
  Export/Import-Mechanismus ("📋 Notizen übertragen", gleicher
  JSON-Blob wie Notizen). Bewusst **nicht** im Ausdruck und **nicht**
  im Google-Kalender-Feed (der wird serverseitig aus den fest im Repo
  hinterlegten Daten gebaut, sieht `localStorage` nie). Termin-Detail
  zeigt einen Löschen-Button statt des Modul-Links. Nebenbei: Termin-
  Titel wurden bisher ungeschützt in die Seite eingesetzt (unproblematisch
  bei festen Titeln im Quellcode) – mit Nutzereingaben jetzt an allen
  Stellen sauber escaped.
  **Nachtrag (v3.7.1):** Dauer bei Terminen mit Uhrzeit wählbar
  (15 Min. bis 4 Std., Voreinstellung 1 Std.) statt fest auf 1 Std.
  – Auswahl blendet sich erst ein, sobald eine Uhrzeit gesetzt ist.
- **Laufende Semester-Fortschrittsanzeige** – zeigt während des
  Semesters die eigene Position im Verlauf, z. B. "Woche 6 von 16" oder
  ein kleiner Fortschrittsbalken. Anders als der bereits geplante
  Semester-Rückblick (der erscheint erst am Ende) wäre das eine laufende
  Orientierung während des Semesters – ließe sich aus den
  `SEMESTERS`-Metadaten (Start-/Enddatum) berechnen, kein neuer
  Datenbedarf.
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
  **Nachtrag (v3.5.0):** Button zeigt auf Mobile nur noch das Icon "⋮"
  statt "⚙️ Verwalten" (zu wuchtig, nahm eine eigene Zeile ein) – jetzt
  wieder in einer Zeile mit ←/Monat/→/Heute, Desktop bleibt bei
  Icon+Text.

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
