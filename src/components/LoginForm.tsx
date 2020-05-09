import React, { useState, useContext } from "react";
import "./LoginForm.scss";
import VerifyIcon from "../icons/verifyIcon.svg";
import { ApiContext } from "../api/ApiContext";
import Header from "./Header";
import { Link } from "react-router-dom";

const LoginForm = () => {
	const context = useContext(ApiContext);
	const [email, setEmail] = useState("");

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
						<p>
							Hier kannst Du Dich als Student*in verifizieren lassen. Wir sind
							von Montag - Samstag von{" "}
							<b>09:00 - 12:00 sowie von 15:00 - 18:00 Uhr</b> für Dich da.
						</p>
					</div>
					<input
						type="email"
						value={email}
						className={context?.loginError ? "error" : ""}
						placeholder="Trage hier deine E-Mail ein.."
						onKeyUp={(e) => {
							context?.resetError();
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
						onClick={() => context?.handleLogin(email)}
						className={"button"}>
						Starte Verifizierung
					</button>
				</div>
			</div>
		</div>
	);
};

export default LoginForm;
