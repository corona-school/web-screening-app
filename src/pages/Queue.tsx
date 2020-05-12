import React from "react";
import classes from "./Queue.module.scss";
import { JobInfo } from "../types/ScreeningTypes";
import { TextMap, HeadlineMap } from "../language/JobLanguage";
import { IconMap } from "../components/StatusIcon";
import MetaTags from "react-meta-tags";
import Button, { LinkButton } from "../components/Button";

interface Props {
	jobInfo: JobInfo;
	onlineScreener: number;
	isLoggedIn: boolean;
	isNotCompleted: boolean;
	handleLogout: () => void;
}

const Queue = ({
	jobInfo: { firstname, position, status, jitsi },
	onlineScreener,
	isLoggedIn,
	isNotCompleted,
	handleLogout,
}: Props) => {
	const TitleMap = new Map([
		["waiting", `Corona School | Warteschlange`],
		["active", "Corona School | Kennenlerngespräch"],
		["completed", "Corona School | Fertig"],
		["rejected", "Corona School | Abgelehnt"],
	]);

	const screeningTime = 10;
	const pos = position ? position - 1 : 0;
	const time = Math.round(
		onlineScreener !== 0
			? (pos / onlineScreener) * screeningTime
			: pos * screeningTime
	);

	console.log(isLoggedIn, isNotCompleted);

	return (
		<div className={classes.queueContainer}>
			<MetaTags>
				<title>{TitleMap.get(status)}</title>
			</MetaTags>
			{IconMap.get(status)}

			<h1 className={classes.queueHeadline}>{HeadlineMap.get(status)}</h1>
			<div className={classes.text}>
				Hey {firstname}! {TextMap.get(status)}
			</div>

			{position && status === "waiting" && (
				<div className={classes.position}>
					<div className={classes.positionText}>{position}</div>

					<div className={classes.timeText}>
						ca. {time} - {time + screeningTime}
						min
					</div>
				</div>
			)}
			<p className={classes.text} style={{ marginTop: "16px" }}>
				Wir sind von Montag - Samstag von{" "}
				<b>09:00 - 12:00 sowie von 15:00 - 18:00 Uhr</b> für Dich da.
			</p>

			<div className={classes.actionButtons}>
				{isLoggedIn && isNotCompleted && (
					<Button inverse onClick={handleLogout}>
						Abbrechen
					</Button>
				)}
				{["waiting", "active"].includes(status) && (
					<LinkButton link={jitsi}>Link zum Video-Call</LinkButton>
				)}
			</div>
		</div>
	);
};

export default Queue;
