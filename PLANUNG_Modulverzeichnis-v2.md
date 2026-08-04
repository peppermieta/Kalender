# Planung: Modulverzeichnis v2 (öffentlich, geteilt)

**Status:** Geplant, noch nicht begonnen. PWA Phase 1 des Kalenders ist mit Version 2.0.0 abgeschlossen; Phase 2 (Push-Benachrichtigungen über ntfy.sh) ist zurückgestellt. Jetzt Fokus auf die Detailplanung dieses Projekts.

**Ziel:** Aus dem aktuellen `module.html` (Teil des privaten Kalender-Repos, ohne Modulverantwortliche, feste Vorauswahl 2. Semester) wird ein eigenständiges, mit anderen Studierenden teilbares Nachschlagewerk für den kompletten Studiengang.

---

## 1. Infrastruktur

- **Eigenes Repository nötig.** GitHub Pages erlaubt nur eine Custom Domain pro Repo – da `kalender.peppermięta.de` bereits vom privaten Kalender-Repo belegt ist, braucht das Modulverzeichnis ein zweites, eigenständiges Repo mit eigener Subdomain (z. B. `module.peppermięta.de`, Name final abzustimmen).
- **Kein Passwortschutz** – bewusst frei zugänglich, da für andere Studierende gedacht.
- Ablauf zur Einrichtung entspricht dem bereits bekannten Muster (Subdomain bei Strato anlegen → CNAME → GitHub-Pages-Custom-Domain-Eintrag → HTTPS erzwingen), nur eben für ein zweites Repo.

## 2. Repository- & Token-Setup

**Repo-Sichtbarkeit:** Empfehlung **public** – der Inhalt ist ohnehin eine öffentliche Übersicht (keine sensiblen Daten), und public hält alles im kostenlosen GitHub-Plan unkompliziert (private Repos + GitHub Pages können je nach Plan Einschränkungen haben).

**Repo-Struktur** (analog zum Kalender-Repo):
- `index.html` – die eigentliche Seite
- `README.md`, `CHANGELOG.md`
- `CNAME` – für die eigene Domain
- `icons/` – Favicon/App-Icons, ggf. QR-Code-Grafik
- Optional: offene Lizenz (z. B. MIT), da andere Studierende den Code ggf. übernehmen/anpassen möchten – passt zum "geteilten" Charakter des Projekts

**Token: getrennt oder gemeinsam?**
- **Getrennte Fine-grained-Tokens** pro Repo → maximale Isolation, geht eins verloren/wird kompromittiert, betrifft nur ein Projekt
- **Ein Token für beide** → beim Erstellen eines Fine-grained-Tokens lassen sich mehrere konkrete Repos auswählen (nicht "alle Repos"). Weniger Verwaltungsaufwand, etwas größerer Radius im Ernstfall
- **Entscheidung noch offen**, beides ist unproblematisch umsetzbar

**Neue Berechtigung empfohlen:** Zusätzlich zu `Contents: Read and write` diesmal auch **`Pages: Read and write`** mit ins Token aufnehmen. Grund: Beim Kalender musste "Enforce HTTPS" mangels Berechtigung manuell in den GitHub-Einstellungen angeklickt werden – mit dieser zusätzlichen Berechtigung ließe sich das beim Modulverzeichnis von Anfang an vollständig automatisiert erledigen, ohne manuellen Zwischenschritt.

## 3. Funktionale Änderungen gegenüber der aktuellen Version

| Aktuell (`module.html` im Kalender-Repo) | Geplant (v2, eigenständig) |
|---|---|
| Feste Vorauswahl: 2. Semester = "aktuell" | **Semesterauswahl** (Dropdown/Auswahl 1.–7.), Färbung "abgeschlossen/aktuell/kommend" berechnet sich dynamisch aus der Auswahl |
| Nur 6 Module farblich hervorgehoben (die des 2. Semesters) | **Alle 28 Module farbig**, nach Studienbereich gruppiert (siehe Abschnitt 4) |
| Keine Modulverantwortlichen | **Modulverantwortliche ergänzt**, aus dem Handbuch nachzutragen für alle 28 Module (aktuell nur für M01, M02, M06–M10, M16, M19, M21 bereits bekannt aus früherer Recherche) |
| – | **QR-Code** zur eigenen Adresse, sobald die Subdomain steht |

