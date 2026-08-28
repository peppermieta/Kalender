# Vorlesungskalender – Ideensammlung

Noch nicht umgesetzte Funktionen, sortiert nach Umsetzbarkeit/Aufwand.
*(Stand: 27. August 2026)*

## ⚡ Schnell — geringer Aufwand

- **Notiz zum ganzen Tag** – Notizen hingen bisher zwingend an einem
  Termin, für Kleinigkeiten wie "Regenschirm mitnehmen" gab es keinen
  Platz ohne einen eigenen Termin nur dafür anzulegen.
  **✅ Umgesetzt** (v3.14.0) – leichtgewichtiger Freitext-Bereich pro Tag
  unter der Terminliste in der Tagesansicht, aufklappbar solange leer,
  direkt sichtbar sobald Inhalt vorhanden. Bewusst ohne Uhrzeit und ohne
  Chip im Monatsraster (Unterschied zu eigenen Freitext-Terminen),
  stattdessen ein kleiner Punkt neben der Tageszahl. Synct über
  denselben Gist-Mechanismus wie Termin-Notizen und eigene Termine.
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
- **Automatische Konflikterkennung** – visueller Warnhinweis, wenn sich zwei
  Termine zeitlich überschneiden. Betrifft in der Praxis vor allem eigene
  Freitext-Termine, die versehentlich mit einem echten Termin kollidieren.
  **✅ Umgesetzt** (v3.15.0) – neue `findConflicts(ev)`-Hilfsfunktion,
  rein clientseitig aus `byDate`/`start`/`end` berechnet, kein neuer
  Datenbedarf. Bewusst nur Termine mit fester Uhrzeit betrachtet
  (ganztägige Abgaben hätten sonst an jedem gemeinsamen Tag fälschlich
  als Konflikt gegolten). ⚠️-Icon an drei Stellen: Chip im Monatsraster,
  Eintrag in der Tagesansicht, Hinweiszeile im Termin-Detail-Modal mit
  Name/Uhrzeit des kollidierenden Termins. Kleiner Bugfix unterwegs: das
  Icon stand ursprünglich hinter dem Titel und wurde bei langen
  Terminnamen von der Chip-Ellipsis mit abgeschnitten – jetzt davor,
  analog zum bestehenden Prüfungs-/Abgabe-Icon.
- **Kalender-Suche um Lehrpersonen erweitern** – das `lehrperson`-Feld ist
  an praktisch jedem Termin bereits gepflegt, wurde von der Live-Suche
  aber nicht durchsucht.
  **✅ Umgesetzt** (v3.15.0) – `eventMatchesQuery()` durchsucht jetzt
  zusätzlich `lehrperson` (mit `.filter(Boolean)` gegen `null`-Werte bei
  Prüfungen/Abgaben/eigenen Terminen). Reine Erweiterung der bestehenden
  Suchfunktion, kein neuer Mechanismus.
- **Statistik "meistgenutzte Räume"** – rein informativer, verspielter
  Überblick, welche Räume am häufigsten vorkommen.
- **Countdown zur nächsten Prüfung** – dauerhaft sichtbarer, dezenter
  Countdown statt nur der Next-Up-Zeile.
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

- **Dark Mode** – umschaltbares dunkles Farbschema.
  **✅ Umgesetzt** (v3.8.0) – Umschalter im Verwalten-Menü (neue
  "Einstellungen"-Gruppe), gespeicherte Präferenz wird per Bootstrap-
  Skript im `<head>` synchron vor dem ersten Rendern angewendet (kein
  Aufblitzen des hellen Modus). Eigens abgestimmte Dunkel-Varianten für
  alle Modulfarben statt reiner Invertierung, gleiche Dunkel-Basispalette
  wie im Modulverzeichnis (Konsistenz zwischen beiden Projekten).
  Technische Besonderheit: Modulfarben werden zur Laufzeit als
  Inline-Style gesetzt (höhere Spezifität als jede CSS-Regel) – dafür
  `MODS_LIGHT`/`MODS_DARK` mit dynamischer Umschaltung der `MODS`-Bindung
  gebaut, statt nur CSS-Variablen zu überschreiben. Ausdrucke bleiben
  unabhängig vom aktuellen Modus immer hell (eigener Sicherheits-
  mechanismus über `beforeprint`/`afterprint`, da die reine
  CSS-Variablen-Rückstellung die Inline-gesetzten Modulfarben nicht
  erreicht hätte).
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
- **Laufende Semester-Fortschrittsanzeige** 🎯 **Priorität (28.08.2026,
  bald angehen)** – zeigt während des
  Semesters die eigene Position im Verlauf, z. B. "Woche 6 von 16" oder
  ein kleiner Fortschrittsbalken. Anders als der bereits geplante
  Semester-Rückblick (der erscheint erst am Ende) wäre das eine laufende
  Orientierung während des Semesters – ließe sich aus den
  `SEMESTERS`-Metadaten (Start-/Enddatum) berechnen, kein neuer
  Datenbedarf.
- **Räume und Lehrpersonen anzeigen** – Lehrpersonen-Daten sind bereits
  vollständig gepflegt (`lehrperson`-Feld an praktisch jedem Termin),
  werden aber nirgendwo angezeigt – im Termin-Detail als weitere
  Info-Zeile leicht ergänzbar. Räume dagegen fehlen komplett: die
  Lookup-Infrastruktur existiert bereits (`ROOMS`-Tabelle nach
  LV-Nummer, plus optionales `raum:`-Feld direkt am Termin als
  Override), die Tabelle selbst ist aber leer – müsste erst mit echten
  Raumdaten befüllt werden (der eigentliche Aufwand liegt hier in der
  Datenrecherche, nicht im Code).
  **✅ Umgesetzt** (v3.11.0) – Dozierende-Zeile im Termin-Detail
  ergänzt. Raumdaten anhand des offiziellen HISinOne-ICS-Exports
  übernommen: `ROOMS`-Tabelle für 8 Einzelraum-Kurse befüllt, 4 Kurse
  mit wechselndem Raum über `raum:`-Overrides pro Termin abgebildet.
  Dabei nebenbei eine falsche LV-Nummer gefunden und korrigiert
  ("Übungen zu Gesprächsführung"). **Noch offen:** Dozierenden-Daten
  sind zwar jetzt sichtbar, aber noch nicht gegen eine offizielle
  Quelle geprüft – der HISinOne-ICS-Export selbst enthält keine
  Dozierenden-Angaben, dafür wird noch eine andere Quelle gebraucht.
- **Kalender ↔ Modulverzeichnis verknüpfen** – von einem Kalendertermin
  direkt zum zugehörigen Modul im Modulverzeichnis springen.
  **✅ Umgesetzt** (v2.2.0) – Modul-Badge im Termin-Detail verlinkt
  direkt zur passenden Detailkarte im Modulverzeichnis.
  **Zweite, tiefere Verbindungsebene ergänzt** (v1.12.0/v3.21.0, im
  Zuge der Belastungs-Heatmap): `workload.json`-Datenbrücke – nicht nur
  ein Link mehr, sondern echter Datenaustausch (CP/SWS/Workload-
  Aufteilung fließen direkt in die S_w-Berechnung ein).
- **Archiv-Konzept für alte Semester** – Frage, wie alte, abgeschlossene
  Semester langfristig gehandhabt werden.
  **✅ Umgesetzt** (v3.0.0) – alles in einer Datei mit Semester-Umschalter
  statt eingefrorener Einzelseiten pro Semester.
