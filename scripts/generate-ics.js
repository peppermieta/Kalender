#!/usr/bin/env node
/**
 * Generiert die abonnierbare ICS-Kalenderdatei aus den EVENTS_BY_SEMESTER-Daten
 * in index.html – enthält bewusst die Termine ALLER Semester (s. u.).
 *
 * WICHTIG: Der Dateiname (FEED_FILENAME) ist absichtlich ein zufälliger, nicht
 * erratbarer Token statt "kalender.ics" – die ICS-Datei liegt technisch bedingt
 * NICHT hinter dem Passwortschutz der Seite (Kalender-Apps können kein
 * JavaScript/Passwort ausführen, wenn sie die Datei automatisch abrufen).
 * Der zufällige Dateiname ist der einzige Schutz vor unbefugtem Zugriff –
 * daher NIEMALS öffentlich verlinken oder den Dateinamen ändern (sonst bricht
 * das Abo in Google/Apple Kalender).
 *
 * Ausführen mit:  node scripts/generate-ics.js
 * Danach die erzeugte Datei ganz normal committen und pushen.
 */
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

const FEED_FILENAME = 'feed-7b77b19da1cb.ics'; // NICHT ändern, sonst bricht jedes bestehende Abo!
const DOMAIN = 'kalender.xn--peppermita-lnb.de';
const CALNAME = 'Vorlesungskalender';

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
// Nicht mehr "das erste <script>-Tag" nehmen (seit v3.4.0 steht davor die
// eingebettete QR-Bibliothek) – stattdessen gezielt den Block mit dem
// Datenteil-Marker herausfischen, robust gegen weitere künftig
// hinzukommende Script-Blöcke.
const scriptBlocks = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map(m => m[1]);
const script = scriptBlocks.find(s => s.includes('ENDE DATENTEIL'));
if (!script) throw new Error('Datenteil-Script (mit SEMESTERS/EVENTS_BY_SEMESTER/MODS) nicht gefunden!');

// Nur den Datenteil ausführen (SEMESTERS + EVENTS_BY_SEMESTER + MODS), nicht
// das komplette Render-Skript. Der Marker-Kommentar steht direkt im
// Datenteil in index.html – beim Verschieben dort mitziehen.
// document-Stub: der Datenteil enthält (für die Live-Seite) einen Aufruf von
// document.documentElement.style.setProperty(...), um MODS-Farben als
// CSS-Variablen verfügbar zu machen. In Node gibt es kein DOM – der Stub
// macht diesen Aufruf hier einfach zum No-op.
const marker = '// ─── ENDE DATENTEIL (SEMESTERS + EVENTS_BY_SEMESTER + MODS) ───';
const dataPart = script.substring(0, script.indexOf(marker));
const documentStub = 'const document = { documentElement: { style: { setProperty(){} } } };\n';
const { SEMESTERS, EVENTS_BY_SEMESTER, MODS } = new Function(
  documentStub + dataPart + '; return {SEMESTERS, EVENTS_BY_SEMESTER, MODS};'
)();

// Feed enthält bewusst ALLE Semester (nicht nur das gerade aktuelle) – ein
// einmal eingerichtetes Kalender-Abo soll auch künftige/vergangene Semester
// mit abdecken, ohne dass sich jemand neu abonnieren muss.
const EVENTS = SEMESTERS.flatMap(sem => EVENTS_BY_SEMESTER[sem.id] || []);

function esc(str) {
  return String(str ?? '')
    .replace(/\\/g, '\\\\')
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\n/g, '\\n');
}

function fold(line) {
  // RFC5545: Zeilen über 75 Byte müssen umgebrochen werden
  if (line.length <= 75) return line;
  let out = '';
  let rest = line;
  out += rest.slice(0, 75);
  rest = rest.slice(75);
  while (rest.length) {
    out += '\r\n ' + rest.slice(0, 74);
    rest = rest.slice(74);
  }
  return out;
}

