#!/usr/bin/env node
/**
 * Generiert die abonnierbare ICS-Kalenderdatei aus den EVENTS-Daten in index.html.
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
const CALNAME = 'Vorlesungskalender WS 2026/27';

const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];

// Nur den Datenteil ausführen (EVENTS + MODS), nicht das komplette Render-Skript
const marker = '// Sort by start time within same date';
const dataPart = script.substring(0, script.indexOf(marker));
const EVENTS = new Function(dataPart + '; return EVENTS;')();
const modsMarker = script.indexOf('};', script.indexOf('const MODS')) + 2;
const MODS = new Function(script.substring(0, modsMarker) + '; return MODS;')();

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
  'PRODID:-//Vorlesungskalender WS 2026-27//DE',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  `X-WR-CALNAME:${esc(CALNAME)}`,
  'X-WR-TIMEZONE:Europe/Berlin',
  'REFRESH-INTERVAL;VALUE=DURATION:P1D',
  'X-PUBLISHED-TTL:P1D',
  VTIMEZONE,
];

for (const ev of EVENTS) {
  const mod = MODS[ev.modul];
  const uid = crypto.createHash('md5').update(`${ev.date}${ev.start}${ev.lvnr}`).digest('hex');
  const dtStart = ev.date.replace(/-/g, '') + 'T' + ev.start.replace(':', '') + '00';
  const dtEnd = ev.date.replace(/-/g, '') + 'T' + ev.end.replace(':', '') + '00';

  const descParts = [
    `Modul: ${mod.label}`,
    `Lehrperson: ${ev.lehrperson}`,
    `LV-Nummer: ${ev.lvnr}`,
    `Parallelgruppe: PG ${ev.pg}`,
  ];

  lines.push(
    'BEGIN:VEVENT',
    `UID:${uid}@${DOMAIN}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART;TZID=Europe/Berlin:${dtStart}`,
    `DTEND;TZID=Europe/Berlin:${dtEnd}`,
    fold(`SUMMARY:${esc(ev.title)}`),
    fold(`LOCATION:${esc(ev.raum || 'wird noch bekannt gegeben')}`),
    fold(`DESCRIPTION:${esc(descParts.join('\n'))}`),
    'END:VEVENT'
  );
}

lines.push('END:VCALENDAR');

const outPath = path.join(root, FEED_FILENAME);
fs.writeFileSync(outPath, lines.join('\r\n') + '\r\n', 'utf8');
console.log(`ICS-Datei geschrieben: ${FEED_FILENAME} (${EVENTS.length} Termine)`);