## 4. Farbschema: nach Studienbereich statt pro Modul

Die 7 offiziellen Studienbereiche aus dem Modulhandbuch werden je einer Farbe zugeordnet. Da einige der 6 bisherigen Kalenderfarben in denselben Studienbereich fallen (z. B. M07 *und* M08 beide in "Bezugsdisziplinen"), müssen sich diese Module dort eine Farbe teilen – die andere bisherige Farbe wird dafür einem noch unbelegten Bereich zugewiesen. So bleiben möglichst viele der bekannten Farben erhalten:

| # | Studienbereich | Enthält Module | Farbe | Herkunft |
|---|---|---|---|---|
| 1 | Grundlagen der Sozialen Arbeit als Disziplin und Profession | 03, 05 | Smaragdgrün (`#2E8B57`-Familie) | bisher M09 – wird hier neu zugeordnet |
| 2 | Zielgruppen und Arbeitsfelder der Sozialen Arbeit | 11, 13, 22 | Lila (`#5B3FC8`-Familie) | bisher M07 – wird hier neu zugeordnet |
| 3 | Gesellschaftliche Rahmenbedingungen | 06, 18, 27 | Petrol/Grün (`#1A8C70`-Familie) | bisher M06 – bleibt |
| 4 | Bezugsdisziplinen | 07, 08, 17, 23, 24, 26 | Gold (`#C48A00`-Familie) | bisher M08 – bleibt (M07 zieht zu Bereich 2 um) |
| 5 | Schlüsselqualifikationen | 01, 02, 04, 09, 14 | Blau (`#2050C8`-Familie) | bisher M02 – bleibt (M09 zieht zu Bereich 1 um) |
| 6 | Sozialarbeiterische Handlungskompetenzen | 12, 15, 16, 19, 20, 25 | **Neu:** Terrakotta/Orange (Vorschlag `#CC6B3F`-Familie) | komplett neue Farbe |
| 7 | Reflexion und Evaluation der Sozialen Arbeit | 10, 21 | Pink (`#C41A50`-Familie) | bisher M10 – bleibt |
| – | Ohne Zuordnung | 28 (Bachelor-Thesis) | Neutrales Grau (`#777775`-Familie, wie bisher ZA) | bisher ZA – passender Sonderfall, da 28 ebenfalls ein "Sonderfall ohne Zuordnung" ist |

Jede Farbe wird wie bisher im gewohnten Vierer-Set definiert (Hintergrund/Text/Rahmen/Punkt), passend zur bestehenden Formel (pastelliger Hintergrund, dunkler Text, mittlerer Rahmenton).

**Zu klären bei Umsetzung:** Exakten Hex-Wert für die neue Terrakotta-Farbe final festlegen (Vorschlag oben ist ein erster Entwurf, kein endgültiger Wert).

## 5. Zusätzliche Informationen pro Modul

Alle folgenden Punkte sollen ergänzt werden (vollständiger Umfang, wie besprochen):

- **Studienbereich** als sichtbares Label/Filter pro Modul (siehe Farbschema oben)
- **Workload-Aufteilung** – Kontaktzeit / Selbststudium / Praxis in Stunden (steht im Handbuch bereits einzeln pro Modul, aktuell zeigen wir nur SWS/CP gesamt)
- **Verwendbarkeit in anderen Studiengängen** – z. B. "BA ISA 01", "BA DW 01" (steht im Handbuch pro Modul)
- **Modulverantwortliche** (siehe Abschnitt 3)

## 6. Seitenweite Ergänzungen

- **Link zum offiziellen PDF-Modulhandbuch** – als Referenz/Beleg für die Originalquelle
- **Stand-Hinweis** – z. B. "Basierend auf Modulhandbuch B.A. Soziale Arbeit, Stand 03/2026" – wichtig für Transparenz, da andere sich darauf verlassen
- **Disclaimer** – sinngemäß: "Inoffizielle, selbst erstellte Übersicht ohne Rechtsverbindlichkeit – bei Widersprüchen gilt das offizielle Modulhandbuch"
- **Kontakt für Korrekturen/Feedback** – E-Mail-Link, soll später `info@peppermieta.de` werden (siehe Abschnitt 8 zur offenen Frage, wohin die Weiterleitung zeigen soll)
- **QR-Code** zur eigenen Adresse (siehe Abschnitt 1)

