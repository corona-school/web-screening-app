import React from "react";
import Header from "./Header";
import VerifyIcon from "../icons/verifyIcon.svg";

import useOpeningHours from "../api/useOpeningHours";
import "./Onboarding.scss";
import { Link } from "react-router-dom";
const days = [
	"Montag",
	"Dienstag",
	"Mittwoch",
	"Donnerstag",
	"Freitag",
	"Samstag",
	"Sonntag",
];

const Onboarding = () => {
	const { openingHours, loading } = useOpeningHours();

	const toSentence = (arr: string[]) => {
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

	const renderDay = (weekString: string, week: number) => {
		const currentWeek = new Date().getDay();

		if (!openingHours) {
			return <span>Loading...</span>;
		}
		const today = openingHours.filter((t) => t.week === week);
		const string = toSentence(today.map((t) => `${t.from} - ${t.to}`));

		return (
			<div className={`openTime ${currentWeek === week ? "today" : ""}`}>
				<div>{weekString}:</div> <div className="timeString">{string}</div>
			</div>
		);
	};

	const renderOpeningHours = () => {
		if (!openingHours) {
			return (
				<div className="onboardingContainer">
					<div className="greeting">
						Hier kannst Du Dich als Student*in verifizieren lassen. Wir sind
						jede Woche von Montag bis Samstags in den folgenden Zeiten für Dich
						da:
					</div>
				</div>
			);
		}

		return (
			<div className="onboardingContainer">
				<div className="greeting">
					Hier kannst Du Dich als Student*in verifizieren lassen. Wir sind jede
					Woche von Montag bis Samstags in den folgenden Zeiten für Dich da:
				</div>
				<div className="timeContainer">
					{days.map((d, i) => renderDay(d, i + 1))}
				</div>
			</div>
		);
	};

	return (
		<div className="container">
			<Header />
			<div className="main">
				<div className="form-container">
					<img
						style={{ marginBottom: "32px" }}
						src={VerifyIcon}
						alt="Verify Icon"
					/>
					<h1 className="headline">Wilkommen</h1>
					{!loading && renderOpeningHours()}

					{!loading && (
						<Link to="/procedure">
							<button className={"button"}>Los Geht's!</button>
						</Link>
					)}
				</div>
			</div>
		</div>
	);
};

export default Onboarding;
