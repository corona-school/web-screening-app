const TextMap = new Map([
	["waiting", "Du wirst bald Verifiziert..."],
	[
		"active",
		"Ein Mitarbeiter hat jetzt Zeit für Dich. Klick auf dem Link um die Verifizierung zu starten."
	],
	[
		"completed",
		"Ein Mitarbeiter hat jetzt Zeit für Dich. Klick auf dem Link um die Verifizierung zu starten."
	],
	["rejected", "Es tut uns leid. Du konntest nicht verifiziert werden."]
]);

const HeadlineMap = new Map([
	["waiting", "Warteschlange"],
	["active", "Los Gehts!"],
	["completed", "Viel Spaß!"],
	["rejected", "Ooops.."]
]);

export { TextMap, HeadlineMap };
