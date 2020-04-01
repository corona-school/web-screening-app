import React from "react";
import "./Queue.scss";
import { JobInfo } from "../types/ScreeningTypes";
import { TextMap, HeadlineMap } from "../language/JobLanguage";
import { IconMap } from "./StatusIcon";
import MetaTags from "react-meta-tags";

const Queue = ({
	jobInfo: { firstname, lastname, email, position, status, jitsi, time },
	handleLogout
}: {
	jobInfo: JobInfo;
	handleLogout: () => void;
}) => {
	const TitleMap = new Map([
		["waiting", `Corona School Stundent | Warteschlange`],
		["active", "Corona School Student | Verifizierung"],
		["completed", "Corona School Student | Erfolg"],
		["rejected", "Corona School Student | Abgelehnt"]
	]);
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
				<div className="position">{position}</div>
			)}

			<button style={{ marginTop: "32px" }} className="button">
				<a href={jitsi} target="_blank" rel="noopener noreferrer">
					Link zum Video-Call
				</a>
			</button>
		</div>
	);
};

export default Queue;
