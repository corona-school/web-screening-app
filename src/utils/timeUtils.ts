export const toSentence = (arr: string[]) => {
	if (arr.length === 0) {
		return "geschlossen";
	}
	if (arr.length === 1) {
		return arr[0] + " Uhr";
	}
	return (
		arr.slice(0, arr.length - 1).join(", ") + " und " + arr.slice(-1) + " Uhr"
	);
};

export const toSentence2 = (arr: string[]) => {
	const text = "Hier kannst du dich verifizieren lassen.";

	if (arr.length === 0) {
		return text + " Wir sind heute leider geschlossen.";
	}
	if (arr.length === 1) {
		return text + " Wir sind heute von " + arr[0] + " Uhr für dich da.";
	}
	return (
		text +
		" Wir sind heute von " +
		arr.slice(0, arr.length - 1).join(", ") +
		" und " +
		arr.slice(-1) +
		" Uhr für dich da."
	);
};
