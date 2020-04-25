import React from "react";
import "./Queue.scss";
import { JobInfo } from "../types/ScreeningTypes";
import { TextMap, HeadlineMap } from "../language/JobLanguage";
import { IconMap } from "./StatusIcon";
import MetaTags from "react-meta-tags";

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
		<div className="queue-container">
			<MetaTags>
				<title>{TitleMap.get(status)}</title>
			</MetaTags>
			{IconMap.get(status)}

			<h1 className="queue-headline ">{HeadlineMap.get(status)}</h1>
			<div className="text">
				Hey {firstname}! {TextMap.get(status)}
			</div>

			{position && status === "waiting" && (
				<div className="position">
					<div className="positionText">{position}</div>

					<div className="timeText">
						ca. {time} - {time + screeningTime}
						min
					</div>
				</div>
			)}
			<p className="text" style={{ marginTop: "16px" }}>
				Wir sind heute von <b>09:00 - 12:00 sowie von 15:00 - 18:00 Uhr</b> für Dich da.
			</p>

			<div className="actionButtons">
				{isLoggedIn && isNotCompleted && (
					<button className="abortButton" onClick={handleLogout}>
						Abbrechen
					</button>
				)}
				{["waiting", "active"].includes(status) && (
					<button className="button">
						<a href={jitsi} target="_blank" rel="noopener noreferrer">
							Link zum Video-Call
						</a>
					</button>
				)}
			</div>
		</div>
	);
};

export default Queue;