## 7. Loslösung vom Kalender-Repo (Migrationsplan)

So soll der Umzug ablaufen, ohne dass die laufende Kalender-Seite währenddessen beeinträchtigt wird:

1. **v2 zuerst komplett neu aufbauen** im neuen Repo, unter der neuen Domain – in Ruhe fertigstellen und testen. Die alte `module.html` im Kalender-Repo bleibt währenddessen unverändert live.
2. **Erst danach** den Link im Kalender-Header ("Modulverzeichnis →") von `module.html` auf die neue, externe Domain umbiegen.
3. Die alte `module.html` im Kalender-Repo: entweder vollständig entfernen, oder durch eine kurze Weiterleitungs-Notiz ersetzen ("Umgezogen, hier geht's weiter → …"). Da der Kalender passwortgeschützt und nicht öffentlich verlinkt ist, ist der Kreis der Personen mit einem alten Lesezeichen ohnehin klein – eine Weiterleitung ist eher Komfort als Notwendigkeit.

**Wichtig:** v1 (im Kalender) und v2 (eigenständig) werden sich inhaltlich unterscheiden (v2 hat mehr Module, Modulverantwortliche, andere Farblogik) – es handelt sich also weniger um ein "Verschieben" bestehender Inhalte als um "neu bauen, dann Verweis umbiegen".

## 8. Abhängigkeiten zu anderen offenen Punkten

- **E-Mail-Ziel für `info@peppermieta.de` noch offen:** Hotmail (wie ursprünglich geplant) oder doch die Uni-E-Mail? Uni-Mail passt inhaltlich besser (akademisches Feedback-Postfach), hält privat/akademisch getrennt – **muss aber vorher mit der EH-IT geklärt werden**, da manche Hochschul-Mailsysteme automatische Weiterleitungen an externe Adressen aus Sicherheits-/Compliance-Gründen blockieren. Hotmail bleibt die unkompliziertere Alternative ohne dieses Risiko.
- Die Kontakt-E-Mail setzt außerdem voraus, dass die Domain bei Strato freigegeben ist und die E-Mail-Weiterleitung eingerichtet wurde (siehe frühere Planung dazu) – diese Abhängigkeit im Blick behalten.
- Sobald die Haupt-Subdomain (`peppermięta.de`) verfügbar ist, auch die neue Modulverzeichnis-Subdomain mit einrichten.

## 9. Noch zu erledigen bei Umsetzungsbeginn

- [ ] Neues GitHub-Repo anlegen (public), Name + Lizenzfrage klären
- [ ] Entscheidung: getrennte Tokens oder ein gemeinsames Token für beide Repos
- [ ] Neuen Token mit `Contents: Read and write` **und** `Pages: Read and write` erstellen
- [ ] Subdomain-Namen final festlegen
- [ ] Modulverantwortliche für alle 28 Module aus dem Handbuch nachtragen (bisher nur Teilmenge bekannt)
- [ ] Workload-Aufteilung (Kontaktzeit/Selbststudium/Praxis) für alle 28 Module nachtragen
- [ ] Verwendbarkeit in anderen Studiengängen für alle 28 Module nachtragen
- [ ] Terrakotta-Farbe (Studienbereich 6) final festlegen
- [ ] Semesterauswahl-Logik (JS) entwickeln – aktuell ist `module.html` reines HTML/CSS ohne JavaScript, das ändert sich damit
- [ ] Disclaimer- und Kontakt-Text final formulieren
- [ ] QR-Code generieren, sobald Subdomain live ist
- [ ] E-Mail-Weiterleitungsziel entscheiden (Hotmail vs. Uni-Mail, siehe Abschnitt 8)
- [ ] Nach Fertigstellung: Link im Kalender-Header umbiegen, alte `module.html` entfernen/durch Weiterleitungs-Hinweis ersetzen

---

*Diese Planung ist bei künftigen Arbeiten am Kalender-Projekt zu berücksichtigen (z. B. keine Änderungen am privaten `module.html` vornehmen, die dieser Migration im Weg stehen würden). Erstellt am 3. August 2026, ergänzt am 4. August 2026.*
