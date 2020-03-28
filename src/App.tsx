import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Header from "./Header";
import "./App.scss";
import Queue from "./Queue";
import LoginForm from "./LoginForm";

export type Status = "waiting" | "active" | "completed" | "rejected";

export interface Job {
	firstname: string;
	lastname: string;
	email: string;
	time: number;
	jitsi: string;
	status: Status;
}
export interface JobInfo extends Job {
	position: number;
}
const socket = io(
	process.env.NODE_ENV !== "production"
		? "https://corona-screening-backend-dev.herokuapp.com/"
		: "https://corona-screening-backend.herokuapp.com/"
);

const App = () => {
	const [email, setEmail] = useState("");
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [openLinked, setOpenLinked] = useState(false);
	const [jobInfo, setJobInfo] = useState<JobInfo | null>(null);

	useEffect(() => {
		if (jobInfo && jobInfo.status === "active" && !openLinked) {
			window.open(jobInfo.jitsi);
			setOpenLinked(true);
		}
	}, [jobInfo, openLinked]);

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

	const handleLogout = () => {
		socket.emit("logout", { email });
		setJobInfo(null);
		setEmail("");
		setOpenLinked(false);
	};

	return (
		<div className="container">
			<Header></Header>
			<div className="main">
				<div className="form-container">
					{isLoggedIn && jobInfo ? (
						<Queue jobInfo={jobInfo} handleLogout={handleLogout} />
					) : (
						<LoginForm
							email={email}
							setEmail={setEmail}
							handleLogin={handleLogin}
						/>
					)}
				</div>
			</div>
		</div>
	);
};

export default App;
