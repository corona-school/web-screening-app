const TextMap = new Map([
	["waiting", "Du wirst bald verifiziert..."],
	[
		"active",
		"Ein Mitarbeiter hat jetzt Zeit für Dich. Klick auf dem Link um die Verifizierung zu starten."
	],
	["completed", "Herzlichgen Glückwunsch! Du wurdest erfolgreich verifiziert!"],
	["rejected", "Es tut uns leid. Du konntest nicht verifiziert werden."]
]);

const HeadlineMap = new Map([
	["waiting", "Einen Moment noch..."],
	["active", "Los Gehts!"],
	["completed", "Viel Spaß!"],
	["rejected", "Ooops.."]
]);

export { TextMap, HeadlineMap };
