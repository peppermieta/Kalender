# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.
Format angelehnt an [Keep a Changelog](https://keepachangelog.com/de/1.0.0/).

## [Unreleased]

_Noch keine offenen Änderungen._

## [3.25.1] - 2026-08-28

### Changed
- **Flammen-Icon im Mini-Band entfernt** – kam nicht gut an. War als
  eigenes, ggf. eingefärbtes Symbol statt Emoji gedacht, Ausarbeitung
  auf später verschoben; bis dahin ganz ohne Icon statt einer
  Zwischenlösung.

## [3.25.0] - 2026-08-28

### Changed
- **Perzentil-basierte Farbnormalisierung statt reinem Min/Max**: neue
  `computeBwNormalizedByWeek()`. Wochen mit 0 Std. (Ferien) werden immer
  auf t=0 gesetzt; für die übrigen Wochen wird das 10./90. Perzentil
  dieser aktiven Teilmenge als Bezugsrahmen genutzt statt Min/Max über
  alle Wochen (inkl. Ferien). Grund: mit reinem Min/Max zogen leere
  Ferienwochen das Minimum runter, wodurch echte Vorlesungswochen fast
  alle in der oberen Skalenhälfte landeten und ähnlich rot wirkten. An
  den echten Semesterdaten geprüft: Wochen mit t>0,5 sanken von 13 auf
  10 von 27, die vollen Wochen spannen sich jetzt über ein deutlich
  breiteres t-Intervall (0,39–1,0 statt 0,64–1,0).
- Drei duplizierte Min/Max-Berechnungen (Belastungsübersicht, Mini-Band,
  Wochenübersicht-Chip) auf die eine neue gemeinsame Funktion
  konsolidiert.

## [3.24.1] - 2026-08-28

### Changed
- **Farbskala auf 5 statt 3 Stützpunkte erweitert** (`bwColor()`): reale
  Datenanalyse zeigte, dass ~die Hälfte der Wochen oberhalb der
  Skalenmitte landet (leere Ferienwochen ziehen das Minimum nach unten),
  wodurch mit nur einem Amber-Rot-Segment fast alle "vollen" Wochen
  ähnlich rot aussahen. Neue Zwischenfarben bei t=0,25/0,75 (reine
  RGB-Mittelwerte der bestehenden Endpunkte) geben der oberen Hälfte
  zwei Segmente statt einem. Grün/Amber/Rot-Endpunkte unverändert.
  Betrifft Belastungsübersicht, Mini-Band, Wochenübersicht-Chip und
  Tagesansicht-Chip gemeinsam (alle nutzen dieselbe Funktion).

## [3.24.0] - 2026-08-28

### Changed
- **Mini-Band auf max. 3 Wochen begrenzt** (aktuelle + 2 kommende) statt
  des ganzen Semesters - bei der Bandgröße war ein voller Verlauf nicht
  lesbar. Farbnormalisierung bleibt übers ganze Semester, nur die Anzeige
  ist eingekürzt. Liegt "heute" vor Semesterbeginn, zeigt das Band die
  ersten drei Semesterwochen.
- **Eigener Blauton fürs Mini-Band** (`--heatband-bg`/`--heatband-tx`)
  statt des app-weiten Lila-Akzents, eigenes Dark-Mode-Pendant. Betrifft
  nur Rahmen/Beschriftung, die Balken selbst bleiben in der normalen
  B_w-Farbskala.

### Added
- **🔥-Icon** im Mini-Band vor dem "Nächste Wochen"-Label.
- **Wochen-Chip in der Tagesansicht**: kleiner farbiger Punkt nach der
  KW-Angabe, zeigt die B_w-Farbe der angezeigten Woche. Asynchron
  befüllt mit Schutz gegen schnelles Weiterblättern.

## [3.23.0] - 2026-08-28

### Changed
- **Belastungsübersicht auf Balkenband umgestellt**: Rasterzellen durch
  ein Balkenband ersetzt, Höhe und Farbe zeigen B_w gemeinsam (doppelt
  kodiert). Horizontal scrollbar auf schmalen Bildschirmen statt
  umzubrechen - bleibt dadurch eine durchgehende Zeitachse.
- **Prüfungs-/Abgabemarker (📝/📤)** oberhalb betroffener Balken statt
  Farbe - vermeidet Kollision mit dem Rot-Ende der B_w-Farbskala.

### Added
- **Mini-Band im Kalender** (`#heatBand`, zwischen "Nächste
  Veranstaltung" und Suchleiste): komprimiertes ganzes Semester, immer
  sichtbar, Antippen öffnet die volle Belastungsübersicht. Damit nicht
  mehr nur im Verwalten-Menü versteckt.
- **Farb-Chip in der Wochenübersicht**: kleines farbiges Quadrat vor
  jeder Wochenzeile, gleiche Farblogik wie Mini-Band und voller Screen.
- Neue geteilte Funktion `computeBwColorsByWeek()` sorgt dafür, dass
  alle drei Stellen garantiert dieselbe Skala zeigen.

## [3.22.1] - 2026-08-27

### Changed
- **Belastungsübersicht: zeitlicher Verlauf besser erkennbar.** Wochen
  werden jetzt nach Monat des jeweiligen Wochenmontags gruppiert
  (eigene Überschrift je Monat) statt als undifferenzierte Zahlenreihe.
  Zellen zeigen "W40" statt nur "40" - macht auch ohne Tooltip klar,
  dass es sich um Wochen handelt.

## [3.22.0] - 2026-08-27

### Added
- **Belastungsübersicht (Heatmap, Heatmap-Etappe 7)**: eigener Vollbild-
  Screen, Zugang über "🌡️ Belastungsübersicht anzeigen" im Verwalten-
  Menü. Neue `computeBwByWeek()` kombiniert gewichtete K_w/S_w/P_w zu
  einer Zahl pro Woche (`computeContactHoursByWeek()` und
  `computeSelfStudyHoursByWeek()` haben dafür einen neuen optionalen
  `weighted`-Parameter bekommen, Default `false` - die Wochenübersicht
  bleibt dadurch unverändert). Neue `computeWeightedExamHoursByWeek()`
  mit Basiswerten 4h/Prüfung, 2h/Abgabe. Aufwands-Multiplikator-Skala
  `{1: 0.7, 2: 0.85, 3: 1.0, 4: 1.3, 5: 1.6}` wirkt pro LV/Termin, bevor
  pro Woche summiert wird. Stufenloser Grün-Amber-Rot-Farbverlauf,
  relativ zum Semester normalisiert. Klick auf eine Wochenzelle springt
  zur Tagesansicht des jeweiligen Montags.

### Fixed
- **Race Condition beim Zellklick behoben** (im selben Zug gefunden und
  korrigiert, nie live gewesen): `closeHeatmapView()` entfernte die
  `open`-Klasse synchron, der zugehörige `history.back()`-Popstate feuert
  aber asynchron danach - der geplante Sprung zur Tagesansicht löste
  dadurch nie aus. Behoben durch einen synchronen, direkten Ablauf ohne
  Verlaufs-Umweg (bewusste Vereinfachung als Folge: ein Zurück-Tap aus
  der so geöffneten Tagesansicht landet beim normalen Kalender, nicht
  extra bei der Heatmap).

## [3.21.0] - 2026-08-27

### Added
- **Selbststudium S_w mit Blockkurs-Schutz (Heatmap-Etappe 5+6)**: neue
  Datenbrücke `fetchWorkloadData()` lädt `workload.json` vom
  Modulverzeichnis (Fallback-Kette, In-Memory-Cache, Fehler werden
  geschluckt). `computeSelfStudyHoursByWeek()` verteilt Selbststudium-
  Stunden je Modul anteilig nach echter Kontaktzeit auf dessen
  Bausteine/LVs (`contactHoursByLvnr()`), dann pro LV gleichmäßig auf die
  Kontaktwochen. Blockkurse (`isBlockLvnr()`, dieselbe Regel wie bei der
  Aufwandsbewertung) werden vorher per `expandToMinWindow()` auf ein
  Mindestfenster von 4 Wochen symmetrisch erweitert (Ferienwochen zählen
  mit, Semestergrenzen werden nicht überschritten), damit die
  Selbststudium-Stunden nicht fälschlich in wenige Kontakttage gequetscht
  werden. In der Wochenübersicht als eigene, kursive Zeile pro Woche
  sichtbar, asynchron nachgeladen (Basisanzeige mit K_w/P_w wartet nicht
  auf das Netzwerk).

### Changed
- `computeContactHoursByWeek()` und `isBlockLvnr()` intern refactored
  (`allWeeksForSemester()`/`weekSetForLvnr()` als wiederverwendbare
  Hilfsfunktionen extrahiert), Verhalten unverändert - gegen die
  bestehende Etappe-1-Verifikation erneut geprüft, 0 Abweichungen.

## [3.20.0] - 2026-08-27

### Changed
- **Hoher-Aufwand-Anzeige auf Badge-Muster umgestellt**: statt eines
  inline im Text stehenden Punkts jetzt ein rundes Badge, angelehnt an
  das Modulverzeichnis (`.mv-card-badge`). Tagesansicht (`.day-event`,
  genug Rand): echtes über die Kartenkante hinausragendes Badge mit
  Border/Shadow, zeigt jetzt die konkrete Stufe (4 oder 5) als Zahl.
  Monatsraster-Chip (dicht gepackt, nur 2px Abstand): kompakte,
  eingerückte Variante innerhalb des bestehenden Innenabstands statt
  Overflow, um Kollision mit dem nächsten Chip zu vermeiden.
- Neue Funktion `getEffortLevel(ev)` liefert den rohen gespeicherten
  Wert; `hasHighEffort(ev)` baut jetzt darauf auf statt den Wert separat
  zu lesen.

## [3.19.0] - 2026-08-27

### Added
- **Hoher-Aufwand-Punkt in Monatsraster/Tagesansicht**: Termine, deren
  Aufwandsbewertung auf Stufe 4 oder 5 steht, bekommen jetzt einen
  kleinen Punkt in der Akzentfarbe direkt am Termin – auch außerhalb des
  Detail-Modals sichtbar, unabhängig von der noch offenen Heatmap-
  Verrechnung. Monatsraster-Chip: Punkt steht vor dem Titel (sonst von
  der Ellipsis-Kürzung bei langen Namen abgeschnitten, analog zum
  bestehenden ⚠️-Konflikt-Icon). Neue Funktion `hasHighEffort(ev)` prüft
  direkt beide möglichen `journal:effort:`-Schlüssel, ohne die
  Blockkurs-Klassifikation erneut zu berechnen.

### Documented
- Beim Testen bestätigt: die lvnr-basierte Gruppierung der
  Aufwandsbewertung funktioniert wie gedacht auch bei Modulen mit
  mehreren Bausteinen (M06 hat real zwei unterschiedliche `lvnr` unter
  demselben Modulcode) - eine Bewertung gilt korrekt nur für die
  tatsächlich gemeinsame Kursreihe, nicht für das ganze Modul.

## [3.18.0] - 2026-08-27

### Added
- **Prüfungs-/Abgabebonus (Heatmap-Vorstufe, Etappe 2)**: neue,
  eigenständige Funktion `countPruefungAbgabeByWeek(semesterId)` zählt
  Prüfungen/Abgaben pro ISO-Woche, unabhängig von der Kontaktzeit-
  Berechnung aus Etappe 1. In der Wochenübersicht als eigene Zeile unter
  der jeweiligen Woche sichtbar (📝 Prüfung rot, 📤 Abgabe orange,
  gleiche Farbsemantik wie die bestehenden Termin-Akzentränder), Tooltip
  nennt Titel und Datum. Bewusst nur ein Zähler ohne Gewichtung.

### Fixed / Documented
- **Widerspruch im Heatmap-Konzept entdeckt** (Abschnitt 3.1 vs. 5.1:
  zählen Prüfungen mit fester Uhrzeit als Kontaktzeit oder nicht?) beim
  Testen mit einem realistischen Klausur-Beispiel gefunden. Aktuelles
  Verhalten (Abschnitt-5.1-Lesart: nur ganztägige ausgeschlossen) bewusst
  beibehalten und in IDEENSAMMLUNG.md dokumentiert - muss vor der
  Verrechnung in eine gemeinsame B_w-Zahl nochmal bestätigt werden.

## [3.17.1] - 2026-08-27

### Changed
- **Aufwandsbewertung: Datennamensraum korrigiert.** `effortByLvnr:`/
  `effortByEvent:` (v3.17.0) auf `journal:effort:lvnr:`/
  `journal:effort:event:` umgestellt – wie in IDEENSAMMLUNG.md
  ("Langfristige Ausrichtung") selbst festgelegt, bei der Umsetzung aber
  übersehen. Einmalige automatische Migration bereits gesetzter Werte
  beim ersten Laden (`migrateEffortKeysToJournalNamespace()`). Die drei
  Gist-Sync-Filterstellen sind jetzt auf einen einzigen `journal:`-Check
  vereinfacht statt zwei Einzelpräfixe zu listen – deckt künftige
  Journal-Daten automatisch mit ab, ohne diese Stellen erneut anfassen
  zu müssen.

## [3.17.0] - 2026-08-27

### Added
- **Aufwandsbewertung (Eingabemechanismus)**: 5-stufige, subjektive
  Aufwands-/Belastungsbewertung im Termin-Detail-Modal, erste Etappe der
  geplanten Erweiterung der Belastungs-Heatmap um Selbstauskunft statt
  reiner Modellierung. `isBlockLvnr()` klassifiziert LV-Nummern nach
  derselben Regel wie das Heatmap-Konzept (max. 2 ISO-Wochen, max.
  14 Tage, oder unter 4 Kontaktwochen). `effortScopeFor(ev)` wählt daraus
  automatisch den Geltungsbereich: reguläre Kursreihen bekommen eine
  Bewertung fürs ganze Semester (`effortByLvnr:<lvnr>`), Blockkurse,
  Prüfungen/Abgaben (meist ohne `lvnr`) und eigene Termine werden einzeln
  bewertet (`effortByEvent:<key>`, Schlüsselschema wie bei Notizen).
  Erneuter Klick auf die aktive Stufe setzt zurück. In den bestehenden
  Gist-Sync integriert (alle drei Präfixfilter erweitert). Verrechnung in
  die Wochenübersicht/Heatmap bewusst noch nicht umgesetzt – aktuell wird
  nur erfasst, s. IDEENSAMMLUNG.md.

## [3.16.0] - 2026-08-27

### Added
- **Wochenübersicht (Beta)**: erste, bewusst einfache Vorstufe der geplanten
  Belastungs-Heatmap. Neue Funktionen `getISOYear()` und
  `computeContactHoursByWeek(semesterId)` berechnen reine Kontaktzeit pro
  ISO-Woche (nur Termine mit fester Uhrzeit, ganztägige Prüfungen/Abgaben
  und eigene Termine zählen nicht mit). Anzeige als schlichte Textliste
  unter „⚙️ Verwalten → Analyse (Beta)", inkl. Hervorhebung der aktuellen
  Woche. Bewusst ohne Prüfungsbonus, Selbststudium-Modellierung oder
  Farbskala – diese folgen erst in späteren Etappen, s. IDEENSAMMLUNG.md.
  Gegen eine unabhängige Python-Nachrechnung über alle 119 echten Termine
  des WS 2026/27 verifiziert (0 Abweichungen).

## [3.15.0] - 2026-08-27

### Added
- **Automatische Konflikterkennung**: neue `findConflicts(ev)`-Hilfsfunktion
  erkennt zeitlich überschneidende Termine am selben Tag rein clientseitig
  aus `date`/`start`/`end` (nur Termine mit fester Uhrzeit, ganztägige
  Abgaben bewusst ausgenommen). ⚠️-Icon an drei Stellen: Chip im
  Monatsraster, Eintrag in der Tagesansicht, Hinweiszeile im
  Termin-Detail-Modal mit Titel und Uhrzeit des kollidierenden Termins.
  Betrifft in der Praxis vor allem eigene Freitext-Termine, die
  versehentlich mit einem echten Termin kollidieren.
- **Lehrpersonen-Suche**: die bestehende Live-Suche durchsucht jetzt
  zusätzlich das `lehrperson`-Feld (war bereits an praktisch jedem Termin
  gepflegt, wurde bisher aber nicht mitdurchsucht).

### Fixed
- **Konflikt-Icon bei langen Terminnamen unsichtbar**: stand ursprünglich
  hinter dem Titel und wurde bei langen Namen von der Ellipsis-Kürzung
  des Monatsraster-Chips mit abgeschnitten. Jetzt vor dem Titel platziert,
  analog zum bestehenden Prüfungs-/Abgabe-Icon.

## [3.14.0] - 2026-08-25

### Added
- **Notiz zum ganzen Tag** (statt nur pro Termin): neuer, leichtgewichtiger
  Freitext-Bereich unter der Terminliste in der Tagesansicht (`dayNote:
  YYYY-MM-DD` in `localStorage`). Aufklappbar über "+ Notiz zum Tag
  hinzufügen", solange leer – sobald Inhalt vorhanden ist, direkt sichtbar
  ohne erneutes Aufklappen. Bewusst ohne eigene Uhrzeit und ohne Chip im
  Monatsraster (im Gegensatz zu eigenen Freitext-Terminen), stattdessen
  ein kleiner, dezenter Punkt neben der Tageszahl im Monatsraster als
  einziger Hinweis. Synct über denselben GitHub-Gist-Mechanismus wie
  Termin-Notizen und eigene Termine (`getAllNotes()`/`pullNotesFromGist()`
  um den `dayNote:`-Präfix erweitert, inkl. Lösch-Erkennung).

## [3.13.3] - 2026-08-25

### Fixed
- **Gelöschte Notizen/eigene Termine blieben auf Lesegeräten für immer
  bestehen**: `pullNotesFromGist()` hat bisher nur Einträge aus dem Gist
  übernommen (hinzugefügt/aktualisiert), aber nie lokale Einträge
  entfernt, die im Gist nicht mehr vorkommen. Eine auf dem Schreibgerät
  gelöschte Notiz oder ein gelöschter eigener Termin blieb dadurch auf
  jedem Gerät bestehen, das ihn vorher schon einmal gepullt hatte.
  Pull sammelt jetzt vor dem Schreiben zusätzlich alle lokalen
  `note:`-/`personalEvent:`-Schlüssel, die im aktuellen Gist-Stand
  fehlen, und entfernt sie. Mit gemocktem Gist-Response verifiziert
  (bestehender Termin bleibt, gelöschter verschwindet, Notiz
  unangetastet).

## [3.13.2] - 2026-08-25

### Changed
- **Badge-Text bei eigenen Terminen von "EIGEN" auf "Privat" umgestellt**
  (Monatsraster-Chip auf Mobile und Tagesansicht) – wirkte als reiner
  Großbuchstaben-Code neben den echten Modulcodes unpassend.
- **README aktualisiert**: Versionsnummer korrigiert (stand noch auf
  3.9.0), fehlende Funktionen ergänzt (Dozierende im Termin-Detail,
  Notiz-Indikator, eigene Freitext-Termine – bisher gar nicht erwähnt),
  Raumnummern-Abschnitt um den Datum→Raum-Zuordnungsfall für Kurse mit
  wechselndem Raum sowie die Kurzform-Anzeige ergänzt.

## [3.13.1] - 2026-08-25

### Fixed
- **Notiz-Bearbeitungen/Termin-Löschungen gingen bei schnellem Reload auf
  dem Schreibgerät verloren**: Zwei zusammenhängende Ursachen. Erstens
  ging der 2,5s-Push-Debounce bei einem Reload vor Ablauf komplett
  verloren (JS-Kontext wird zerstört, bevor der Timer feuert). Zweitens
  war die Annahme "Pull beim Laden ist auf allen Geräten unkritisch"
  falsch, wenn der Reload selbst unmittelbar nach einer Änderung
  passiert – der Lade-Pull überschrieb die frische, noch nicht
  hochgeladene Änderung mit dem älteren Gist-Stand.
  Fix: Das Schreibgerät pullt jetzt grundsätzlich nie mehr (weder bei
  Fokuswechsel noch beim Laden). Ein persistentes `localStorage`-Flag
  merkt sich einen ausstehenden Push und holt ihn beim nächsten Laden
  automatisch nach. Eine zuerst versuchte pagehide+keepalive-Lösung
  (sofortiger Push beim Verlassen der Seite) erwies sich in Tests als
  zu unzuverlässig (CORS-Preflight schafft es im knappen Zeitfenster
  beim Entladen nicht immer durch) und wurde durch den robusteren
  Nachhol-Mechanismus ersetzt. End-to-End gegen einen echten
  HTTP-Server verifiziert (Notiz-Edit- und Löschszenario).

## [3.13.0] - 2026-08-25

### Changed
- **Eigene Termine deutlicher von echten Veranstaltungen (v. a. M10)
  abgesetzt**: Farbe von Pink (nah an M10) auf Blau umgestellt
  (`#ACC8E5`/`#112A46`, per Kontrastprüfung ausgewählt, Kontrast 8.42
  "Very good"), mit abgeleitetem Rand-/Akzentton und eigens
  abgestimmter Dark-Mode-Variante. Monatsraster-Chips jetzt gestrichelt
  statt durchgezogen umrandet. Tagesansicht bekommt einen 3px farbigen
  Akzentstrich links (gleiches Muster wie bei Prüfung/Abgabe), Rest der
  Karte bleibt normal weiß. Pinnadel-Symbol komplett entfernt, an allen
  Fundstellen abgesichert – Prüfung/Abgabe behalten ihre Icons
  unverändert. Mehrere Design-Optionen mit dem Nutzer visuell
  durchgesprochen und iterativ verfeinert, bevor final entschieden
  wurde.

## [3.12.0] - 2026-08-25

### Fixed
- **Handy-Zurück-Button schloss die App statt nur das Termin-Detail**:
  `openModal()`/`closeModal()` hatten im Gegensatz zur Tagesansicht
  bisher keinerlei Verlaufsanbindung. Modal bekommt jetzt einen eigenen
  Verlaufseintrag; Zurück (Geste, Taste oder X-Button) schließt jetzt
  schrittweise genau eine Ebene (Modal, dann ggf. Tagesansicht), statt
  bei fehlendem vorherigem Verlauf die App zu verlassen. Mit echter
  Browser-Navigation getestet (`page.go_back()`), inkl. verschachteltem
  Fall Tagesansicht → Modal → zweimal zurück.

### Changed
- **Raumanzeige in Monatsraster und Tagesansicht verkürzt**: neue
  `shortRoom()`-Funktion zeigt dort nur noch das Kürzel ("Hörsaal C1"
  → "C1", "Werkräume 1.05 und 1.06" → "1.05/1.06"), die volle
  Bezeichnung bleibt im Termin-Detail erhalten. Pin-Symbol (📍) vor der
  Raumangabe entfernt (kam an drei Stellen vor: Monatsraster-Chip,
  Tagesansicht, sowie nochmal im Kalenderraster selbst).

## [3.11.0] - 2026-08-25

### Added
- **Raumdaten anhand des offiziellen HISinOne-ICS-Exports übernommen**:
  `ROOMS`-Tabelle für acht Kurse mit durchgängig gleichem Raum befüllt
  (M02, M06, M08, M09 – Details in `ROOMS`). Für vier Kurse mit
  wechselndem Raum stattdessen `raum:`-Overrides pro Termin ergänzt:
  Grundsicherungsrecht (C4 → C9 → C1), Schulsozialarbeit (C3 → A7/A6),
  Entwicklungstheorien (Basis C2, Ausnahme 5.10. C1), Kunst-Workshop
  (erste Sitzung E-Learning, danach Werkräume 1.05/1.06). Mit
  Playwright gegen 15 Stichproben verifiziert.
- **Dozierende werden jetzt im Termin-Detail angezeigt** (Zeile
  "Dozierende", ausgeblendet bei `"–"`-Platzhalter). Datenabgleich
  gegen eine offizielle Quelle steht noch aus (die ICS-Datei enthält
  keine Dozierenden-Angaben).

### Fixed
- **Falsche LV-Nummer korrigiert**: "Übungen zu Gesprächsführung und
  Kommunikationskompetenzen" stand unter `...102102102102000`
  (vermutlich Tippfehler bei der Ersterfassung), tatsächlich laut
  HISinOne `...202202202202000` – gleicher Titel, identische vier
  Termine im Abgleich bestätigt.

## [3.10.1] - 2026-08-25

### Fixed
- **Dark-Mode-"Lag" trat weiterhin auf, jetzt am richtigen Ansatzpunkt
  behoben**: Der Fix aus v3.10.0 unterdrückte Transitions nur beim
  Seitenladen, das eigentliche Problem trat aber beim Umschalten des
  Dark-Mode-Schalters selbst auf. Mit präziser Zeitmessung
  nachgewiesen: `--bg`/`--border` wechseln beim Umschalten sofort,
  Elemente mit `transition: background .15s` (z. B. `.nav-btn` fürs
  Hover-Gefühl) blendeten dieselbe Änderung aber sichtbar über
  150–200ms über, während der Rest der Seite (ohne Transition) sofort
  umsprang. `setDarkMode()` unterdrückt Transitions jetzt zusätzlich
  im Umschalt-Moment selbst (`no-transition`-Klasse, zwei rAF-Ticks
  danach entfernt) – Hover-Verhalten bleibt danach unverändert
  erhalten, mit Playwright verifiziert.

## [3.10.0] - 2026-08-25

### Added
- **Notiz-Indikator in der Tagesansicht**: Termine mit einer hinterlegten
  Notiz zeigen jetzt ein kleines 🗒️-Symbol neben dem Titel (ohne
  Vorschautext, damit die Zeilenhöhe konstant bleibt).

### Changed
- **Alte manuelle "Notizen übertragen"-Funktion entfernt** (Export/Import
  per Copy-Paste-Text): seit dem automatischen Notiz-Sync über GitHub
  Gist überflüssig geworden. `getAllNotes()` bleibt bestehen, wird
  weiterhin vom Gist-Sync genutzt.
- **Notiz-Feld-Label vereinfacht**: "🔒 Private Notiz – nur auf diesem
  Gerät gespeichert" heißt jetzt schlicht "Notiz" – die Aussage stimmte
  seit dem optionalen Gist-Sync nicht mehr uneingeschränkt.

### Fixed
- **Dark-Mode-"Lag" bei Buttons** (Vor/Zurück, ⋮-Menü, Filter-Icon):
  Diese Elemente nutzen `transition: background .15s` fürs Hover-Gefühl.
  Kam die Google-Fonts-Stylesheet beim Laden etwas später (v. a. im
  Mobilfunknetz), zog dieselbe Transition eine dadurch verzögerte
  Stilaktualisierung sichtbar in die Länge – wirkte wie ein Lag,
  besonders im Dark Mode auffällig. Neue `no-transition`-Klasse
  unterdrückt beim allerersten Rendern alle Transitions, wird nach
  `load` (zwei rAF-Ticks später) wieder entfernt.

## [3.9.2] - 2026-08-25

### Fixed
- **Service Worker fing Gist-API-Anfragen fälschlich cache-first ab**:
  `pullNotesFromGist()` fällt bei GET-Requests an `api.github.com`
  weder unter `isHTML` noch unter `isFeed`, landete also im
  Cache-first-Zweig, der eigentlich nur für selten wechselnde statische
  Assets (Icons, Manifest) gedacht ist. Ergebnis: Der allererste
  erfolgreiche Pull wurde eingefroren, jede spätere Änderung im Gist kam
  auf Lesegeräten nie an, ohne sichtbare Fehlermeldung. Erklärt, warum
  Notizen ankamen (zufällig schon beim ersten Pull vorhanden), eigene
  Termine aber nie (erst danach angelegt). Neue `isGistApi`-Erkennung
  ergänzt, Gist-Requests laufen jetzt wie der ICS-Feed network-first.
  Mit einem isolierten Unit-Test der Fetch-Handler-Logik verifiziert
  (fetch()/caches.match()-Aufrufe vorher/nachher gegenübergestellt).

## [3.9.1] - 2026-08-25

### Fixed
- **Push-Trigger beim Anlegen eigener Termine fehlte**: `savePersonalEvent()`
  löste `scheduleGistPush()` bisher nicht aus, im Gegensatz zum
  Notiz-Tippen und zum Löschen eigener Termine. Neu angelegte eigene
  Freitext-Termine landeten dadurch nie im Sync-Gist. Fehlenden Aufruf
  ergänzt.

## [3.9.0] - 2026-08-25

### Added
- **Notiz-Sync über GitHub Gist (Einbahnstraßen-Modell)**: Notizen und
  eigene Freitext-Termine werden automatisch (2,5s nach Eingabe) von einem
  als Schreibgerät markierten Gerät (Token in `localStorage` hinterlegt) in
  einen Secret Gist hochgeladen (`getAllNotes()`, unverändert, liefert
  bereits beide Präfixe `note:` und `personalEvent:`). Alle anderen Geräte
  lesen den Gist beim Laden automatisch, ganz ohne eigenen Token (Secret
  Gists sind anonym lesbar – gegen den echten Gist verifiziert). Lesegeräte
  pullen zusätzlich bei jedem Fokuswechsel neu; das Schreibgerät bewusst
  nicht (verhindert, dass eine frische, noch nicht hochgeladene Notiz durch
  einen Pull kurz nach dem Tippen überschrieben wird). Kein
  Konfliktmanagement nötig, da bewusst nur ein Gerät jemals schreibt. Der
  bestehende manuelle Export/Import (`notesSyncOverlay`) bleibt unverändert
  als Fallback erhalten, z. B. für die Erstübertragung auf ein neues Gerät.
- Neuer Menü-Abschnitt „Notiz-Sync (GitHub Gist)" im Verwalten-Menü mit
  Token-Eingabefeld und Statusanzeige („Token hinterlegt – sendet
  automatisch" / „liest nur").

## [3.8.1] - 2026-08-09

### Fixed
- **Kritische Layout-Regression aus v3.8.0 behoben**: eine verwaiste,
  überzählige schließende Klammer `}` direkt nach dem neuen
  `:root[data-theme="dark"]`-Block hat den globalen CSS-Reset
  (`*, *::before, *::after { box-sizing: border-box; margin: 0;
  padding: 0; }`) in manchen Browsern nicht mehr zuverlässig ankommen
  lassen – dadurch griffen Browser-Standardstile für Buttons wieder
  (u.a. die runden Monats-Punkte wurden dadurch länglich statt rund,
  Header/Toolbar wirkten "abgeschnitten"/verzerrt). In Chromium
  (lokaler Test) unauffällig, da robuste CSS-Fehlerbehandlung – auf
  dem tatsächlichen Gerät sichtbar geworden. Klammer entfernt,
  Klammer-Balance im gesamten Stylesheet verifiziert (vorher war das
  nur für JavaScript geprüft worden, nicht für CSS).
- **Dark Mode aktivierte sich fälschlich automatisch** bei System-
  Präferenz "Dunkel", obwohl er laut Ideensammlung bewusst nur eine
  zusätzliche, manuell zuschaltbare Funktion sein soll, kein Standard.
  Bootstrap-Skript im `<head>` prüft jetzt ausschließlich die explizit
  gespeicherte Präferenz (`localStorage`), ignoriert
  `prefers-color-scheme` vollständig.

## [3.8.0] - 2026-08-09

### Added
- **Dark Mode**: Umschalter im Verwalten-Menü (neue "Einstellungen"-
  Gruppe). Gespeicherte Präferenz wird per Bootstrap-Skript im `<head>`
  synchron vor dem ersten Rendern angewendet (kein Aufblitzen des
  hellen Modus). Eigens abgestimmte Dunkel-Varianten für alle
  Modulfarben (`MODS_LIGHT`/`MODS_DARK`, dynamische Umschaltung der
  `MODS`-Bindung, da Modulfarben als Inline-Style mit höherer
  Spezifität als jede CSS-Regel gesetzt werden) statt reiner
  Invertierung. Gleiche Dunkel-Basispalette wie im Modulverzeichnis.
  Neue CSS-Variablen `--accent`, `--accent-soft-bg`, `--danger-*`,
  `--warn-*`, `--success-*` ersetzen bisher hartkodierte Hex-Werte im
  CSS. Passwort-Screen ebenfalls auf die gemeinsamen Variablen
  umgestellt. Ausdrucke bleiben unabhängig vom aktuellen Modus immer
  hell (`beforeprint`/`afterprint`-Sicherheitsmechanismus).

### Changed
- **Verwalten-Button vereinheitlicht**: zeigt jetzt auf allen
  Bildschirmgrößen nur noch das Icon "⋮" statt "⚙️ Verwalten" auf
  Desktop bzw. "⋮" auf Mobile (zwei unterschiedliche Varianten bisher).

### Fixed
- "Anderer Monat"-Zellen im Kalenderraster hatten eine fest
  hellgraue Hintergrundfarbe – im Dark Mode unschön hervorstechend,
  jetzt auf `var(--border)` umgestellt.

## [3.7.1] - 2026-08-09

### Added
- **Dauer-Auswahl für eigene Termine**: bei gesetzter Uhrzeit erscheint
  neben dem Zeitfeld ein Dropdown (15 Min. bis 4 Std., Voreinstellung
  1 Std. wie bisher). Ohne Uhrzeit bleibt der Termin ganztägig,
  Dropdown entsprechend versteckt.

### Changed
- `addOneHour()` zu allgemeiner `addMinutes(hhmm, minuten)` gemacht,
  damit beliebige Dauern statt nur der festen Stunde berechnet werden
  können (Mitternachts-Überlauf weiterhin korrekt behandelt).

## [3.7.0] - 2026-08-09

### Added
- **Kalenderwochen-Anzeige (KW)** an zwei Stellen: in der Tagesansicht
  die KW des angezeigten Tages ("Do, 1. Oktober 2026 · KW 40"), und in
  der Toolbar die tatsächlich aktuelle KW als dezente, nicht
  interaktive Anzeige neben dem Filter-Icon (JetBrains Mono, gedämpfte
  Farbe – rein informativ, kein Button). Standard-ISO-8601-Algorithmus
  (`getISOWeek()`), gegen Jahreswechsel-Randfälle geprüft (29.12.2025 →
  KW 1/2026, 1.1.2027 → noch KW 53/2026).

### Changed
- Zurück-/Kopieren-Buttons in der Tagesansicht zeigen auf Mobile nur
  noch die Icons statt Icon+Text (analog zum Verwalten-Button aus
  v3.5.0) – sonst hätte für die neu ergänzte KW im Datum kein Platz
  mehr gereicht (Datum wäre abgeschnitten worden).

## [3.6.0] - 2026-08-09

### Added
- **Eigene Freitext-Termine (rein lokal)**: "+ Eigenen Termin
  hinzufügen" unten in der Tagesansicht öffnet ein Inline-Formular
  (Titel, optionale Uhrzeit). Gespeichert in `localStorage`
  (`personalEvent:<uuid>`), landen im selben Datentopf wie echte
  Termine (`EVENTS_BY_SEMESTER`, Semester-Zuordnung über
  Datumsabgleich mit `SEMESTERS`-Start/Ende) und werden dadurch
  automatisch überall wie normale Veranstaltungen behandelt: Next-Up
  (auch die Hauptzeile, mit Uhrzeit), Suche, Monatsraster, Legende.
  Neuer MODS-Eintrag "EIGEN" (Bubblegum Pink) zur klaren farblichen
  Abgrenzung. Termin-Detail zeigt ein "Eigener Termin"-Badge statt
  Modul-Link, keine Raum-/Modul-Zeile, dafür einen Löschen-Button.
  Bewusst nicht im Ausdruck (eigene CSS-Regel) und nicht im
  Google-Kalender-Feed (serverseitig aus Repo-Daten gebaut, sieht
  `localStorage` nie).
- **Next-Up-Leiste um Prüfungen/Abgaben erweitert**: zweite Zeile mit
  der nächsten anstehenden Prüfung/Abgabe, semesterübergreifend,
  entfällt bei Dopplung mit der Hauptzeile. Eigene, ganztägig-sichere
  Datumslogik (`findNextPruefungAbgabe()`), weil die bestehende
  Next-Up-Filterung nur Termine mit Uhrzeit erfasst – Abgaben sind
  aber meist ganztägig und wären sonst nie erschienen.

### Changed
- Filter-Button "Nur Prüfungen/Abgaben" sitzt auf Desktop jetzt direkt
  neben der Suche statt am rechten Rand der Toolbar
  (`justify-content: flex-start` statt `space-between`).
- Termin-Titel werden jetzt an allen sieben Render-Stellen (Monatsraster,
  Day-Focus, Tagesansicht, beide Next-Up-Zeilen, Suche) escaped
  (`escapeHtml()`), statt roh in `innerHTML` eingesetzt zu werden –
  unproblematisch bei den bisher fest im Quellcode stehenden Titeln,
  aber notwendig, seit eigene Termine Titel direkt vom Nutzer
  entgegennehmen.
- Notiz-Sync-Panel exportiert/importiert jetzt auch eigene Termine
  (`personalEvent:`-Präfix zusätzlich zu `note:`), gleicher JSON-Blob,
  Texte entsprechend angepasst ("Notizen und eigene Termine").

## [3.5.1] - 2026-08-08

### Changed
- **Filter-Button "Nur Prüfungen/Abgaben" auf reines Icon umgestellt**:
  statt Text jetzt ein selbst gezeichnetes SVG-Trichter-Icon (klassische
  Filter-Form), auf allen Bildschirmgrößen – vorher nur auf Mobile
  geplant, auf Wunsch überall vereinheitlicht. Bezeichnung bleibt als
  natives Tooltip (`title`-Attribut) beim Hovern erhalten.
  Toolbar-Layout auf Mobile dadurch vereinfacht: der kompakte
  34×34px-Button passt jetzt direkt neben die Suche statt darunter
  umzubrechen – das Spalten-Layout von v3.5.0 (Workaround gegen das
  Dropdown-Überlappungsproblem) war damit nicht mehr nötig.

## [3.5.0] - 2026-08-08

### Added
- **Suchfilter nach Termin-Typ**: Umschalter "📝📤 Nur Prüfungen/Abgaben"
  neben der Suche. Funktioniert auch eigenständig ganz ohne Texteingabe
  (zeigt dann alle Prüfungen/Abgaben semesterübergreifend) und
  kombinierbar mit einem Suchbegriff. Aktuell ohne sichtbare Treffer, da
  noch keine echten Prüfungs-/Abgabetermine im Kalender eingetragen
  sind – Funktion selbst ist fertig und mit einem simulierten Termin
  getestet.

### Changed
- **"⋮" statt "⚙️ Verwalten" auf Mobile**: Der Verwalten-Button zeigt auf
  schmalen Screens nur noch das Icon (wirkte als voller Text zu wuchtig
  auf eigener Zeile), Desktop bleibt unverändert bei Icon+Text.
  `.month-label` hatte dabei eine feste `min-width:180px`, die unnötig
  Platz blockierte und selbst mit dem schmalen Icon-Button einen
  Zeilenumbruch erzwungen hätte – auf Mobile entfernt. Header passt jetzt
  wieder in eine Zeile (⋮/←/Monat/→/Heute), über alle Monate des
  Semesters getestet.

### Fixed
- Suchergebnis-Dropdown überlappte auf Mobile den (umgebrochenen)
  Filter-Button und blockierte dessen Klicks. Toolbar ist auf Mobile
  jetzt eine Spalte mit dem Filter-Button oberhalb der Suche statt
  darunter, damit sich beide nie mehr überlappen können.
- Der globale "Klick außerhalb schließt Dropdown"-Handler kannte den
  neuen Filter-Button nicht (liegt außerhalb von `.search-wrap`) und
  schloss das Such-Dropdown sofort wieder, direkt nachdem der
  Filter-Klick es geöffnet hatte.

## [3.4.0] - 2026-08-08

### Added
- **QR-Code für den Kalender-Abo-Link** im Verwalten-Menü: Toggle-Button
  "📱 QR-Code anzeigen" blendet einen SVG-QR-Code für die HTTPS-Feed-URL
  ein. Bewusst komplett lokal generiert (QR-Bibliothek
  "qrcode-generator" von Kazuhiko Arase, MIT-Lizenz, eingebettet statt
  von einem Drittanbieter-Dienst geladen) – der Dateiname des Feeds ist
  der einzige Schutz vor unbefugtem Zugriff (s. `scripts/generate-ics.js`)
  und darf daher nie an einen externen Dienst geschickt werden.
- **Feed-Aktualität anzeigen** im Verwalten-Menü: zeigt "Feed zuletzt
  aktualisiert am …", ausgelesen aus einer neuen
  `X-KALENDER-GENERATED-AT`-Property im Kopf der ICS-Datei (von
  `scripts/generate-ics.js` bei jeder Generierung neu gesetzt). Wird bei
  jedem Öffnen des Verwalten-Menüs neu geprüft, mit Fallback-Text bei
  fehlendem Netz.

### Changed
- `scripts/generate-ics.js` schreibt jetzt die genannte
  `X-KALENDER-GENERATED-AT`-Property in jede generierte ICS-Datei.
- Service Worker behandelt den ICS-Feed jetzt wie HTML als
  network-first statt cache-first – sonst hätte die
  Feed-Aktualitäts-Anzeige immer nur den gecachten (alten) Stand
  gesehen und wäre nutzlos gewesen.

## [3.3.0] - 2026-08-08

### Added
- **"⚙️ Verwalten"-Menü im Header**: neuer Button links vor der
  Monatsnavigation öffnet ein zentrales Menü (gleiches Overlay-Muster
  wie Notiz-Sync und Termin-Details) mit drei Gruppen – Abonnieren
  (Google Kalender, Abo-Link), Drucken, Notizen. Ersetzt die bisher über
  Toolbar und Footer verstreuten Buttons.

### Changed
- Toolbar enthält jetzt nur noch die Suche; der bisherige Footer
  ("🖨️ Drucken", "📋 Notizen übertragen") entfällt vollständig, beide
  Funktionen sind ins neue Verwalten-Menü gewandert.
- Beide bisher gleichlautenden "🔗 Link kopieren"-Buttons eindeutig
  benannt: "🔗 Abo-Link kopieren" im Verwalten-Menü, "🔗 Kopieren" in der
  Tagesansicht (Kontext macht dort weitere Präzisierung unnötig).
- "📋 Notizen übertragen" schließt beim Klick automatisch das
  Verwalten-Menü, statt beide Overlays gleichzeitig offen zu lassen.

### Fixed
- Nav-Zeile im Header lief auf schmalen Screens (~390px) über den
  sichtbaren Bereich hinaus und drängte den "Heute"-Button aus dem
  Sichtfeld (Regression durch den neuen Verwalten-Button). Behoben,
  indem der Verwalten-Button auf Mobile eine erzwungene eigene Zeile
  bekommt, während ←/Monat/→/Heute wie bisher als Gruppe zusammenbleiben.

## [3.2.0] - 2026-08-08

### Added
- **Eigener "🖨️ Drucken"-Button** im Footer, neben "Notizen übertragen".
  Grund: als installierte App (Standalone-Modus) fehlen Adressleiste und
  Browser-Menü – damit gibt es dort weder Strg/Cmd+P noch einen
  Drucken-Menüpunkt. Der Button ruft `window.print()` direkt auf, das
  funktioniert unabhängig von vorhandener Browser-Oberfläche und nutzt
  das bereits bestehende Druck-Stylesheet (v3.1.0).

## [3.1.2] - 2026-08-08

### Changed
- **Icon-Korrektur zu v3.1.1**: Die Kalendergrafik (Aufhänger, Kopfleiste,
  sechs Datumsfelder) war dort komplett entfernt worden – zu radikal, denn
  eigentlich störten nur die zwei getrennten Schatten (einer um den
  äußeren Kreis, einer separat um die Kalendergrafik), die es wie zwei
  voneinander abgegrenzte Elemente wirken ließen. Jetzt: Kalendergrafik
  ist zurück, aber ganz ohne Schatten – sitzt flach auf dem einen Kreis,
  wie ursprünglich gewünscht.

## [3.1.1] - 2026-08-08

### Changed
- **App-Name beim Installieren gekürzt auf "Kalender"** statt der bisherigen
  Abkürzung "Vorl.-Kalender" (`short_name` im Manifest) – die kam zum
  Einsatz, wenn auf dem Homescreen/App-Drawer nicht genug Platz für den
  vollen Namen "Vorlesungskalender" war.
- **App-Icon vereinfacht**: Die bisherige Kalendergrafik (Aufhänger,
  Kopfleiste, sechs Datumsfelder) mit eigenem Schatten *innerhalb* des
  äußeren Kreises wirkte durch die zwei getrennten Schatten wie zwei
  voneinander abgegrenzte Elemente. Jetzt ein einzelner, schlichter Kreis
  in Pink Orchid – wie schon beim Modulverzeichnis-Favicon. Betrifft alle
  Icon-Dateien (Favicons, App-Icons, Apple-Touch-Icon); die
  maskable/Apple-Variante ist bewusst randlos gefüllt statt selbst einen
  Kreis vorzugeben, damit das Betriebssystem beim Zuschneiden (Kreis,
  Squircle, abgerundetes Quadrat …) keine sichtbaren Ecken/Ränder übrig
  lässt.

## [3.1.0] - 2026-08-08

### Added
- **Druck-Stylesheet**: Beim Ausdrucken (`Strg`/`Cmd`+`P`) zeigt die Seite jetzt
  eine saubere Monatsübersicht auf Papier – Passwort-Overlay, Suche,
  Abo-Buttons, Countdown-Leiste, Navigation und der Notizen-Button werden
  automatisch ausgeblendet. Übrig bleiben Titel, aktueller Monat,
  Farblegende und das Kalenderraster mit den echten Modulfarben.

### Fixed
- **Fehlende Termine ab dem 4. Termin pro Tag beim Drucken**: Auf dem
  Bildschirm werden ab dem 4. Termin (Desktop) bzw. 7. (Mobile) nur noch
  ein "+N weitere"-Button gezeigt – die zusätzlichen Termine wurden bisher
  nie ins DOM gerendert. Auf Papier gibt es aber kein Antippen, sie wären
  also einfach verschwunden. Jetzt werden immer alle Termine gerendert,
  die Begrenzung passiert rein optisch per CSS (nur auf dem Bildschirm)
  – beim Drucken sind automatisch alle sichtbar.
- **Kalenderraster lief beim Drucken über den Seitenrand hinaus** (Sonntag-
  Spalte abgeschnitten): bekanntes CSS-Grid-Verhalten – `1fr`-Spalten
  schrumpfen nicht unter die Mindestbreite ihres Inhalts (hier: lange
  deutsche Wörter wie "Systemtheorie"). Behoben mit
  `minmax(0, 1fr)` statt `1fr` bei Wochentags- und Kalenderraster.

## [3.0.0] - 2026-08-07

### Added
- **Mehrsemester-Fähigkeit**: `EVENTS` ist jetzt `EVENTS_BY_SEMESTER`, ein
  Objekt mit einer Terminliste pro Semester, plus eine neue `SEMESTERS`-Liste
  mit Anzeigename, Datumsspanne, angezeigten Monaten, Ferien und
  Fachsemester-Zahl je Semester. Ein neues Semester (z. B. SoSe 2027)
  ergänzen heißt künftig: Eintrag in `SEMESTERS` + Termine in
  `EVENTS_BY_SEMESTER` hinzufügen – der Rest (Anzeige, Suche, Abo)
  funktioniert automatisch mit.
- **Semesterauswahl im Header**: neues Dropdown in der Kopfzeile (`sticky`,
  bleibt beim Scrollen sichtbar) ersetzt die bisherige feste Semesterangabe
  im Titel. Beim Laden wird automatisch das zum heutigen Datum passende
  Semester vorausgewählt (mit Fallback aufs nächstgelegene, falls "heute" in
  keine Spanne fällt); manuelles Umschalten – auch auf noch nicht laufende
  Semester – ist jederzeit möglich. Bei jedem Neuladen der Seite springt die
  Auswahl wieder auf das aktuelle Semester zurück.
- Titel generisch "Vorlesungskalender" (ohne Semesterangabe), Fachsemester-Zahl
  und Legende (nur tatsächlich im aktiven Semester vorkommende Module)
  aktualisieren sich automatisch beim Semesterwechsel.
- **Suche und "Nächste Veranstaltung" laufen semesterübergreifend**: ein
  Treffer aus einem anderen als dem gerade angezeigten Semester schaltet
  beim Anklicken automatisch dorthin um. Geteilte Tages-Links (`#YYYY-MM-DD`)
  erkennen ebenfalls automatisch das richtige Semester.

### Changed
- **ICS-Kalender-Feed enthält jetzt alle Semester** statt nur eines – ein
  einmal eingerichtetes Abo in Google/Apple Kalender deckt damit auch künftige
  Semester automatisch mit ab, ohne erneutes Einrichten. Kalendername im Feed
  entsprechend generisch.
- `manifest.webmanifest`-Name ebenfalls generisch (ohne Semesterangabe).

### Fixed
- **`scripts/generate-ics.js` lief nicht mehr**: referenzierte durch den
  CSS-Variablen-Setup-Code aus `index.html` versehentlich `document`, das in
  Node nicht existiert – Skript brach beim Ausführen ab. Per Stub behoben.
- **ICS-Export für Termine ohne feste Uhrzeit** (Abgaben) nachgerüstet: hätte
  bisher beim Erzeugen abgestürzt (`ev.start.replace` auf `null`); erzeugt
  jetzt korrekt einen Ganztages-Eintrag (`DTSTART;VALUE=DATE`). Bisher nicht
  aufgefallen, da noch keine Abgabetermine ohne Uhrzeit eingetragen waren.

## [2.7.0] - 2026-08-07

### Changed
- **"📋 Notizen übertragen" aus der Toolbar in eine neue Fußzeile verschoben**:
  Der Button stand als dritter Eintrag in der Toolbar zusammen mit den
  Abo-Buttons und wurde auf schmalen Bildschirmen abgeschnitten. Jetzt
  zentriert unterhalb des Kalendergitters – behebt nebenbei das
  Mobile-Layout-Problem, da die Toolbar nur noch zwei Buttons enthält.
  Funktion selbst unverändert.

## [2.6.1] - 2026-08-07

### Fixed
- **Google-Calendar-Button fehlgeschlagen**: "Hinzufügen zum Kalender nicht
  möglich. Überprüfen Sie die URL" beim Klick auf "Zu Google Kalender
  hinzufügen". Der `cid`-Parameter von Googles Render-Endpunkt erwartet eine
  `webcal://`-URL statt `https://` – mit `https://` interpretiert Google den
  Wert offenbar als interne Kalender-ID. "Link kopieren" bleibt unverändert
  bei `https://`.

## [2.6.0] - 2026-08-07

### Changed
- **Kalender-Abo neu gelöst**: Der bisherige `webcal://`-Link ("Kalender
  abonnieren") tat auf den meisten Geräten/Browsern nichts, da dafür ein
  registrierter Protokoll-Handler nötig ist. Ersetzt durch den Button
  "📅 Zu Google Kalender hinzufügen", der über den inoffiziellen
  `calendar.google.com/calendar/render?cid=…`-Mechanismus direkt in Google
  Kalender mit einer Abo-Bestätigung öffnet – ein Klick, kein Kopieren.
  "🔗 Link kopieren" bleibt als Fallback für andere Kalender-Apps
  (Apple Kalender, Outlook u. a.) bestehen.

## [2.5.0] - 2026-08-06

### Added
- **Notizen zwischen Geräten übertragen**: neuer Button "📋 Notizen
  übertragen" in der Toolbar öffnet ein Panel mit Export (alle privaten
  Notizen als Text zum Kopieren) und Import (Text auf dem anderen Gerät
  einfügen). Bewusst manuell statt automatischem Cloud-Sync – Notizen
  bleiben dadurch weiterhin ausschließlich lokal gespeichert, verlassen das
  Gerät nur, wenn aktiv kopiert/eingefügt wird. Import überschreibt nur
  Notizen zu denselben Terminen, alle anderen bleiben erhalten.

### Fixed
- **Möglicher Notiz-Konflikt bei Prüfungs-/Abgabeterminen behoben**: Der
  Notiz-Schlüssel wurde aus Datum+Uhrzeit+LV-Nummer gebildet – bei
  Abgabeterminen (Uhrzeit und LV-Nummer können beide fehlen) hätten sich
  zwei verschiedene Abgaben am selben Tag versehentlich dieselbe Notiz
  geteilt. Fällt jetzt in diesem Fall auf Modul+Titel zurück. Bestehende
  Notizen sind davon nicht betroffen, da alle bisherigen Termine eine echte
  LV-Nummer haben.

## [2.4.0] - 2026-08-06

### Added
- **Prüfungs- und Abgabetermine als eigener Typ**: Termine können jetzt ein
  optionales `type`-Feld (`"pruefung"` / `"abgabe"`) bekommen. Werden im
  Monatsraster, der Tagesansicht und im Termin-Modal mit Icon (📝/📤) und
  einem zusätzlichen Akzentrand (statt der Modulfarbe zu ersetzen, bleibt
  die Modulzuordnung weiterhin erkennbar) hervorgehoben. Modal zeigt
  zusätzlich ein eigenes Typ-Badge ("📝 Prüfungstermin" / "📤
  Abgabetermin").
- **Uhrzeit ist jetzt optional** (`start`/`end` dürfen `null` sein) – für
  Abgabetermine ohne feste Uhrzeit. Werden als "Ganztägig" angezeigt und
  sortieren an den Anfang des jeweiligen Tages (wie in gängigen
  Kalender-Apps). Bei Abgaben wird die Raum-Zeile weggelassen, da meist
  nicht zutreffend. Termine ohne Uhrzeit werden aus der
  "Nächste Veranstaltung"-Berechnung und dem Live-Countdown der
  Tagesansicht ausgeschlossen (ergibt dort keinen Sinn), erscheinen aber
  ganz normal in der Terminliste.
- Datenpflege weiterhin ausschließlich über den Quellcode (`EVENTS`-Array),
  keine Eingabe-UI im Kalender selbst.

## [2.3.0] - 2026-08-05

### Added
- **Tagesansicht** (Fokus-Ansicht / Tagesausblick): Klick auf eine Tageszelle
  im Monatsraster öffnet einen eigenen Vollbild-Screen mit allen Terminen
  dieses Tages. Für den heutigen Tag zusätzlich ein Live-Status mit
  Countdown zum laufenden oder nächsten Termin (aktualisiert alle 30s).
  Klick auf einen Termin in der Liste öffnet das gewohnte Detail-Modal
  (inkl. privater Notiz).
- **Teilbarer Link zu einem Tag**: Die Tagesansicht setzt die URL auf
  `#YYYY-MM-DD`; ein direkter Aufruf mit diesem Hash springt automatisch
  zum richtigen Monat und öffnet den Tag. "🔗 Link kopieren" im Kopfbereich
  kopiert die fertige URL. Browser-Zurück/Vor funktioniert dank
  `history.pushState`/`popstate` wie erwartet.
- Der "+N weitere"-Button bei vielen Terminen an einem Tag öffnet jetzt
  korrekt die vollständige Tagesansicht statt (Bug) nur den 4. Termin im
  Detail-Modal zu zeigen.

## [2.2.0] - 2026-08-05

### Added
- **Modul-Badge im Event-Modal ist jetzt klickbar**: Führt direkt zum
  passenden Modul im Modulverzeichnis (`module.xn--peppermita-lnb.de/#modul-N`,
  in neuem Tab). Die Modulnummer wird aus dem Modul-Code abgeleitet (z. B.
  M07 → `#modul-7`). Beim Zusatzangebot (ZA), das im Modulhandbuch nicht
  geführt wird, bleibt der Badge unverlinkt.

## [2.1.1] - 2026-08-04

### Changed
- `module.html` (Weiterleitung auf das neue, eigenständige Modulverzeichnis)
  stark vereinfacht: statt einer gestalteten Seite mit Erklärtext, Emoji und
  3-Sekunden-Countdown jetzt nur noch ein sofortiger Redirect (0 Sekunden)
  plus einfacher Fallback-Link. Betrifft praktisch nur noch alte
  Lesezeichen, da der eigentliche Header-Link im Kalender bereits direkt
  auf die neue Domain zeigt.

## [2.1.0] - 2026-08-04

### Changed
- Modulverzeichnis-Link im Header zeigt jetzt auf die neue, eigenständige
  Modulverzeichnis-v2-Seite (https://module.xn--peppermita-lnb.de/, eigenes
  Repo `peppermieta/Modulverzeichnis`) statt auf die interne `module.html`.
- README aktualisiert: "Geplant"-Abschnitt durch Hinweis auf die
  abgeschlossene Migration ersetzt, Funktionsliste angepasst.

### Removed
- Inhalt der alten `module.html` entfernt und durch eine kurze
  Weiterleitungsseite ersetzt (automatischer Redirect nach 3 Sekunden +
  manueller Link), falls noch alte Lesezeichen im Umlauf sind.

## [2.0.2] - 2026-08-04

### Added
- `PLANUNG_Modulverzeichnis-v2.md` aktualisiert: mehrere Infrastruktur-
  Schritte als erledigt markiert.
  * Repo `peppermieta/Modulverzeichnis` angelegt (public, MIT-Lizenz)
  * Subdomain `module.xn--peppermita-lnb.de` eingerichtet, GitHub Pages
    aktiv, HTTPS erzwungen und bestätigt live
  * `info@peppermięta.de` eingerichtet (als Alias, da der Strato-Tarif nur
    1 Postfach erlaubt) und Weiterleitung an die Uni-Mail erfolgreich
    getestet – damit auch die offene E-Mail-Ziel-Frage entschieden
  * Praxis-Erkenntnis ergänzt: Custom-Domain-Einrichtung per API brauchte
    zusätzlich `administration=write`, was bewusst nicht ins Token
    aufgenommen wurde – dieser eine Schritt lief daher manuell, wie beim
    Kalender

## [2.0.1] - 2026-08-04

### Added
- `PLANUNG_Modulverzeichnis-v2.md` um vier Abschnitte erweitert:
  * Repository- & Token-Setup (public vs. private, Struktur, Lizenzfrage,
    getrennte vs. gemeinsame Tokens, neu empfohlene `Pages: Read and write`-
    Berechtigung für vollautomatisches HTTPS-Enforcement)
  * Loslösung vom Kalender-Repo (Migrationsplan: erst v2 fertigstellen,
    dann Verweis umbiegen, alte `module.html` entfernen/weiterleiten)
  * Offene Frage zum E-Mail-Weiterleitungsziel (Hotmail vs. Uni-Mail,
    inkl. Hinweis auf mögliche Einschränkungen bei Hochschul-Mailsystemen)
  * Notiz zum Status von PWA Phase 1 (abgeschlossen) und Phase 2 (ntfy,
    zurückgestellt)
- Reine Dokumentation, keine Umsetzung.

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
