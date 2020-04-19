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
LogRocket.init("knfv1d/corona-school");

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
	};

	socket = io(url, {
		reconnection: true,
		reconnectionDelay: 1000,
		reconnectionDelayMax: 5000,
		reconnectionAttempts: 99999,
	});

	audio = new Audio("/media/redo.mp3");

	getStateFromJob(job: JobInfo) {
		if (job.status === "active") {
			this.audio.play();
		}
		return {
			jobInfo: job,
			isModalOpen: job.status === "active" ? true : false,
		};
	}

	componentDidMount() {
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
		});
		this.socket.on("connect_timeout", (data: any) => {
			console.log("connect_timeout", data.message);
		});
		this.socket.on("updateJob", (jobInfo: JobInfo) => {
			if (jobInfo.status === "completed" || jobInfo.status === "rejected") {
				localStorage.removeItem("loginEmail");
			}
			this.setState({ ...this.getStateFromJob(jobInfo) });
		});

		this.socket.on("removedJob", () => {
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

		this.socket.on("login", (data: { success: boolean; jobInfo: JobInfo }) => {
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
		});
	}

	componentWillUnmount() {
		this.socket.disconnect();
	}

	handleLogin = () => {
		this.socket.emit("login", { email: this.state.email });
	};

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
					<Header
						isNotCompleted={false}
						isLoggedIn={false}
						handleLogout={this.handleLogout}
					/>
					<BounceLoader size={150} color={"#ed6b66"} loading={true} />
				</div>
			);
		}
		return (
			<div className="container">
				<Header
					isNotCompleted={
						job ? job.status === "waiting" || job.status === "active" : true
					}
					isLoggedIn={this.state.isLoggedIn}
					handleLogout={this.handleLogout}
				/>
				<div className="main">
					<div className="form-container">
						{this.state.isLoggedIn && this.state.jobInfo ? (
							<Queue jobInfo={this.state.jobInfo} />
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
