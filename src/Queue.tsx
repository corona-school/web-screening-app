import React from "react";
import { JobInfo } from "./App";
import BounceLoader from "react-spinners/BounceLoader";
import "./Queue.scss";
import VerifyIcon from "./VerifyIcon";

const Queue = ({
	jobInfo: { firstname, lastname, email, position, status, jitsi, time },
	handleLogout
}: {
	jobInfo: JobInfo;
	handleLogout: () => void;
}) => {
	const getText = () => {
		if (status === "waiting") {
			return "Du wirst bald Verifiziert...";
		}
		if (status === "active") {
			return "Ein Mitarbeiter hat jetzt Zeit für Dich. Klick auf dem Link um die Verifizierung zu starten.";
		}
		if (status === "completed") {
			return "Herzlichen Glückwunsch! Du wurdest erfolgreich verifiziert";
		}
		if (status === "rejected") {
			return "Es tut uns leid. Du konntest nicht verifiziert werden.";
		}
	};

	return (
		<div className="queue-container">
			{status === "completed" ? (
				<VerifyIcon />
			) : (
				<div className="loading-icon">
					<BounceLoader size={150} color={"#ed6b66"} loading={true} />
				</div>
			)}

			<h1 className="headline">Warteschlange</h1>

			<div className="text">{getText()}</div>
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
					<a href={jitsi}>jjitsi Video Call</a>
				</div>
			</div>
			<div className="queueItem">
				<div className="description">Status:</div>
				<div className="info">{status}</div>
			</div>
			<button style={{ marginTop: "32px" }} onClick={handleLogout}>
				Logout
			</button>
		</div>
	);
};

export default Queue;
