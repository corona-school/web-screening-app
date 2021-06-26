import React from "react";
import classes from "./Queue.module.scss";
import { JobInfo } from "../types/ScreeningTypes";
import { TextMap, HeadlineMap } from "../language/JobLanguage";
import { IconMap } from "../components/StatusIcon";
import MetaTags from "react-meta-tags";
import Button, { LinkButton } from "../components/Button";
import {listOpeningHours} from "../utils/timeUtils";
import useOpeningHours from "../api/useOpeningHours";
import YouTubeVideo from "../components/YouTubeVideo";

interface Props {
	jobInfo: JobInfo;
	onlineScreener: number;
	isLoggedIn: boolean;
	isNotCompleted: boolean;
	handleLogout: () => void;
}

const Queue = ({
	jobInfo: {
		data: { firstName, jitsi, screeningTypes },
		position,
		status,
	},
	onlineScreener,
	isLoggedIn,
	isNotCompleted,
	handleLogout,
}: Props) => {
	const TitleMap = new Map([
		["waiting", `Lern-Fair | Warteschlange`],
		["active", "Lern-Fair | Kennenlerngespräch"],
		["completed", "Lern-Fair | Fertig"],
		["rejected", "Lern-Fair | Abgelehnt"],
	]);

	const screeningTime = 10;
	const pos = position ? position - 1 : 0;
	const time = Math.round(
		onlineScreener !== 0
			? (pos / onlineScreener) * screeningTime
			: pos * screeningTime
	);

	const { openingHours, loading } = useOpeningHours();

	console.log(time, pos, screeningTime, status, firstName);

	return (
		<div className={classes.queueContainer}>
			<MetaTags>
				<title>{TitleMap.get(status)}</title>
			</MetaTags>
			{IconMap.get(status)}

			<h1 className={classes.queueHeadline}>{HeadlineMap.get(status)}</h1>
			<div className={classes.text}>
				Hey {firstName}! {TextMap.get(status === "waiting" && screeningTypes.includes("intern") ? "waiting-intern" : status)}
			</div>

			{status === "completed" && (
				<div className={classes.text}>
					Gehe jetzt in deinen User-Bereich:{' '}
					<br/>
					<a href='https://my.lern-fair.de/'>my.lern-fair.de</a>
				</div>
			)}

			{status === "waiting" && (
				<>
					{screeningTypes.includes("intern") && (
						<YouTubeVideo
							id={process.env.REACT_APP_INTERN_VIDEO ?? ""}
							className={classes.video}
						/>
						)}
					<div className={classes.position}>
						<div className={classes.positionText}>{position}</div>
						<div className={classes.timeText}>
							ca. {time} - {time + screeningTime}
							min
						</div>
					</div>
				</>
			)}
			<p
				className={classes.text}
				style={{
					marginTop: "16px",
					marginBottom: "8px",
					fontWeight: "bold"
				}}>
				Öffnungszeiten
			</p>
			<p className={classes.text}>
				{openingHours && listOpeningHours(openingHours, loading)}
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
}

export default Queue;