- **Ferien-Modus** – während der vorlesungsfreien Zeit automatisch eine
  vereinfachte Ansicht statt leerem Wochenraster. Die `ferien`-Liste pro
  Semester existiert bereits (`FERIEN`-Set, aktuell nur als Hinweis in
  der Tagesansicht genutzt) – ließe sich für eine Erkennung "aktuell in
  den Ferien" wiederverwenden, z. B. ein reduzierter Monatsblick ohne
  leere Zellen oder ein Hinweistext statt des normalen Rasters.
- **Tag/Woche als Bild teilen** 🎯 **Priorität (28.08.2026, bald
  angehen)** – über die Web-Share-API den
  Tages-/Wochenplan als Bild verschicken. Technisch am ehesten über ein
  Canvas-Rendering des jeweiligen Ausschnitts lösbar (ähnlich wie beim
  Drucken, nur als Bilddatei statt PDF) und `navigator.share()` mit
  Datei-Anhang; auf Desktop ohne Share-API bräuchte es einen Fallback
  (z. B. Bild-Download).
- **"Was hab ich verpasst?"** 🎯 **Priorität (28.08.2026, bald angehen)**
  – kurze Zusammenfassung der Lücke, wenn man
  ein paar Tage nicht im Kalender war. Ließe sich über einen in
  `localStorage` gespeicherten Zeitstempel "zuletzt geöffnet" umsetzen:
  liegt er mehr als z. B. 2 Tage zurück, eine kompakte Übersicht der
  dazwischenliegenden Termine/Prüfungen anzeigen, danach Zeitstempel
  aktualisieren.
- **Exportierbare Kurszusammenfassung** – PDF-Export für ein einzelnes
  Modul statt des ganzen Semesters. Ließe sich am ehesten über eine
  gefilterte Variante des bestehenden Druck-Stylesheets lösen (nur
  Termine eines Moduls statt des kompletten Monats), ausgelöst über
  einen Export-Button direkt im Modul-Kontext statt über das normale
  Drucken.
- **Wetter-Hinweis für heute** – kleiner Wetterhinweis über eine
  kostenlose API. Bewusst fest auf Ludwigsburg eingestellt statt per
  Geolocation (kein Berechtigungsdialog nötig, entspricht dem
  persönlichen Nutzungszweck). Einzige Idee der ganzen Liste mit
  externer Drittanbieter-Abhängigkeit zur Laufzeit – müsste entsprechend
  defensiv eingebaut werden (z. B. stiller Fehlschlag statt kaputter
  Anzeige, falls die API mal nicht erreichbar ist).
- **Eigene Kategorien für private Termine** – kleine, wählbare
  Unterkategorie statt nur "Privat". Ließe sich als zusätzliches Feld am
  `personalEvent:`-Objekt ergänzen (z. B. eine kurze Liste vordefinierter
  Kategorien mit je eigener Akzentfarbe innerhalb von Bubblegum Pink),
  ohne das bestehende Zwei-Schicht-Prinzip der Modulfarben anzutasten.
- **Semesterübergreifende Notiz-Suche** – bestehende Suche um
  Notiz-Inhalte erweitern, nicht nur Termine. Da Notizen nur als
  `note:`-Schlüssel in `localStorage` liegen (nicht in
  `EVENTS_BY_SEMESTER`), bräuchte die Suche einen zweiten Durchlauf über
  alle `note:`-Einträge, deren Treffer dann über den gleichen
  Schlüssel-Aufbau (Datum/Uhrzeit/LV-Nummer) zum passenden Termin
  zurückverknüpft werden.
- **Prüfungsvorbereitungs-Rückwärtsplanung** – zu jedem Prüfungstermin
  automatisch eine empfohlene Vorbereitungszeit davor markieren,
  abgeleitet aus dem CP-Gewicht.

## 🏗 Größer — größere technische Themen

- **Echter geräteübergreifender Notiz-Sync** – ein richtiges Backend
  statt des manuellen Export/Imports, damit Notizen automatisch zwischen
  Geräten synchron bleiben. Bewusst als Fernziel zurückgestellt.
  **✅ Umgesetzt** (v3.9.0, stabil seit v3.9.2, Aufräumarbeiten in
  v3.10.0) – Einbahnstraßen-Modell über einen GitHub Secret Gist statt
  eines eigenen Backends: nur ein als Schreibgerät markiertes Gerät
  (Token in `localStorage`) lädt Notizen und eigene Freitext-Termine
  automatisch hoch (2,5s nach Eingabe), alle anderen Geräte lesen den
  Gist beim Laden/Fokuswechsel mit, ganz ohne eigenen Token. Kein
  Konfliktmanagement nötig, da bewusst nur ein Gerät jemals schreibt.
  Der ursprünglich angedachte Ansatz mit eigenem Backend (Cloudflare
  Worker, Zeitstempel, Mehrschreiber-Konfliktauflösung) wurde zugunsten
  dieser deutlich einfacheren Lösung verworfen. Nach dem ersten
  Praxistest zwei echte Bugs gefunden und behoben (v3.9.1: fehlender
  Push-Trigger beim Anlegen eigener Termine; v3.9.2: Service Worker
  cachte Gist-API-Antworten fälschlich statt sie frisch zu holen).
  Die inzwischen überflüssige manuelle Copy-Paste-Übertragung wieder
  entfernt, Notiz-Indikator in der Tagesansicht ergänzt (v3.10.0).