const now = new Date();
const dtstamp = now.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

const VTIMEZONE = [
  'BEGIN:VTIMEZONE',
  'TZID:Europe/Berlin',
  'BEGIN:DAYLIGHT',
  'TZOFFSETFROM:+0100',
  'TZOFFSETTO:+0200',
  'TZNAME:CEST',
  'DTSTART:19700329T020000',
  'RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=-1SU',
  'END:DAYLIGHT',
  'BEGIN:STANDARD',
  'TZOFFSETFROM:+0200',
  'TZOFFSETTO:+0100',
  'TZNAME:CET',
  'DTSTART:19701025T030000',
  'RRULE:FREQ=YEARLY;BYMONTH=10;BYDAY=-1SU',
  'END:STANDARD',
  'END:VTIMEZONE',
].join('\r\n');

const lines = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//Vorlesungskalender//DE',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  `X-WR-CALNAME:${esc(CALNAME)}`,
  'X-WR-TIMEZONE:Europe/Berlin',
  'REFRESH-INTERVAL;VALUE=DURATION:P1D',
  'X-PUBLISHED-TTL:P1D',
  // Eigene, nicht-standardisierte Property (RFC5545 erlaubt X-Präfixe für
  // private Erweiterungen, kompatible Kalender-Apps ignorieren sie einfach).
  // Wird von der Feed-Aktualitäts-Anzeige im Verwalten-Menü ausgelesen.
  `X-KALENDER-GENERATED-AT:${dtstamp}`,
  VTIMEZONE,
];

for (const ev of EVENTS) {
  const mod = MODS[ev.modul];
  const uid = crypto.createHash('md5').update(`${ev.date}${ev.start || ''}${ev.lvnr}`).digest('hex');

  const descParts = [
    `Modul: ${mod.label}`,
    `Lehrperson: ${ev.lehrperson}`,
    `LV-Nummer: ${ev.lvnr}`,
    `Parallelgruppe: PG ${ev.pg}`,
  ];

  const eventLines = ['BEGIN:VEVENT', `UID:${uid}@${DOMAIN}`, `DTSTAMP:${dtstamp}`];

  if (ev.start && ev.end) {
    // Normaler Termin mit fester Uhrzeit
    const dtStart = ev.date.replace(/-/g, '') + 'T' + ev.start.replace(':', '') + '00';
    const dtEnd = ev.date.replace(/-/g, '') + 'T' + ev.end.replace(':', '') + '00';
    eventLines.push(`DTSTART;TZID=Europe/Berlin:${dtStart}`, `DTEND;TZID=Europe/Berlin:${dtEnd}`);
  } else {
    // Ganztägiger Termin (z.B. Abgabefrist ohne feste Uhrzeit): DATE statt
    // DATE-TIME, DTEND auf den Folgetag (RFC5545-Konvention für Ganztages-Events)
    const d = ev.date.replace(/-/g, '');
    const nextDay = new Date(ev.date + 'T00:00:00Z');
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
    const dNext = nextDay.toISOString().slice(0,10).replace(/-/g, '');
    eventLines.push(`DTSTART;VALUE=DATE:${d}`, `DTEND;VALUE=DATE:${dNext}`);
  }

  eventLines.push(
    fold(`SUMMARY:${esc(ev.title)}`),
    fold(`LOCATION:${esc(ev.raum || 'wird noch bekannt gegeben')}`),
    fold(`DESCRIPTION:${esc(descParts.join('\n'))}`),
    'END:VEVENT'
  );

  lines.push(...eventLines);
}

lines.push('END:VCALENDAR');

const outPath = path.join(root, FEED_FILENAME);
fs.writeFileSync(outPath, lines.join('\r\n') + '\r\n', 'utf8');
console.log(`ICS-Datei geschrieben: ${FEED_FILENAME} (${EVENTS.length} Termine)`);
