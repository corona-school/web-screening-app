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
		["waiting", `Corona School Stundent | Position ${position + 1}`],
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

			<h1 className="headline">{HeadlineMap.get(status)}</h1>
			<div className="text">{TextMap.get(status)}</div>

			<div className="queueItem">
				<div className="description">Name:</div>
				<div className="info"> {firstname}</div>
			</div>
			<div className="queueItem">
				<div className="description">Nachname:</div>
				<div className="info">{lastname}</div>
			</div>
			<div className="queueItem">
				<div className="description">E-Mail:</div>
				<div className="info">{email}</div>
			</div>
			<div className="queueItem">
				<div className="description">Position:</div>
				<div className="info">{position + 1}</div>
			</div>
			<div className="queueItem">
				<div className="description">Link:</div>
				<div className="info">
					<a href={jitsi} target="_blank" rel="noopener noreferrer">
						Jitsi Videocall
					</a>
				</div>
			</div>
			<div className="queueItem">
				<div className="description">Status:</div>
				<div className="info">{status}</div>
			</div>
			<button
				style={{ marginTop: "32px" }}
				className="button"
				onClick={handleLogout}>
				Später verifizieren lassen
			</button>
		</div>
	);
};

export default Queue;
