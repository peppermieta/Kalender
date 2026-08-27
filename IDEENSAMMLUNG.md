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
- **Laufende Semester-Fortschrittsanzeige** – zeigt während des
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
- **Tag/Woche als Bild teilen** – über die Web-Share-API den
  Tages-/Wochenplan als Bild verschicken. Technisch am ehesten über ein
  Canvas-Rendering des jeweiligen Ausschnitts lösbar (ähnlich wie beim
  Drucken, nur als Bilddatei statt PDF) und `navigator.share()` mit
  Datei-Anhang; auf Desktop ohne Share-API bräuchte es einen Fallback
  (z. B. Bild-Download).
- **"Was hab ich verpasst?"** – kurze Zusammenfassung der Lücke, wenn man
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
- **Wochenübersicht als dritte Ansicht** – kompakte 7-Tage-Streifenansicht
  zwischen Monat und Einzeltag.
- **Modulverzeichnis-Fortschritt sichtbar** – CP-Fortschrittsanzeige aus
  dem Modulverzeichnis als kleiner Indikator im Kalender mitspiegeln.
- **"Nächstes Semester"-Assistent** – geführter Ablauf für
  SEMESTERS-Eintrag, Terminübernahme und Raumdaten beim Semesterwechsel.
- **Wiederkehrende eigene Termine** – "wiederholt sich wöchentlich"-
  Option für private Fixpunkte statt Einzelanlage.

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
- **Mehrsemestriger Studienverlauf** – der geplante Semester-Rückblick
  ausgebaut zu einer übergreifenden Zeitleiste über das gesamte Studium,
  sobald mehrere Semester vorliegen. Baut auf der bereits vorhandenen
  `SEMESTERS`-Struktur auf (mehrere Semester sind technisch schon
  möglich, aktuell aber nur eins mit echten Daten befüllt) – sinnvoll
  umsetzbar vermutlich erst, sobald mindestens ein zweites Semester
  (SoSe 2027) tatsächlich eingetragen ist.
- **Vorlage für andere Studierende** – Anleitung, wie andere Studierende
  sich diesen Kalender für ihre eigene Modul-/Parallelgruppen-Kombination
  anpassen könnten.
