import {ITime} from "../api/useOpeningHours";
import React from "react";
import classnames from "classnames";
import classes from "./timeUtils.module.scss";
import { DateTime } from "luxon";

const days = [
	"Montag",
	"Dienstag",
	"Mittwoch",
	"Donnerstag",
	"Freitag",
	"Samstag",
	"Sonntag",
];

export function fromTime(time: ITime) {
	const [fromHours, fromMinutes] = time.from.split(":").map(Number);
	const [toHours,   toMinutes] = time.to.split(":").map(Number);
	
	const from = DateTime.fromObject({ hour: +fromHours, minute: +fromMinutes, zone: "Europe/Berlin" }).setZone("local");
	const to =   DateTime.fromObject({ hour: +toHours, minute: +toMinutes, zone: "Europe/Berlin" }).setZone("local");
	return { from, to };
}

export function getWeekdayGermany(): number {
	const nowInGermany = DateTime.now().setZone("Europe/Berlin");
	const weekDay = nowInGermany.weekday === 0 ? 7 : nowInGermany.weekday;
	return weekDay;
}

export function getOpeningHoursToday(openingHours: ITime[]): ITime | undefined {
	const weekDay = getWeekdayGermany();
	const todayOpeningHours = openingHours.find((t) => t.week === weekDay);

	console.log("getOpeningHoursToday", "weekDay", weekDay, "todayOpeningHours", todayOpeningHours);
	return todayOpeningHours;
}

export function getRangeString(time: ITime) {
	const { from, to } = fromTime(time);
	console.log("getRangeString", "from", from, "to", to);
	return `${from.hour}:${("" + from.minute).padStart(2, "0")} - ${to.hour}:${("" + to.minute).padStart(2, "0")}`;
}

export function isCurrentlyClosed(todayOpeningHours: ITime | undefined) {
	if (!todayOpeningHours) return true;

	const { from, to } = fromTime(todayOpeningHours);
	const nowLocale = DateTime.now().setZone("local");

	
	const currentlyClosed = from > nowLocale || nowLocale > to;

	console.log("isCurrentlyClosed", "nowLocale", nowLocale, "from", from, "to", to, "currentlyClosed", currentlyClosed);

	return currentlyClosed;
}

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
	if (loading) return <span>Lädt...</span>;

	const currentWeekDay = getWeekdayGermany();

	return days.map((day, i) => {
		const weekDay = i + 1;

		const todayOpeningHours = openingHours.filter(t => t.week === weekDay);
		const timeString = toSentence(todayOpeningHours.map(getRangeString));
		return (
			<div className={classnames(classes.openTime, {[classes.today]: weekDay === currentWeekDay })}>
				<div>{day}:</div>
				<div className={classes.timeString}>{timeString}</div>
			</div>
		)
	})
}
