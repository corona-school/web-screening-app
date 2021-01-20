import {ITime} from "../api/useOpeningHours";
import React from "react";
import classnames from "classnames";
import classes from "./timeUtils.module.scss";

const days = [
	"Montag",
	"Dienstag",
	"Mittwoch",
	"Donnerstag",
	"Freitag",
	"Samstag",
	"Sonntag",
];

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

export const listOpeningHours = (openingHours: ITime[], loading: boolean) => {
	const currentDay = new Date().getDay() === 0 ? 7 : new Date().getDay();

	if (loading) return <span>Lädt...</span>;

	return days.map((d, i) => {
		const day = openingHours.filter(t => t.week === i+1);
		const timeString = toSentence(day.map(t => `${t.from} - ${t.to}`));
		return (
			<div className={classnames(classes.openTime, {[classes.today]: currentDay === i+1})}>
				<div>{d}:</div>
				<div className={classes.timeString}>{timeString}</div>
			</div>
		)
	})
}
