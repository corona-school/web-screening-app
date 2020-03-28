import React from "react";
import "./LoginForm.scss";
import VerifyIcon from "./VerifyIcon";

interface Props {
	email: string;
	setEmail: (value: string) => void;
	handleLogin: () => void;
}

const LoginForm = ({ email, setEmail, handleLogin }: Props) => {
	return (
		<>
			<VerifyIcon />
			<h1 className="headline">Wilkommen</h1>
			<div className="text">
				Hier kannst Du dich als Student*in verifizieren lassen.
			</div>
			<input
				type="email"
				value={email}
				placeholder="Write your e-mail.."
				onKeyUp={e => {
					if (e.key === "Enter") {
						handleLogin();
					}
				}}
				onChange={e => setEmail(e.target.value)}
			/>
			<button onClick={handleLogin}>login</button>
		</>
	);
};

export default LoginForm;
