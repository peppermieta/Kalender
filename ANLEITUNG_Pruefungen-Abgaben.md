# Anleitung: Prüfungs- und Abgabetermine eintragen

> Diese Anleitung beschreibt, wo und wie Prüfungs- und Abgabetermine im
> Kalender hinterlegt werden. Die Datenpflege erfolgt bewusst weiterhin
> ausschließlich über den Quellcode (kein Eingabeformular im Kalender selbst) –
> diese Anleitung dient als Nachschlagehilfe, welche Angaben dafür nötig sind.

## Kurzfassung: Was für einen neuen Termin gebraucht wird

| Angabe | Prüfung | Abgabe |
|---|---|---|
| Datum | ✅ Pflicht | ✅ Pflicht |
| Uhrzeit | meist ja | oft nein (dann "Ganztägig") |
| Modul | ✅ Pflicht | ✅ Pflicht |
| Titel/Bezeichnung | ✅ Pflicht | ✅ Pflicht |
| Raum | falls bekannt | meist nicht zutreffend |

---

## 1. Wo die Daten stehen

Datei: **`index.html`**, im Bereich `<script>`, Konstante **`EVENTS`**
(aktuell ab Zeile 713). Das ist eine Liste (Array) – jeder Termin im Kalender
ist darin ein einzelner Eintrag (Objekt) in geschweiften Klammern `{ ... }`.

Ganz am Ende dieser Liste, kurz vor der schließenden Klammer `];`, stehen
bereits vorhandene Termine nach Modul bzw. Anlass gruppiert, jeweils mit
einer kurzen Kommentarzeile (`// M3 – Übungen …`, `// Zusatzangebot`) darüber.
Neue Prüfungs-/Abgabetermine kommen als neue Gruppe an dieser Stelle dazu,
z. B. unter einer eigenen Überschrift `// Prüfungen & Abgaben`.

Die Reihenfolge innerhalb der Liste spielt keine Rolle – der Kalender
sortiert alle Termine beim Laden automatisch nach Datum und Uhrzeit.

## 2. Aufbau eines Eintrags

### Prüfungstermin (mit fester Uhrzeit)

```js
{date:"2027-02-10", start:"14:00", end:"16:00", modul:"M08", lvnr:null, pg:null, title:"Klausur: Rechtliche Grundlagen und Aufträge Sozialer Arbeit", lehrperson:null, type:"pruefung", raum:"H.101"}
```

### Abgabetermin (ohne feste Uhrzeit)

```js
{date:"2027-01-15", start:null, end:null, modul:"M07", lvnr:null, pg:null, title:"Abgabe Hausarbeit – Modul 07", lehrperson:null, type:"abgabe"}
```

## 3. Die einzelnen Felder erklärt

| Feld | Pflicht? | Bedeutung |
|---|---|---|
| `date` | ✅ immer | Datum im Format `"JJJJ-MM-TT"`, z. B. `"2027-02-10"` |
| `start` / `end` | nur bei fester Uhrzeit | Format `"HH:MM"` (24h). Ohne feste Uhrzeit beide auf `null` setzen – erscheint dann als "Ganztägig" |
| `modul` | ✅ immer | Modulcode wie im Kalender verwendet, z. B. `"M07"` – siehe Liste unten |
| `title` | ✅ immer | Freitext, wird als Titel des Termins angezeigt |
| `type` | ✅ für diese Anleitung | `"pruefung"` oder `"abgabe"` – steuert Icon (📝/📤) und die farbige Kennzeichnung |
| `raum` | optional | Nur sinnvoll bei Prüfungen mit festem Raum, z. B. `"H.101"`. Weglassen oder `null`, wenn nicht bekannt/nicht zutreffend |
| `lvnr`, `pg`, `lehrperson` | optional | Bei Prüfungen/Abgaben meist `null` – die entsprechenden Zeilen werden im Termin-Detail automatisch ausgeblendet, wenn kein Wert vorhanden ist |

**Gültige Modulcodes** (Stand aktueller Kalender): `M02`, `M06`, `M07`,
`M08`, `M09`, `M10`, sowie `ZA` für Zusatzangebote. Der Modulcode muss exakt
einem dieser Werte entsprechen, damit Farbe und Verlinkung zum
Modulverzeichnis korrekt funktionieren.

## 4. Wie es sich auswirkt

- **Mit Uhrzeit**: erscheint im Monatsraster und in der Tagesansicht wie ein
  normaler Termin, zusätzlich mit Icon vor dem Titel und einem farbigen
  Rand (rot bei Prüfung, orange bei Abgabe). Die Modulfarbe bleibt als
  Hintergrund erhalten.
- **Ohne Uhrzeit** (`start`/`end` = `null`): erscheint als "Ganztägig" ganz
  oben im jeweiligen Tag, noch vor den Terminen mit fester Uhrzeit.
- Im Termin-Detail (Klick auf den Termin) erscheint zusätzlich ein eigenes
  Badge "📝 Prüfungstermin" bzw. "📤 Abgabetermin" neben dem Modul-Badge.

## 5. So läuft die Aktualisierung praktisch ab

1. Neuen Termin (Felder wie oben) im Chat mitteilen: Datum, Prüfung oder
   Abgabe, Uhrzeit (falls vorhanden), Modul, Titel, Raum (falls bekannt).
2. Der Eintrag wird in `EVENTS` ergänzt, lokal getestet und dann committet
   und gepusht (inkl. Erhöhung der `CACHE_VERSION` im Service Worker, damit
   die Änderung auch offline-gecachte Geräte erreicht).
3. Kein eigenes Eingabeformular im Kalender – die Pflege bleibt bewusst beim
   Quellcode, wie besprochen.
