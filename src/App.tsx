import React from "react";
import io from "socket.io-client";
import BounceLoader from "react-spinners/BounceLoader";
import Header from "./components/Header";
import "./App.scss";
import Queue from "./components/Queue";
import LoginForm from "./components/LoginForm";
import Modal from "react-modal";
import ModalContent from "./components/ModalContent";
import { JobInfo } from "./types/ScreeningTypes";
import LogRocket from "logrocket";
import * as Sentry from "@sentry/browser";
import { message, notification } from "antd";
import { MessageType } from "antd/lib/message";
LogRocket.init("knfv1d/corona-school");

enum StudentSocketEvents {
	LOGIN = "login",
	UPDATE_JOB = "updateJob",
	REMOVED_JOB = "removedJob",
	UPDATE_SCREENER = "updateScreener",
}

enum StudentSocketActions {
	LOGIN = "login",
	LOGOUT = "logout",
}

if (process.env.NODE_ENV !== "production") {
	LogRocket.identify("leon-erath@hotmail.de", {
		email: "leon-erath@hotmail.de",
		subscriptionType: "dev",
	});
}

Sentry.init({
	dsn: process.env.REACT_APP_SENTRY_URL,
});

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		border: "1px solid #ececec",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
	},
};

interface State {
	email: string;
	isLoggedIn: boolean;
	pendingLogin: boolean;
	isModalOpen: boolean;
	jobInfo: JobInfo | null;
	loginError: string | null;
	onlineScreener: number;
}

const url: string = (window as any).env
	? (window as any).env.REACT_APP_BACKEND_URL
	: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/";

class App extends React.Component {
	state: State = {
		email: "",
		isLoggedIn: false,
		pendingLogin: false,
		isModalOpen: false,
		jobInfo: null,
		loginError: null,
		onlineScreener: 0,
	};

	socket = io(url, {
		reconnection: true,
		reconnectionDelay: 1000,
		reconnectionDelayMax: 5000,
		reconnectionAttempts: 99999,
	});

	getStateFromJob(job: JobInfo) {
		if (job.status === "active") {
			try {
				const audio = new Audio("/media/redo.mp3");
				if (!audio) {
					return;
				}

				const promise = audio.play();
				if (promise !== undefined) {
					promise.then(() => {}).catch((error) => console.error(error));
				}
			} catch (err) {
				console.error(err);
			}
		}
		return {
			jobInfo: job,
			isModalOpen: job.status === "active" ? true : false,
		};
	}

