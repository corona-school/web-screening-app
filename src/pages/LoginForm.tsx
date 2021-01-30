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

	const currentWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();
	const todayOpeningHours = openingHours.find((t) => t.week === currentWeek);

	const openingHourRange = (time: ITime) => {
		return `${time.from} - ${time.to}`;
	}

	const isCurrentlyClosed = (todayOpeningHours: ITime | undefined) => {
		if (!todayOpeningHours) return true;

		const now = new Date();
		const currentMinutes = now.getHours() * 60 + now.getMinutes();

		const startTime = todayOpeningHours.from.split(":").map(Number);
		const startMinutes = startTime[0] * 60 + startTime[1];

		const endTime = todayOpeningHours.to.split(":").map(Number);
		const endMinutes = endTime[0] * 60 + endTime[1];

		return startMinutes > currentMinutes || currentMinutes > endMinutes;
	}

	console.log(isCurrentlyClosed(todayOpeningHours));

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
