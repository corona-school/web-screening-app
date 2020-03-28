import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import logo from "./logo.svg";
import "./App.css";

export type Status = "waiting" | "active" | "completed" | "rejected";

interface Job {
	firstname: string;
	lastname: string;
	email: string;
	time: number;
	jitsi: string;
	status: Status;
}
interface JobInfo extends Job {
	position: number;
}
const socket = io(
	process.env.NODE_ENV !== "production"
		? "http://localhost:3001"
		: "https://corona-screening-backend.herokuapp.com/"
);

const App = () => {
	const [email, setEmail] = useState("");
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [jobInfo, setJobInfo] = useState<JobInfo | null>(null);

	useEffect(() => {
		socket.on("updateJob", (updatedJob: JobInfo) => {
			setJobInfo(updatedJob);
		});
	}, [jobInfo]);

	useEffect(() => {
		socket.on("login", (data: { success: boolean; jobInfo?: JobInfo }) => {
			setLoggedIn(data.success);
			if (data.jobInfo) {
				setJobInfo(data.jobInfo);
			}
		});
	}, [isLoggedIn]);

	const handleLogin = () => {
		console.log(email);
		socket.emit("login", { email });
	};

	const renderLogin = () => {
		return (
			<>
				<input
					type="email"
					value={email}
					placeholder="Write your e-mail.."
					onChange={e => setEmail(e.target.value)}
				/>
				<button onClick={handleLogin}>login</button>
			</>
		);
	};

	const renderJobInfo = () => {
		if (!jobInfo) {
			return;
		}

		return (
			<div>
				<div>Firstname: {jobInfo.firstname}</div>
				<div>Lastname: {jobInfo.lastname}</div>
				<div>Email: {jobInfo.email}</div>
				<div>Position: {jobInfo.position}</div>
				<div>Status: {jobInfo.status}</div>
			</div>
		);
	};

	return (
		<div className="App">
			<header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				{isLoggedIn ? renderJobInfo() : renderLogin()}
			</header>
		</div>
	);
};

export default App;
