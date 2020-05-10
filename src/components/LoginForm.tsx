import React, { useState, useContext } from "react";
import "./LoginForm.scss";
import VerifyIcon from "../icons/verifyIcon.svg";
import { ApiContext } from "../api/ApiContext";
import BounceLoader from "react-spinners/BounceLoader";
import Header from "./Header";
import { Link } from "react-router-dom";
import useOpeningHours from "../api/useOpeningHours";
import { toSentence2 } from "../utils/timeUtils";
import { message } from "antd";

const LoginForm = () => {
	const context = useContext(ApiContext);
	const { openingHours, loading } = useOpeningHours();
	const [email, setEmail] = useState("");

	if (loading || !openingHours) {
		return (
			<div className="container">
				<Header />
				<div className="main">
					<div className="form-container">
						<div style={{ margin: "32px" }}>
							<BounceLoader size={150} color={"#ed6b66"} loading={loading} />
						</div>
					</div>
				</div>
			</div>
		);
	}

	const currentWeek = new Date().getDay() === 0 ? 7 : new Date().getDay();
	const today = openingHours
		.filter((t) => t.week === currentWeek)
		.map((t) => `${t.from} - ${t.to}`);

	return (
		<div className="container">
			<Header />
			<div className="main">
				<div className="form-container">
					<div style={{ width: "100%", textAlign: "left" }}>
						<Link to="/checklist"> zurück</Link>
					</div>
					<img
						style={{ marginBottom: "32px" }}
						src={VerifyIcon}
						alt="Verify Icon"
					/>
					<h1 className="headline">Login</h1>
					<div className="text">
						<p>{toSentence2(today)}</p>
					</div>
					<input
						type="email"
						value={email}
						className={context?.loginError ? "error" : ""}
						placeholder="Trage hier deine E-Mail ein.."
						onKeyUp={(e) => {
							context?.resetError();
							if (e.key === "Enter" && today.length === 0) {
								message.warning("Wir sind heute leider geschlossen.");
								return;
							}
							if (e.key === "Enter") {
								context?.handleLogin(email);
							}
						}}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{context?.loginError && (
						<div className="loginError">{context?.loginError}</div>
					)}
					<div style={{ height: "40px" }}></div>

					<button
						onClick={() => {
							if (today.length === 0) {
								message.warning("Wir sind heute leider geschlossen.");
								return;
							}
							context?.handleLogin(email);
						}}
						className={"button"}>
						Starte Verifizierung
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
