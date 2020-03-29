import React from "react";
import "./LoginForm.scss";
import VerifyIcon from "../icons/verifyIcon.svg";

interface Props {
	email: string;
	setEmail: (value: string) => void;
	handleLogin: () => void;
}

const LoginForm = ({ email, setEmail, handleLogin }: Props) => {
	return (
		<>
			<img
				style={{ marginBottom: "32px" }}
				src={VerifyIcon}
				alt="Verify Icon"
			/>
			<h1 className="headline">Wilkommen</h1>
			<div className="text">
				Hier kannst Du dich als Student*in verifizieren lassen.
			</div>
			<input
				type="email"
				value={email}
				placeholder="Trage hier deine E-Mail ein.."
				onKeyUp={e => {
					if (e.key === "Enter") {
						handleLogin();
					}
				}}
				onChange={e => setEmail(e.target.value)}
			/>
			<button onClick={handleLogin} className="button">
				Jetzt verifizieren lassen
			</button>
		</>
	);
};

export default LoginForm;