	componentDidMount() {
		window.addEventListener("beforeunload", this.beforeunload.bind(this));
		const email = localStorage.getItem("loginEmail");
		if (email) {
			this.setState({ pendingLogin: true });
			this.socket.emit("login", { email });
			Sentry.configureScope((scope) => {
				scope.setUser({ email });
			});
			LogRocket.identify(email, {
				email,
				subscriptionType: "student",
			});
		}

		this.socket.on("connect", function () {
			console.log("connected to server");
		});

		this.socket.on("disconnect", function () {
			console.log("disconnected to server");
		});
		let hide: null | MessageType = null;

		this.socket.on("connect_error", (error: Error) => {
			Sentry.captureException(error);
			console.log("connect_error", error.message);
		});
		this.socket.on("error", (error: Error) => {
			Sentry.captureException(error);
			console.log("error", error.message);
		});
		this.socket.on("reconnecting", (attemptNumber: number) => {
			console.log("reconnecting", attemptNumber);
			if (!hide) {
				hide = message.loading("Verbindung wiederaufbauen..", 0);
			}
			if (attemptNumber % 5 === 0) {
				notification.error({
					message: "Verbindungsprobleme",
					description:
						"Ein Fehler ist aufgetreten und es kann keine Verbindung mit dem Server aufgebaut werden. Bitte lade die Seite neu und versuche es noch einmal. Sonst wende dich an unseren Suppoert: support@corona-school.de",
					duration: 0,
				});
			}
		});
		this.socket.on("reconnect", () => {
			if (hide) {
				hide();
				hide = null;
				if (this.state.email.length > 0 || localStorage.getItem("loginEmail")) {
					message.success("Verbindung wieder hergestellt.");
				} else {
					message.error("Verbindung konnte nicht wieder hergestellt werden.");
				}
			}
			console.log("reconnected");
			if (this.state.email.length > 0) {
				this.socket.emit("student-reconnect", { email: this.state.email });
				return;
			}
			if (localStorage.getItem("loginEmail")) {
				this.socket.emit("student-reconnect", {
					email: localStorage.getItem("loginEmail"),
				});
				return;
			}

			console.warn("Cannot find email");
			localStorage.removeItem("loginEmail");
			this.setState({
				jobInfo: null,
				email: "",
				isModalOpen: false,
				isLoggedIn: false,
			});
		});
		this.socket.on("connect_timeout", (data: any) => {
			console.log("connect_timeout", data.message);
		});
		this.socket.on(StudentSocketEvents.UPDATE_JOB, (jobInfo: JobInfo) => {
			if (jobInfo.status === "completed" || jobInfo.status === "rejected") {
				localStorage.removeItem("loginEmail");
			}
			this.setState({ ...this.getStateFromJob(jobInfo) });
		});

		this.socket.on(
			StudentSocketEvents.UPDATE_SCREENER,
			(data: { screenerCount: number }) => {
				this.setState({ onlineScreener: data.screenerCount });
				console.log("Live screener count:", data.screenerCount);
			}
		);

		this.socket.on(StudentSocketEvents.REMOVED_JOB, () => {
			console.log("job got removed");
			if (
				this.state.jobInfo &&
				this.state.jobInfo.status !== "completed" &&
				this.state.jobInfo.status !== "rejected"
			) {
				localStorage.removeItem("loginEmail");
				this.setState({
					jobInfo: null,
					email: "",
					isModalOpen: false,
					isLoggedIn: false,
				});
			}
		});

		this.socket.on(
			StudentSocketEvents.LOGIN,
			(data: { success: boolean; jobInfo: JobInfo }) => {
				if (!data.success) {
					this.setState({
						isLoggedIn: false,
						pendingLogin: false,
						loginError:
							"Wir konnten keine Student*innen mit dieser E-Mail finden.",
					});
					return;
				}
				if (
					data.jobInfo.status !== "completed" &&
					data.jobInfo.status !== "rejected"
				) {
					localStorage.setItem("loginEmail", data.jobInfo.email);
				}

				this.setState({
					loginError: null,
					...this.getStateFromJob(data.jobInfo),
					isLoggedIn: data.success,
					pendingLogin: false,
				});
			}
		);
	}

	componentWillUnmount() {
		this.socket.disconnect();
	}

	handleLogin = () => {
		window.removeEventListener("beforeunload", this.beforeunload.bind(this));
		this.socket.emit("login", { email: this.state.email });
	};

	beforeunload(e: any) {
		e.preventDefault();
		e.returnValue = true;
	}

	handleLogout = () => {
		localStorage.removeItem("loginEmail");
		this.socket.emit("logout", { email: this.state.email });
		this.setState({
			jobInfo: null,
			email: "",
			isModalOpen: false,
			isLoggedIn: false,
		});
	};

	render() {
		const job = this.state.jobInfo;
		if (this.state.pendingLogin) {
			return (
				<div className="container">
					<Header />
					<BounceLoader size={150} color={"#ed6b66"} loading={true} />
				</div>
			);
		}
		return (
			<div className="container">
				<Header />
				<div className="main">
					<div className="form-container">
						{this.state.isLoggedIn && this.state.jobInfo ? (
							<Queue
								isNotCompleted={
									job
										? job.status === "waiting" || job.status === "active"
										: true
								}
								isLoggedIn={this.state.isLoggedIn}
								handleLogout={this.handleLogout}
								jobInfo={this.state.jobInfo}
								onlineScreener={this.state.onlineScreener}
							/>
						) : (
							<LoginForm
								resetLoginError={() => this.setState({ loginError: null })}
								loginError={this.state.loginError}
								email={this.state.email}
								setEmail={(email: string) => this.setState({ email })}
								handleLogin={this.handleLogin}
							/>
						)}
					</div>
				</div>
				<Modal
					isOpen={this.state.isModalOpen}
					onRequestClose={() => this.setState({ isModalOpen: false })}
					style={customStyles}
					contentLabel="Verifikation">
					<ModalContent
						screenerName={this.state.jobInfo?.screener?.firstname || "Max"}
						jitsiLink={this.state.jobInfo?.jitsi}
					/>
				</Modal>
			</div>
		);
	}
}

export default App;
