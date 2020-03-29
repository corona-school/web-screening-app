import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Header from "./Header";
import "./App.scss";
import Queue from "./Queue";
import LoginForm from "./LoginForm";
import Modal from "react-modal";
import ModalContent from "./ModalContent";

export type Status = "waiting" | "active" | "completed" | "rejected";

export interface Screener {
	firstname: string;
	lastname: string;
}

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
	screener?: Screener;
}

const socket = io("https://corona-screening-backend-dev.herokuapp.com/");

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		border: "1px solid #ececec",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)"
	}
};

const App = () => {
	let audio = new Audio("/media/redo.mp3");
	const [email, setEmail] = useState("");
	const [isLoggedIn, setLoggedIn] = useState(false);
	const [openLinked, setOpenLinked] = useState(false);
	const [isModalOpen, setModalOpen] = useState(false);
	const [jobInfo, setJobInfo] = useState<JobInfo | null>(null);

	useEffect(() => {
		if (jobInfo && jobInfo.status === "active" && !openLinked) {
			audio.play();
			setModalOpen(true);
			setOpenLinked(true);
		}
		if (
			jobInfo &&
			(jobInfo.status === "completed" || jobInfo.status === "rejected")
		) {
			setModalOpen(false);
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
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setModalOpen(false)}
				style={customStyles}
				contentLabel="Example Modal">
				<ModalContent
					screenerName={jobInfo?.screener?.firstname || "Max"}
					jitsiLink={jobInfo?.jitsi}
					closeModal={() => setModalOpen(false)}
				/>
			</Modal>
		</div>
	);
};

export default App;
