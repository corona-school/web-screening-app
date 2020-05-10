import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import Header from "./Header";
import VerifyIcon from "../icons/verifyIcon.svg";
import useOpeningHours from "../api/useOpeningHours";
import "./Onboarding.scss";
import { Link } from "react-router-dom";
import { toSentence } from "../utils/timeUtils";
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

	const renderDay = (weekString: string, week: number) => {
		const currentWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();

		console.log(currentWeek);

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
						jede Woche von Montag bis Samstag in den folgenden Zeiten für Dich
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
					{loading && (
						<div style={{ margin: "32px" }}>
							<BounceLoader size={150} color={"#ed6b66"} loading={loading} />
						</div>
					)}
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
