import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import BounceLoader from "react-spinners/BounceLoader";
import { message } from "antd";
import VerifyIcon from "../icons/verifyIcon.svg";
import { ApiContext } from "../api/ApiContext";
import useOpeningHours, {ITime} from "../api/useOpeningHours";
import { toSentence2 } from "../utils/timeUtils";
import classes from "./LoginForm.module.scss";
import Button from "../components/Button";
import Input from "../components/Input";
import { DateTime } from "luxon";

const LoginForm = () => {
	const context = useContext(ApiContext);
	const { openingHours, loading } = useOpeningHours();
	const [email, setEmail] = useState("");

	if (loading || !openingHours) {
		return (
			<>
				<div style={{ margin: "32px" }}>
					<BounceLoader size={150} color={"#ed6b66"} loading={loading} />
				</div>
			</>
		);
	}

	const nowInGermany = DateTime.now().setZone("Europe/Berlin");
	console.log("nowInGermany", nowInGermany);

	const weekDay = nowInGermany.weekday === 0 ? 7 : nowInGermany.weekday;
	const todayOpeningHours = openingHours.find((t) => t.week === weekDay);

	function fromTime(time: ITime) {
		const [fromHours, fromMinutes] = time.from.split(":").map(Number);
		const [toHours,   toMinutes] = time.to.split(":").map(Number);
		
		
		const from = DateTime.fromObject({ hour: +fromHours, minute: +fromMinutes, zone: "Europe/Berlin" });
		const to =   DateTime.fromObject({ hour: +toHours, minute: +toMinutes, zone: "Europe/Berlin" });
		return { from, to };
	}

	const openingHourRange = (time: ITime) => {
		const { from, to } = fromTime(time);
		return `${from.hour}:${from.minute} - ${to.hour}:${to.minute}`;
	}

	const isCurrentlyClosed = (todayOpeningHours: ITime | undefined) => {
		if (!todayOpeningHours) return true;

		const { from, to } = fromTime(todayOpeningHours);
		const nowLocale = DateTime.now().setZone("local");

		
		const currentlyClosed = from > nowLocale || nowLocale > to;

		console.log("nowLocale", nowLocale, "from", from, "to", to, "currentlyClosed", currentlyClosed);

		return currentlyClosed;
	}


	return (
		<>
			<div style={{ width: "100%", textAlign: "left" }}>
				<Link to="/checklist"> zurück</Link>
			</div>
			<img
				style={{ marginBottom: "32px" }}
				src={VerifyIcon}
				alt="Verify Icon"
			/>
			<h1 className={classes.headline}>Login</h1>
			<div className="text">
				<p>{toSentence2(todayOpeningHours ? [openingHourRange(todayOpeningHours)] : [])}</p>
				<small>Uhrzeiten in deiner lokalen Zeitzone</small>
			</div>
			<Input
				type="email"
				value={email}
				error={!!context?.loginError}
				placeholder="Trage hier deine E-Mail ein.."
				onKeyUp={(e) => {
					context?.resetError();
					if (e.key === "Enter" && isCurrentlyClosed(todayOpeningHours)) {
						message.warning("Wir sind momentan leider geschlossen.");
						return;
					}
					if (e.key === "Enter" ) {
						context?.handleLogin(email);
					}
				}}
				onChange={(e) => setEmail(e.target.value)}
			/>
			{context?.loginError && (
				<div className={classes.loginError}>{context?.loginError}</div>
			)}
			<div style={{ height: "40px" }}></div>

			<Button
				onClick={() => {
					if (isCurrentlyClosed(todayOpeningHours)){
						message.warning("Wir sind momentan leider geschlossen.");
						return;
					}

					context?.handleLogin(email);
				}}>
				Starte Verifizierung
			</Button>
		</>
	);
};

export default LoginForm;
