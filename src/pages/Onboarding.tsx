import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import VerifyIcon from "../icons/verifyIcon.svg";
import useOpeningHours from "../api/useOpeningHours";
import classes from "./Onboarding.module.scss";
import { Link } from "react-router-dom";
import {listOpeningHours, toSentence} from "../utils/timeUtils";
import Button from "../components/Button";
import classnames from "classnames";

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

	const renderOpeningHours = () => {
		if (!openingHours) {
			return (
				<div className={classes.onboardingContainer}>
					<div className={classes.greeting}>
						Hier kannst du dich verifizieren lassen. Wir sind
						jede Woche von Montag bis Samstag in den folgenden Zeiten für dich
						da:
					</div>
				</div>
			);
		}

		return (
			<div className={classes.onboardingContainer}>
				<div className={classes.greeting}>
					Hier kannst du dich verifizieren lassen. Wir sind jede
					Woche von Montag bis Samstag in den folgenden Zeiten für dich da:
				</div>
				<div className={classes.timeContainer}>
					{listOpeningHours(openingHours, loading)}
					<small>Uhrzeiten in deiner lokalen Zeitzone</small>
				</div>
			</div>
		);
	};

	return (
		<>
			<img
				style={{ marginBottom: "32px" }}
				src={VerifyIcon}
				alt="Verify Icon"
			/>

			{loading && (
				<div style={{ margin: "32px" }}>
					<BounceLoader size={150} color={"#ed6b66"} loading={loading} />
				</div>
			)}
			{!loading && renderOpeningHours()}
			{!loading && (
				<Link to="/procedure">
					<Button>Los Geht's!</Button>
				</Link>
			)}
		</>
	);
};

export default Onboarding;
