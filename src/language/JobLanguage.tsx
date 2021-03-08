const TextMap = new Map([
  [
    "waiting",
    "Du bist bald mit deinem Kennenlerngespräch dran, bleibe bitte auf dieser Seite. Wenn du willst kannst du dich schon vorbereiten und dem Video-Call beitreten.",
  ],
  [
    "waiting-intern",
    "Wir freuen uns, dass wir dich gleich kennenlernen dürfen. Während du wartest bitten wir dich, dieses kurze Video mit weiteren Informationen zum Praktikum anzusehen, damit du einen besseren Überlick erhältst und wir spezifischer auf deine Fragen eingehen können. Bis gleich!"
  ],
  [
    "active",
    "Ein Mitarbeiter*in hat jetzt Zeit für dich. Klick auf dem Link um das Kennenlerngespräch zu starten.",
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
