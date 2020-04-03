const TextMap = new Map([
  [
    "waiting",
    "Du bist bald mit deinem Kennenlerngespräch dran, bleibe bitte auf dieser Seite. Wenn du willst kannst dich schon vorbereiten und dem Video-Call beitreten.",
  ],
  [
    "active",
    "Ein Mitarbeiter*in hat jetzt Zeit für Dich. Klick auf dem Link um das Kennenlerngespräch zu starten.",
  ],
  ["completed", "Herzlichen Glückwunsch! Du wurdest erfolgreich verifiziert!"],
  ["rejected", "Es tut uns leid. Du konntest nicht verifiziert werden."],
]);

const HeadlineMap = new Map([
  ["waiting", "Einen Moment noch..."],
  ["active", "Los Geht's!"],
  ["completed", "Viel Spaß!"],
  ["rejected", "Ooops.."],
]);

export { TextMap, HeadlineMap };