- **Prospektive Belastungs-Heatmap** – eine farbcodierte Semesterkurve,
  die zeigt, wie stark jede Woche des Semesters belastet ist
  (Kontaktzeit + Prüfungsnähe). Als konkretes Vorhaben eingestuft, nicht
  nur Vision. Technisch anspruchsvollster Punkt der Liste – hier
  ausführlicher geplant statt nur als Idee notiert:

  **Datengrundlage:**
  - Aus dem Modulverzeichnis: CP und SWS je Baustein, Workload-Aufteilung
    (Kontaktzeit/Selbststudium/ggf. Praxisanteil) – in `modules_data.py`
    bereits vorhanden.
  - Aus dem Kalender: tatsächliche Kontaktstunden je Woche (aus den
    echten Terminen mit Start-/Endzeit), Prüfungs-/Abgabetermine mit
    Datum.

  **Die eigentliche Hürde – Datenbrücke zwischen den Projekten:**
  Modulverzeichnis und Kalender sind unabhängige statische Seiten ohne
  gemeinsame Datenquelle. Lösungsansatz: Die bestehende Build-Pipeline
  des Modulverzeichnisses (`build.py`) erzeugt zusätzlich eine schlanke,
  öffentliche `workload.json` (Modul → CP/SWS/Workload-Aufteilung), die
  der Kalender zur Laufzeit per `fetch()` einliest – ähnliches Prinzip
  wie beim bereits bestehenden Modul-Link vom Kalender zum
  Modulverzeichnis, nur umgekehrt und mit echten Daten statt nur einem
  Link.

  **Berechnung, mit einer bewussten Vereinfachung:** Kontaktzeit lässt
  sich datumsgenau aus den echten Kalenderterminen ableiten.
  Selbststudium dagegen hat kein festes Datum – würde gleichmäßig auf
  die Vorlesungswochen des jeweiligen Semesters verteilt (keine
  Berücksichtigung von individuellem Lernverhalten oder
  Prüfungsvorbereitung, die realistisch nicht gleichmäßig verteilt ist –
  diese Vereinfachung müsste so auch klar kommuniziert werden). Wochen
  mit Prüfungs-/Abgabeterminen bekommen zusätzlich einen
  Belastungs-Bonus in der Berechnung, auch wenn die reine Kontaktzeit
  in dieser Woche gering ist.

  **Darstellung:** vermutlich ein eigener Screen statt eine Einordnung
  ins bestehende Verwalten-Menü – eine horizontale Wochenleiste über das
  Semester, farbcodiert von grün (ruhige Woche) bis rot (intensive
  Woche), anklickbare Wochen springen zur entsprechenden Kalenderwoche.

  **Stand (27.08.2026):** Ausführliches Konzept v2 liegt vor
  (`Konzept_Prospektive-Belastungs-Heatmap-v2.md`, bisher nur als
  Download, nicht im Repo committet), kritisch geprüft und gegen die
  echten Repo-Daten verifiziert (M02-Blockkurs-Beispiel, CORS-Verhalten,
  `modules_data.py`-Feldnamen – stimmen). **Noch nicht umgesetzt,
  Grundsatzfrage offen:** neun Umsetzungsetappen sind für ein
  Einzelnutzer-Tool ein erheblicher Aufwand, vergleichbar mit dem
  Mehrsemester-Umbau oder dem Gist-Sync – lohnt sich zuerst ein
  einfacherer Zwischenschritt (s. „Workload-Transparenz" unten)?

  **Etappe 1a/1b umgesetzt (v3.16.0):** Erster, bewusst einfacher Baustein
  (reine Kontaktzeit K_w, ohne Selbststudium/Prüfungsbonus/Farbskala) als
  Beta live: `computeContactHoursByWeek(semesterId)` gruppiert nach
  `{isoYear}-W{week}` (eigene `getISOYear()`-Ergänzung nötig, da
  `getISOWeek()` allein bei Semestern über den Jahreswechsel hinweg
  kollidieren könnte), sichtbar als schlichte Textliste unter
  „⚙️ Verwalten → Analyse (Beta)". Gegen eine komplett unabhängige
  Python-Nachrechnung (`isocalendar()`, nicht die eigene JS-Logik) über
  alle 119 echten Termine des Semesters geprüft: 0 Abweichungen.

  **Etappe 2 umgesetzt (v3.18.0):** Prüfungs-/Abgabebonus P_w als eigene,
  unabhängige Funktion `countPruefungAbgabeByWeek(semesterId)` ergänzt –
  bewusst nur ein einfacher Zähler ohne Gewichtung ("1× Prüfung"/
  "1× Abgabe" statt einer abstrakten Bonuszahl), da sich die Gewichtsfrage
  erst nach etwas Alltagsnutzung sinnvoll beantworten lässt. Eigene Zeile
  unter der jeweiligen Wochenzeile (rot für Prüfung, orange für Abgabe,
  dieselbe Farbsemantik wie die Termin-Akzentränder), Tooltip nennt Titel
  und Datum. Bewusst als eigenständige Funktion statt in K_w
  hineinzurechnen, analog zur B_w = K_w+S_w+P_w-Zerlegung im Konzept.

  **Beim Testen entdeckt – echter Widerspruch im Konzept selbst, keine
  Kleinigkeit:** Abschnitt 3.1 des Konzepts sagt, Prüfungen/Abgaben zählen
  grundsätzlich NICHT als Kontaktzeit ("eigene Belastungskomponente, nicht
  als Kontaktstunden"). Abschnitt 5.1 dagegen sagt nur "ganztägige
  Prüfungen/Abgaben zählen nicht als Kontaktzeit" – impliziert damit, dass
  Prüfungen MIT fester Uhrzeit (der in `ANLEITUNG_Pruefungen-Abgaben.md`
  dokumentierte Standardfall für Klausuren) sehr wohl mitzählen. Die
  aktuelle Etappe-1-Implementierung folgt der 5.1-Lesart (nur ganztägige
  ausgeschlossen) – dadurch taucht eine zeitlich fixierte Klausur sowohl
  in K_w (als Stunden) als auch in P_w (als Prüfungs-Badge) auf. Bewusste
  Entscheidung, keine versehentliche Doppelzählung: K_w beantwortet "wie
  viel Zeit ist verplant", P_w beantwortet "wie viel davon ist
  prüfungsrelevant" – zwei unabhängige Signale, die sich bei einer
  Klausur legitim überschneiden dürfen. Für die spätere Verrechnung in
  eine einzelne B_w-Zahl (noch offen, s. u.) muss diese Entscheidung aber
  nochmal bewusst bestätigt werden, sonst würde eine Klausur real doppelt
  in die Summe eingehen.

  Weitere Etappen (Selbststudium mit Blockkurs-Schutz, eigener Screen mit
  Farbskala) folgen erst nach Rückmeldung, ob die einfache Liste im
  Alltag überhaupt genutzt wird.

  **Etappe 3 abgeschlossen (27.08.2026, reiner Test, kein Code-Change):**
  CORS-Spike für die Datenbrücke zum Modulverzeichnis – wie im Konzept
  (Abschnitt 4.1) gefordert, VOR jedem UI-Code im echten Browser von der
  echten Kalender-Domain aus getestet (nicht nur per `curl`, das nur den
  Header, nicht das tatsächliche Browser-Verhalten zeigt). Ergebnis
  eindeutig: `fetch()` von `https://kalender.peppermięta.de` gegen
  `https://module.peppermięta.de/` UND gegen
  `raw.githubusercontent.com/peppermieta/Modulverzeichnis/…` liefert
  jeweils `response.type: "cors"` mit vollständig lesbarem Body (nicht
  `"opaque"`) – beide in Priorität 1 und 2 vorgesehenen Abrufquellen
  funktionieren. **Damit ist Etappe 9 (Snapshot-Fallback) vorerst
  hinfällig** – wird nur noch relevant, falls sich das GitHub-Pages-CORS-
  Verhalten künftig mal ändert.

  **Etappe 4 abgeschlossen (27.08.2026):** `build.py` im Modulverzeichnis-
  Repo erzeugt bei jedem Lauf zusätzlich eine schlanke `workload.json`
  (CP/SWS/Workload-Aufteilung je Modul, Schlüssel zweistellig gepaddet wie
  `"M02"`). Live bestätigt über `raw.githubusercontent.com`. Details und
  ein nebenbei gefundener Versions-Anzeigefehler (`SITE_VERSION` war
  veraltet) stehen im Modulverzeichnis-eigenen `CHANGELOG.md` (v1.12.0).

  **Etappe 5+6 kombiniert umgesetzt (v3.21.0):** Selbststudium S_w mit
  Blockkurs-Schutz direkt zusammen gebaut, nicht nacheinander – die
  Blockkurs-Erkennung ist ohnehin dieselbe `isBlockLvnr()`-Regel wie bei
  der Aufwandsbewertung (v3.17.0), keine neue Logik nötig dafür.
  - **Aufteilung auf Bausteine/LVs:** anteilig nach echter Kontaktzeit je
    LV (`contactHoursByLvnr()`), nicht gleichmäßig – ein Modul mit einer
    umfangreichen Vorlesung und einer kurzen Übung bekommt so eine
    plausiblere Verteilung als bei starrem 50/50.
  - **Blockkurs-Mindestfenster:** 4 Wochen, symmetrisch (abwechselnd
    davor/danach) erweitert, an den Semestergrenzen gekappt
    (`expandToMinWindow()`). Ferienwochen zählen bewusst mit statt
    ausgespart zu werden (einfacher).
  - **Datenbrücken-Abruf:** `fetchWorkloadData()` mit Fallback-Kette und
    In-Memory-Cache, Fehler werden geschluckt statt K_w/P_w zu blockieren.
    Wochenübersicht rendert sofort mit K_w/P_w, S_w kommt asynchron nach
    und wird nachträglich in dieselben Zeilen eingefügt (Ladehinweis
    verschwindet danach) – kein Warten auf Netzwerk für die Basisanzeige.
  - **Verifiziert:** Summenprüfung bestanden (Summe S_w über alle Wochen
    entspricht exakt der Summe aller `selbst`-Werte der im Semester
    vorkommenden Module – keine Stunden gehen bei der Gewichtung verloren
    oder werden doppelt erzeugt). M02 (Blockkurs) zeigt S_w jetzt über 4
    statt nur 2 Wochen verteilt, an den Semesteranfang-Randfall getestet
    (kein Überlauf vor Semesterbeginn). Fehlerfall (Datenbrücke nicht
    erreichbar) sauber getestet: K_w/P_w bleiben vollständig sichtbar,
    S_w-Zeilen fehlen einfach, Fehlerhinweis erscheint. Dark Mode/Mobile
    geprüft.
  - **Bewusst weiterhin NICHT gemacht:** S_w wird nirgends mit K_w/P_w zu
    einer Summe verrechnet – bleibt ein eigenes, unabhängiges Signal, bis
    die Verrechnungsfrage (s. u.) geklärt ist.

  **Etappe 7 umgesetzt (v3.22.0): eigener Screen mit Farbskala.** Letzte
  und größte Etappe der ursprünglichen Liste.
  - **B_w-Berechnung** (`computeBwByWeek()`): kombiniert gewichtete K_w
    (`computeContactHoursByWeek(id, true)`), S_w
    (`computeSelfStudyHoursByWeek(id, wd, true)`) und P_w
    (`computeWeightedExamHoursByWeek()`, neue Basiswerte 4h/Prüfung,
    2h/Abgabe, s. Verrechnungs-Entscheidung oben). Alle drei Funktionen
    haben jetzt einen optionalen `weighted`-Parameter (Default `false`) –
    die bestehende Wochenübersicht ruft sie weiterhin ohne diesen Parameter
    auf und bleibt dadurch komplett unverändert, nur Etappe 7 nutzt
    `true`.
  - **Farbskala:** stufenloser Grün→Amber→Rot-Verlauf (lineare
    Interpolation über drei Farbstützpunkte), relativ zum Semester
    (Min-Max-Normalisierung über alle Wochen). Ferienwochen laufen
    normal mit und erscheinen entsprechend als ruhigste (grünste) Wochen
    – wie entschieden.
  - **Screen:** eigener Vollbild-Screen (`heatmapView`), Zugang über
    „🌡️ Belastungsübersicht anzeigen" im Verwalten-Menü. Wochenraster,
    jede Zelle mit KW-Nummer, Tooltip zeigt Datum + B_w-Wert. Verlaufs-
    Handling exakt nach dem bestehenden Modal-Muster
    (`history.pushState`/`history.back()`), Android-Zurück-Button
    getestet (sowohl Klick auf „Zurück" als auch nativer Zurück-Tap).
  - **Klick auf eine Wochenzelle** springt zur Tagesansicht des jeweiligen
    Wochenmontags.
  - **Echter Bug gefunden und behoben, keine Kleinigkeit:** Erste Version
    verband den Zellklick über `closeHeatmapView()` (nutzt
    `history.back()`, asynchron) mit einem direkt anschließenden
    `openDayView()` (nutzt `history.pushState()`, synchron) – eine klare
    Race Condition, da `closeHeatmapView()` die `open`-Klasse bereits
    synchron entfernt, der zugehörige `popstate` aber erst danach feuert.
    Der Sprung zur Tagesansicht löste dadurch nie aus. Behoben durch
    einen synchronen, direkten Ablauf ohne Umweg über den Verlauf.
    **Bewusste Vereinfachung als Folge davon:** ein Zurück-Tap aus der
    per Zellklick geöffneten Tagesansicht landet wieder beim normalen
    Kalender, nicht extra nochmal bei der Heatmap – der zugehörige
    History-Eintrag der Heatmap wird beim Zellklick nicht extra
    aufgeräumt, sondern bleibt ungenutzt im Stack liegen.
  - **Datenbrücke nicht erreichbar:** eigener Hinweistext, Farben basieren
    dann nur auf K_w+P_w (S_w fällt weg) statt den ganzen Screen
    unbrauchbar zu machen.
  - **Getestet:** B_w ohne jede Aufwandsbewertung exakt identisch zu
    unweighted K_w+S_w+P_w (Kontrollrechnung), eine hoch bewertete LV
    verändert B_w gezielt nur in ihren eigenen Wochen, Zellklick springt
    zum richtigen Wochenmontag, nativer Zurück-Tap schließt sauber ohne
    Zellklick, Fehlerfall (Datenbrücke blockiert) zeigt Zusatzhinweis
    und bleibt funktionsfähig, bestehende Etappe-1-Verifikation
    (Python-Gegenrechnung) und die K_w-/S_w-Zeilen der Wochenübersicht
    nach diesen Änderungen erneut ohne Abweichung geprüft. Dark
    Mode/Mobile geprüft.

  **Feintuning nach erstem Feedback (v3.22.1):** Die ursprüngliche
  Fassung zeigte alle Wochen als undifferenzierte Zahlenreihe ohne
  erkennbaren zeitlichen Verlauf. Jetzt nach Monat des jeweiligen
  Wochenmontags gruppiert (eigene Überschrift je Monat), Zellen zeigen
  "W40" statt nur "40" – macht auch ohne Tooltip auf einen Blick klar,
  dass es sich um Wochen handelt. Eine Woche, die über einen
  Monatswechsel läuft, zählt zum Monat ihres Montags (dieselbe
  Konvention wie überall sonst in der Heatmap/Wochenübersicht).

  **Darstellung auf Balkenband umgestellt + zwei weitere Integrations-
  ebenen ergänzt (v3.23.0).** Nach weiterem Feedback: Rasterzellen durch
  ein Balkenband ersetzt (Höhe UND Farbe zeigen B_w, doppelt kodiert -
  hilft auch bei Rot-Grün-Sehschwäche), horizontal scrollbar auf
  schmalen Bildschirmen statt umzubrechen, damit das Band eine
  durchgehende Zeitachse bleibt (der eigentliche Vorteil dieser Form
  gegenüber dem Raster). **Prüfungs-/Abgabemarker als Icon (📝/📤)
  oberhalb der Balken statt Farbe** – sonst wäre eine intensive UND eine
  Prüfungswoche beide "rot" und nicht mehr unterscheidbar gewesen
  (dasselbe Problem, das schon beim Monatsraster-Chip mit Symbol statt
  Farbe gelöst wurde).

  Neue, geteilte Funktion `computeBwColorsByWeek()` (Normalisierung +
  Farbe in einem Schritt) sorgt dafür, dass alle drei folgenden Stellen
  garantiert dieselbe Skala zeigen:
  - **Voller Screen** (`renderHeatmapView()`, umgebaut auf Balken)
  - **Mini-Band im Kalender** (`renderHeatBand()`, neues `#heatBand`
    zwischen "Nächste Veranstaltung" und Suchleiste): komprimiertes
    ganzes Semester, bewusst ohne Beschriftung (reine Formensprache),
    Antippen öffnet den vollen Screen. Rendert sofort mit K_w+P_w,
    ergänzt S_w asynchron nach (gleiches Muster wie die
    Wochenübersicht). Damit ist die Belastungsübersicht nicht mehr nur
    im Verwalten-Menü versteckt, sondern ständig sichtbar.
  - **Farb-Chip in der Wochenübersicht** (`renderWeekOverviewRow()`
    erweitert): kleines farbiges Quadrat vor jeder Wochenzeile, gleiche
    Farblogik, gleiche zweistufige asynchrone Befüllung (erst nur
    K_w+P_w, dann komplett mit S_w).

  Getestet: komplette Kette Mini-Band-Klick → voller Screen → Balken-
  Klick → richtige Tagesansicht, Prüfungs-/Abgabemarker unabhängig von
  der Balkenfarbe erkennbar (synthetischer Testfall, da der echte
  Datensatz aktuell keine Prüfungen enthält), horizontales Scrollen auf
  Mobile (nicht alle 27 Wochen passen bei 420px) vs. vollständige
  Anzeige ohne Scrollen auf Desktop, alle drei Stellen zeigen
  konsistente Farben, bestehende K_w-Regression erneut ohne Abweichung
  geprüft. Dark Mode/Mobile geprüft.

  **Feintuning nach Klarstellung im Gespräch (v3.24.0):** "Wochenansicht"
  war zweideutig – Pascal meinte die Tagesansicht, nicht das Monatsraster,
  in dem das Mini-Band sitzt. Drei Anpassungen:
  - **Mini-Band auf max. 3 Wochen begrenzt** (aktuelle + 2 kommende,
    `selectUpcomingWeeks()`) statt des ganzen Semesters – bei der
    winzigen Bandgröße war ein "riesen Verlauf" ohnehin nicht lesbar,
    relevant ist ohnehin nur, was gerade ansteht. Der volle Verlauf
    bleibt dem großen Screen vorbehalten. Farbnormalisierung bleibt
    trotzdem übers ganze Semester (dieselbe Skala wie überall sonst),
    nur die Anzeige ist eingekürzt. Liegt "heute" außerhalb des
    Semesters (z. B. vor Vorlesungsbeginn), zeigt das Band die ersten
    drei Semesterwochen statt sich auszublenden.
  - **Eigener Blauton fürs Mini-Band** (`--heatband-bg`/`--heatband-tx`,
    eigene Root-Variablen mit Dark-Mode-Pendant) statt des app-weiten
    Lila-Akzents – bewusst eine eigene Farbfamilie, damit sich das Band
    visuell von den übrigen Lila-Akzenten (Notiz-Sync, Aufwandsbewertung
    …) absetzt. Betrifft nur den Rahmen/die Beschriftung des Bands,
    NICHT die Balken selbst – die bleiben in der normalen
    Grün-Amber-Rot-B_w-Skala, sonst wäre die Farbe nicht mehr
    vergleichbar mit Wochenübersicht/vollem Screen.
  - **🔥-Icon ergänzt**, vor dem "Nächste Wochen"-Label.
  - **Neuer Wochen-Chip in der Tagesansicht**: kleiner farbiger Punkt
    direkt nach der KW-Angabe im Datumskopf, zeigt die B_w-Farbe der
    angezeigten Woche. Asynchron befüllt (wartet auf die Datenbrücke),
    mit Schutz gegen schnelles Weiterblättern (`dayView.dataset.
    currentIso`-Abgleich, verhindert dass eine verspätet ankommende
    Farbe noch auf einen inzwischen anderen Tag angewendet wird).

  Getestet: Mini-Band zeigt korrekt 3 Wochen ab dem simulierten "heute"
  bzw. die ersten 3 Semesterwochen vor Vorlesungsbeginn, Tagesansicht-
  Chip zeigt korrekte Farbe und übersteht schnelles Weiterblättern ohne
  Fehlfärbung, voller Screen weiterhin unverändert bei allen 27 Wochen.
  Dark Mode/Mobile geprüft.

  **Farbskala auf 5 statt 3 Stützpunkte erweitert (v3.24.1).** Grund: reale
  Datenanalyse zeigte 10 von 27 Wochen komplett leer (Ferien) und 13 von
  27 oberhalb der Skalenmitte (t > 0,5) – da die leeren Wochen das
  Minimum nach unten ziehen, landen echte Vorlesungswochen fast immer in
  der oberen Hälfte. Mit nur einem Amber-Rot-Segment sahen dadurch fast
  alle "vollen" Wochen ähnlich rot/bedrohlich aus, obwohl sich die
  echten Werte klar unterschieden (57 bis 90 Std.) – der eigentliche
  Nutzen der Farbcodierung ging in genau diesem, am stärksten besetzten
  Bereich verloren. Neue Zwischenfarben bei t=0,25 (Gelbgrün) und t=0,75
  (Orange) sind reine RGB-Mittelwerte der bestehenden Endpunkte, keine
  neuen willkürlichen Töne - Grün/Amber/Rot an 0/0,5/1 bleiben
  unverändert, "Ruhig"/"Intensiv" behalten ihre Bedeutung. Damit
  bekommt die obere Hälfte zwei Segmente statt einem, mehr Auflösung
  genau dort, wo die Wochen sich ballen.

  **Ehrliche Einschätzung, noch nicht entschieden:** Mehr Farbstufen
  helfen bei der Unterscheidung *innerhalb* der oberen Hälfte, lösen
  aber nicht, dass diese Hälfte insgesamt weiterhin orange/rot dominiert
  wirkt – das liegt strukturell daran, dass die Skala Min/Max über *alle*
  Wochen bildet, inklusive der komplett leeren Ferienwochen, die den
  unteren Skalenrand künstlich nach unten ziehen. Eine mögliche
  Weiterentwicklung: Normalisierung robuster gegen Ausreißer machen
  (z. B. Perzentil-basiert statt reinem Min/Max, sodass einzelne
  Extremwochen nicht die ganze Skala dominieren) - würde aber die
  Bedeutung der Farben spürbar verändern und ist bewusst noch nicht
  umgesetzt, sondern nur als Option hier vermerkt.

  **Perzentil-basierte Normalisierung umgesetzt (v3.25.0).** Ersetzt das
  reine Min/Max aus der obigen Einschätzung. Zwei Bausteine in der neuen
  `computeBwNormalizedByWeek()`:
  - Wochen mit 0 Std. (Ferien) werden IMMER auf t=0 gesetzt, unabhängig
    vom Perzentil - eindeutig "ruhig", keine Differenzierung nötig.
  - Für die übrigen ("aktiven") Wochen wird das 10./90. Perzentil DIESER
    Teilmenge als Bezugsrahmen genutzt (`percentile()`, lineare
    Interpolation) statt dem Min/Max über ALLE Wochen. Ohne die
    Trennung von Baustein 1 hätte das 10. Perzentil bei ~37 % Nullwochen
    ohnehin noch mitten im Nullcluster gelegen und nichts verbessert.

  Nebenbei drei duplizierte Min/Max-Berechnungen (Belastungsübersicht,
  Mini-Band, Wochenübersicht-Chip) auf diese eine gemeinsame Funktion
  konsolidiert - vorher hatte jede Stelle ihre eigene Kopie der
  Normalisierungslogik.

  Konkrete Wirkung an den echten Semesterdaten geprüft: Wochen mit
  t > 0,5 sanken von 13 auf 10 von 27, die tatsächlich vollen Wochen
  (57–90 Std.) spannen sich jetzt über t=0,39–1,0 statt vorher
  t=0,64–1,0 – deutlich mehr Auflösung in genau dem Bereich, wo sich die
  Wochen ballen. Randfälle abgesichert: komplett leeres Semester liefert
  `lo=hi=0` ohne Fehler, genau eine aktive Woche ergibt `t=0,5` statt
  `NaN` (Division durch 0 abgefangen). Visuell bestätigt: deutlich mehr
  grüne Verschnaufpausen zwischen den intensiven Wochen statt eines
  durchgehenden Orange-Rot-Blocks Okt–Jan. Dark Mode geprüft.

  **Vorerst so belassen, geplante Überarbeitung offen (28.08.2026):**
  Farbskala/Darstellung insgesamt kann sich noch grundlegend ändern –
  eventuell auch ein komplett neuer visueller Ansatz statt nur weiterer
  Feinjustierung an der aktuellen Grün-Amber-Rot-Logik. Kein konkreter
  Plan, nur vorgemerkt für später.

  **Flammen-Icon im Mini-Band wieder entfernt (v3.25.1):** kam nicht gut
  an. War als eigenes, ggf. eingefärbtes Symbol gedacht (nicht als
  Emoji) – Ausarbeitung ebenfalls auf später verschoben, Icon bis dahin
  komplett weg statt einer Zwischenlösung.

  **Damit ist die ursprüngliche 9-Etappen-Liste vollständig abgearbeitet.**
  Offen bleibt nur noch Etappe 8 (Praxissemester, absichtlich
  zurückgestellt bis Semester 5 näherrückt) sowie alles, was sich aus der
  echten Nutzung noch ergibt (z. B. Feintuning der Multiplikator-Werte).

  **Konkreter blinder Fleck, wichtig für die spätere Umsetzung:**
  Praxisanteile werden in v1 bewusst nicht auf Wochen verteilt, solange
  keine datierten Praxiszeiten vorliegen. Real haben aber drei Module
  Praxisstunden – M11 (150h), M15 (150h) und **M19 „Praxissemester" mit
  800h in Semester 5** (30 CP, eines der CP-schwersten Module im
  gesamten Studiengang). Ohne gesonderte Behandlung würde die Heatmap
  in genau diesem Semester die dominante Belastungskomponente komplett
  ausblenden – also am wenigsten aussagen, wenn eine Wochenübersicht
  potenziell am nützlichsten wäre. Muss bei der Umsetzung explizit
  adressiert werden (z. B. eigener Hinweis oder vereinfachte
  Gesamtverteilung übers Praxissemester), nicht nur stillschweigend
  unter „Grenzen des Modells" laufen.

  **Neue geplante Erweiterung: subjektive Aufwands-/Belastungsbewertung
  (Stand 27.08.2026, noch nicht umgesetzt).** Ersetzt bzw. ergänzt das
  rein modellhafte Selbststudium (Stufe 5/6) um eine echte
  Selbsteinschätzung statt einer Formel, die nur rät. Grundsatzent-
  scheidungen bereits getroffen:
  - **Granularität – gemischt:** reguläre, wiederkehrende Kursreihen
    (gruppiert über `lvnr`, da dort bereits als stabiler Schlüssel im
    Code vorhanden) bekommen eine einzige Bewertung fürs ganze
    Semester. Blockkurse, eigene Freitext-Termine und Prüfungen/Abgaben
    werden einzeln pro Vorkommen bewertet. Die Unterscheidung
    „regulär vs. Block" nutzt dieselbe Blockkurs-Erkennungsregel wie
    Stufe 6 (Abschnitt 5.3 im Konzept: max. 2 ISO-Wochen / max.
    14 Tage / <4 Kontaktwochen) – keine doppelte Logik nötig.
  - **Zeitpunkt:** ein einziges, jederzeit editierbares Feld statt
    getrennter Vorab-/Rückblick-Felder – vorab schätzen, danach
    korrigieren, keine zwei Datenzustände.
  - **Skala:** 5 Stufen (vorgeschlagen: Sehr entspannt · Entspannt ·
    Normal · Anstrengend · Sehr anstrengend – Bezeichnungen bei
    Umsetzung final bestätigen).
  - **Geltungsbereich:** gilt auch für Prüfungen/Abgaben, obwohl die
    bereits einen objektiven Bonus (P_w) bekommen – beide Signale
    sollen nebeneinander existieren.
  - **Verrechnung – entschieden (27.08.2026), Umsetzung folgt mit
    Etappe 7:** gewichteter Multiplikator statt fester Bonus je Stufe,
    Skala `{1: 0.7, 2: 0.85, 3: 1.0 (neutral), 4: 1.3, 5: 1.6}`,
    unbewertete Termine bleiben bei 1.0. Setzt gezielt an der einzelnen
    LV/dem einzelnen Termin an (nicht an der ganzen Woche) – der Faktor
    wirkt auf deren Beitrag zu K_w/S_w, *bevor* pro Woche summiert wird.
    Damit beeinflusst eine hoch bewertete LV nicht auch andere,
    unbewertete Module in derselben Woche. P_w wird ebenfalls gewichtet
    (eine gefürchtete Klausur zählt dann intern z. B. als 1,6 statt 1),
    obwohl P_w aktuell nur ein Zähler ist.

    **Wichtige Abgrenzung:** Diese Gewichtung verändert **nicht** die
    bestehenden K_w-/S_w-/P_w-Zeilen in der Wochenübersicht – die
    bleiben bewusst reine, ungewichtete Zahlen, genau wie bisher. Der
    Multiplikator wird ausschließlich innerhalb der B_w-Berechnung für
    die Farbskala angewendet.

    **Umgesetzt mit Etappe 7 (v3.22.0)** – s. dortiger Abschnitt.
  - **Technisches Schlüsselschema:** `journal:effort:lvnr:<lvnr>` für
    Kursreihen, `journal:effort:event:<eventKey>` für Einzelbewertungen –
    im eigenen `journal:`-Namensraum statt eines weiteren losen Präfixes,
    s. Abschnitt "Langfristige Ausrichtung" unten.
  - Reihenfolge in den Umsetzungsetappen: vor Stufe 5/6 einordnen –
    wenn die manuelle Bewertung einen Großteil des Nutzens liefert,
    wird die komplexe Selbststudium-Modellierung eventuell überflüssig.

  **Eingabemechanismus umgesetzt (v3.17.0, Namensraum korrigiert in
  v3.17.1):** `isBlockLvnr()` klassifiziert jede LV-Nummer nach derselben
  Regel wie das Heatmap-Konzept (Abschnitt 5.3). `effortScopeFor(ev)`
  entscheidet daraus automatisch, ob eine Bewertung für die ganze
  Kursreihe (`journal:effort:lvnr:`) oder nur für den einzelnen Termin
  (`journal:effort:event:`) gilt – Prüfungen/Abgaben (meist ohne `lvnr`)
  und eigene Termine fallen dabei automatisch auf „einzeln", ohne
  Sonderfall-Code. 5-stufige Auswahl im Termin-Detail-Modal unterhalb der
  Notiz, erneuter Klick auf die aktive Stufe setzt zurück (kein Pflichtfeld
  bei ~120 Terminen im Semester). Fließt in den bestehenden Gist-Sync mit
  ein, landet also wie Notizen auf allen Geräten. Getestet: Blockkurs (M02)
  vs. reguläre LV (M06) korrekt klassifiziert, Bewertung wird innerhalb
  einer Kursreihe zwischen verschiedenen Terminen geteilt, Blockkurs-
  Termine bleiben untereinander unabhängig, Toggle-Reset funktioniert,
  Dark Mode/Mobile geprüft.

  **Sichtbarkeit in Monatsraster/Tagesansicht ergänzt (v3.19.0):** Ab
  Stufe 4/5 ("Anstrengend"/"Sehr anstrengend") erscheint ein kleiner
  Punkt direkt am Termin – Monatsraster-Chip (vor dem Titel, analog zum
  ⚠️-Konflikt-Icon, sonst von der Ellipsis-Kürzung mit abgeschnitten) und
  Tagesansicht. Bewusst in der Akzentfarbe (`--accent`, dieselbe wie die
  aktive Stufe im Bewertungs-Widget) statt Rot/Orange, damit es sich
  nicht mit den bereits vergebenen Prüfungs-/Abgabe-Akzenten vermischt.
  Neue Hilfsfunktion `hasHighEffort(ev)` prüft direkt beide möglichen
  Schlüssel in `localStorage`, ohne `effortScopeFor()`/`isBlockLvnr()`
  erneut aufzurufen (würde bei jedem Chip im Monatsraster unnötig oft neu
  klassifizieren). Beim Testen nebenbei bestätigt, dass die lvnr-basierte
  Gruppierung wie gedacht funktioniert – M06 hat real zwei unterschiedliche
  `lvnr` unter demselben Modulcode (zwei Bausteine), eine Bewertung gilt
  entsprechend nur für die tatsächlich gemeinsame Kursreihe, nicht für
  das ganze Modul.

  **Badge-Redesign umgesetzt (v3.20.0):** Wie vorgemerkt auf das
  Modulverzeichnis-Muster umgestellt. Tagesansicht bekommt das echte
  `.mv-card-badge`-Pendant (`day-event-effort-badge`: 20px, `--surface`-
  Kreis mit Border+Shadow, `position:absolute; top:-7px; right:-7px`,
  `.day-event` als Anker) – zeigt jetzt sogar die konkrete Stufe (4 oder
  5) als Zahl statt nur eines Punkts, dank neuer `getEffortLevel(ev)`
  (liefert den rohen Wert, `hasHighEffort()` baut jetzt darauf auf).
  Monatsraster-Chips bekamen wie angekündigt eine angepasste, kleinere
  Variante statt der 1:1-Übernahme: ein 5px-Punkt, der INNERHALB des
  bestehenden 6px-Innenabstands sitzt (`top:4px; right:4px`, kein
  negativer Offset) – bei nur 2px Abstand zwischen Chips hätte ein
  über den Rand hinausragendes Badge den jeweils nächsten Chip
  überlappt. Da beide Badges `position:absolute` sind, spielt die
  Reihenfolge im innerHTML (anders als beim ⚠️-Konflikt-Icon) keine
  Rolle mehr für die Ellipsis-Kürzung. Getestet: keine Kollision bei
  zwei direkt benachbarten bewerteten Chips, korrektes Zusammenspiel
  mit dem Konflikt-Icon (beide gleichzeitig sichtbar, keine
  Überlappung), Dark Mode/Mobile geprüft.

  **Verrechnung konzeptionell entschieden, Umsetzung steht mit Etappe 7
  aus** (s. o., Multiplikator-Skala 0.7–1.6) – aktuell wird nur erfasst,
  noch nicht ausgewertet.
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
  **Weiterer Nachtrag (v3.8.0):** Zahnrad-Icon und Text komplett entfernt
  – Button zeigt jetzt auf allen Bildschirmgrößen einheitlich nur noch
  "⋮", nicht mehr nur auf Mobile.
- **Homescreen-Widget (Android)** – "Nächster Termin" direkt auf dem
  Startbildschirm. Als PWA technisch nur eingeschränkt möglich (native
  Android-Widgets sind Trusted-Web-Activity-/Bubblewrap-Gebiet, nicht
  mehr "reines" PWA) – müsste vorab geklärt werden, ob das über eine
  gewöhnliche PWA-Installation überhaupt erreichbar ist oder einen
  größeren Umbau der App-Verpackung erfordert.
- **Frei-Zeiten-Radar** – echte freie Blöcke automatisch erkennen und
  hervorheben ("3+ Stunden am Stück frei"), um Schichten/Arzttermine/
  Verabredungen um die Uni-Zeiten herum zu planen.
- **Wochenübersicht als dritte Ansicht** 🎯 **Priorität (28.08.2026,
  bald angehen)** – kompakte 7-Tage-Streifenansicht
  zwischen Monat und Einzeltag.
  **Erneutes, verstärktes Interesse (28.08.2026):** Im Zuge der
  Belastungs-Heatmap-Arbeit als zunehmend sinnvoll empfunden – noch
  nicht ausgearbeitet, aber ein konkreter Anwendungsfall steht schon
  fest: **alle Verlinkungen aus der Heatmap (Balkenband, Mini-Band)
  landen aktuell in der Tagesansicht beim jeweiligen Wochenmontag** –
  das wird als unpassend empfunden und sollte stattdessen zu dieser
  Wochenansicht springen, sobald sie existiert (technisch nur eine
  Änderung der Zielfunktion im Klick-Handler, `openDayView(monday)` →
  `openWeekView(monday)` o. ä., kein struktureller Umbau der Heatmap
  nötig). Wird bei Gelegenheit separat ausgearbeitet, kein aktueller
  Umsetzungsauftrag.
- **Modulverzeichnis-Fortschritt sichtbar** – CP-Fortschrittsanzeige aus
  dem Modulverzeichnis als kleiner Indikator im Kalender mitspiegeln.
- **"Nächstes Semester"-Assistent** – geführter Ablauf für
  SEMESTERS-Eintrag, Terminübernahme und Raumdaten beim Semesterwechsel.
- **Wiederkehrende eigene Termine** 🎯 **Priorität (28.08.2026, bald
  angehen)** – "wiederholt sich wöchentlich"-
  Option für private Fixpunkte statt Einzelanlage.
  **✅ Umgesetzt (v3.26.0):** Checkbox im bestehenden "Eigenen Termin
  hinzufügen"-Formular, bewusst simpel gehalten – keine neue
  Datenstruktur, beim Speichern werden einfach mehrere normale
  `personalEvent:`-Einträge (einer pro Woche bis Semesterende) mit
  gemeinsamer `seriesId` angelegt statt eines "virtuellen" Wiederholungs-
  Mechanismus. Jedes Vorkommen bleibt dadurch ein ganz normaler, für sich
  eigenständiger Termin – kein Sonderfall an anderer Stelle im Code
  nötig. Löschen fragt bei Serienterminen zusätzlich nach: "diesen und
  alle künftigen" oder "nur diesen einen" (zwei verkettete
  Bestätigungsdialoge, vergangene Vorkommen bleiben bei Serienlöschung
  immer erhalten).
  **Bug beim Testen gefunden und behoben:** das Löschen "ab Datum X"
  nutzte zunächst eine rückwärtslaufende Index-Schleife direkt über
  `localStorage`, die währenddessen Einträge entfernte – dabei wurde
  nachweislich vereinzelt ein Eintrag übersprungen (Index-Verschiebung
  während der Iteration ist bei `localStorage` nicht robust genug, auch
  rückwärts nicht). Behoben durch sauberes Trennen: erst alle zu
  löschenden Schlüssel sammeln, danach erst entfernen.
  Getestet: 26 Wochentermine korrekt bis Semesterende erzeugt (alle am
  richtigen Wochentag), "Serie ab Datum X löschen" entfernt exakt die
  richtige Teilmenge (mit dem oben beschriebenen Bugfix verifiziert),
  "nur diesen einen löschen" lässt den Rest der Serie unangetastet,
  einmalige (nicht wiederkehrende) Termine funktionieren unverändert wie
  zuvor (Regression geprüft).

## 💭 Abstrakt — Vision, aber trotzdem nützlich

- **Workload-Transparenz** – eine einfache Statistik ("X Kontaktstunden
  diese Woche"), um die eigene Auslastung über das Semester hinweg im
  Blick zu behalten.
  **Faktisch abgedeckt (Stand 28.08.2026):** Genau das zeigt die
  Wochenübersicht (Beta) im Verwalten-Menü inzwischen direkt an
  (`computeContactHoursByWeek()`, seit v3.16.0), plus die volle
  Belastungsübersicht mit Farbcodierung obendrauf – deutlich mehr, als
  hier ursprünglich vorgesehen war. Bleibt trotzdem als eigener Punkt
  stehen statt gestrichen zu werden, damit die Herkunft der Idee
  nachvollziehbar bleibt.
- **Semester-Rückblick** – eine kleine, automatisch erzeugte
  Zusammenfassung am Semesterende ("X Termine, Y Prüfungen absolviert")
  als kleiner persönlicher Abschluss. Ließe sich komplett aus den
  ohnehin schon vorhandenen Daten in `EVENTS_BY_SEMESTER` berechnen
  (Anzahl Termine, Prüfungen, Abgaben je Semester) – kein neuer
  Datenbedarf. Denkbar z. B. als kleine Karte, die erscheint, sobald man
  im Dropdown auf ein bereits vergangenes Semester wechselt.
- **Mehrsemestriger Studienverlauf** – der geplante Semester-Rückblick
  ausgebaut zu einer übergreifenden Zeitleiste über das gesamte Studium,
  sobald mehrere Semester vorliegen. Baut auf der bereits vorhandenen
  `SEMESTERS`-Struktur auf (mehrere Semester sind technisch schon
  möglich, aktuell aber nur eins mit echten Daten befüllt) – sinnvoll
  umsetzbar vermutlich erst, sobald mindestens ein zweites Semester
  (SoSe 2027) tatsächlich eingetragen ist.
  **Nicht durch die Belastungs-Heatmap abgedeckt:** deren Farbskala ist
  bewusst nur relativ zum jeweils aktuellen Semester normalisiert
  (eigener Hinweistext in der Übersicht: "nicht zwischen Semestern
  vergleichbar") – ein Semestervergleich bliebe hier explizit offen.
- **Vorlage für andere Studierende** ❌ **Verworfen (28.08.2026)** –
  Anleitung, wie andere Studierende sich diesen Kalender für ihre eigene
  Modul-/Parallelgruppen-Kombination anpassen könnten.

---

## 🧭 Langfristige Ausrichtung

**Diskutiert am 27.08.2026, im Zuge der Belastungs-Heatmap-Planung.**

Beobachtung: Mit Funktionen wie der Wochenübersicht und der geplanten
subjektiven Aufwandsbewertung bewegt sich das Projekt spürbar weg vom
klassischen "Kalender zeigt an, wann was stattfindet" hin zu etwas
Näherem an einem Studienplaner/Journal. Zahlen dazu: `index.html` ist von
~4.750 Zeilen (9. August) auf ~5.085 Zeilen (27. August) gewachsen, über
viele kleine, für sich sinnvolle Features.

**Entscheidung: Anspruch/Selbstverständnis darf sich erweitern (Kalender
als eine Funktion eines umfassenderen Studienplaners), der Code wird
aber bewusst NICHT jetzt strukturell aufgeteilt.** Ausschlaggebend:
Pascal will sich funktional nicht von den Terminen lösen – auch die
Heatmap und die Aufwandsbewertung hängen weiterhin direkt an
Terminen/Wochen. Eine vollständige Trennung (eigene Dateien, eigene
Datenschicht, ggf. Build-Schritt) würde damit aktuell mehr zusätzlichen
Aufwand bedeuten als sie hilft, und stünde im Widerspruch zum bewussten
Grundprinzip des Projekts (kein Build-Schritt, niedrige Einstiegshürde
für Änderungen).

Zwei Festlegungen für den Umgang damit, die schon jetzt gelten:

- **Datennamensraum sauber halten:** Neue, nicht rein kalenderbezogene
  Daten (z. B. die Aufwandsbewertung) bekommen bewusst einen eigenen
  `journal:`-Namensraum in `localStorage` (z. B. `journal:effort:lvnr:…`)
  statt einfach in die bestehenden `note:`/`personalEvent:`/`dayNote:`-
  Präfixe hineinzuwachsen. **Umgesetzt ab v3.17.1** – bei der ersten
  Version (v3.17.0) noch mit losen `effortByLvnr:`/`effortByEvent:`-
  Präfixen gebaut und dann direkt korrigiert, inkl. einmaliger,
  automatischer Migration bereits gesetzter Werte. Vorteil in der Praxis
  bestätigt: die drei Gist-Sync-Filterstellen brauchen für künftige
  Journal-Daten nicht mehr angefasst zu werden, `journal:` deckt das
  automatisch ab. Kostet beim Bauen nichts zusätzlich, hält eine spätere
  Trennung aber offen, falls sie doch mal nötig wird.
- **Auslöser-Kriterium für einen echten Split, statt zu raten:** Eine
  strukturelle Trennung wird erst dann neu bewertet, wenn ein Feature
  ansteht, das **keinen Bezug mehr zu einem Kalendertermin/-datum** hat
  (z. B. freies Journaling, Ziele-Tracking losgelöst vom Semesterplan).
  Solange alles Neue an Terminen/Wochen hängt – wie aktuell geplant –
  bleibt es im bestehenden Kalender.

**Vorhandenes Muster für den Fall, dass der Auslöser doch mal eintritt:**
Das Modulverzeichnis wurde genau aus diesem Grund als eigenständiges
Projekt ausgelagert, statt es in den Kalender zu integrieren – dasselbe
Muster (eigenständige, verlinkte statische Seite statt ein Monolith)
war sogar schon in der allerersten Ideensammlung vom 4. August als
abstrakter Punkt vermerkt: "Gemeinsamer Einstiegspunkt (falls mal eine
dritte Hauptdomain gewünscht ist)". Kein neues Konzept nötig, falls es
später doch so weit kommt.
