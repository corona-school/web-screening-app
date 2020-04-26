import React from "react";
import { withRouter, RouteComponentProps, useParams } from "react-router-dom";
import io from "socket.io-client";
import { JobInfo } from "../types/ScreeningTypes";
import LogRocket from "logrocket";
import * as Sentry from "@sentry/browser";
import { message, notification } from "antd";
import { MessageType } from "antd/lib/message";

const ApiContext = React.createContext<IProviderProps | null>(null);

const url: string = (window as any).env
	? (window as any).env.REACT_APP_BACKEND_URL
	: process.env.REACT_APP_BACKEND_URL || "http://localhost:3001/";

const socket = io(url, {
	reconnection: true,
	reconnectionDelay: 1000,
	reconnectionDelayMax: 5000,
	reconnectionAttempts: 99999,
});

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
if (process.env.NODE_ENV === "production") {
	LogRocket.init("knfv1d/corona-school");
	Sentry.init({
		dsn: process.env.REACT_APP_SENTRY_URL,
	});
}

export interface IProviderProps {
	isLoggedIn: boolean;
	pendingLogin: boolean;
	jobInfo: JobInfo | null;
	loginError: string | null;
	onlineScreener: number;
	handleLogin: (email: string) => void;
	handleLogout: () => void;
	resetError: () => void;
}

interface State {
	isLoggedIn: boolean;
	pendingLogin: boolean;
	jobInfo: JobInfo | null;
	loginError: string | null;
	onlineScreener: number;
}

interface RouteProps {
	email?: string;
}

class ApiContextComponent extends React.Component<
	RouteComponentProps<RouteProps>
> {
	state: State = {
		isLoggedIn: false,
		pendingLogin: false,
		jobInfo: null,
		loginError: null,
		onlineScreener: 0,
	};

	getStateFromJob(job: JobInfo) {
		return {
			jobInfo: job,
			isModalOpen: job.status === "active" ? true : false,
		};
	}

	getEmail = () => {
		const { email } = this.props.match.params;
		const finalEmail = email ? email : localStorage.getItem("loginEmail");
		return finalEmail;
	};

	componentDidMount() {
		const email = this.getEmail();
		if (email) {
			this.setState({ pendingLogin: true });
			socket.emit("login", { email });
			Sentry.configureScope((scope) => {
				scope.setUser({ email });
			});
			LogRocket.identify(email, {
				email,
				subscriptionType: "student",
			});
		}

		socket.on("connect", function () {
			console.log("connected to server");
		});

		socket.on("disconnect", function () {
			console.log("disconnected to server");
		});
		let hide: null | MessageType = null;

		socket.on("connect_error", (error: Error) => {
			Sentry.captureException(error);
			console.log("connect_error", error.message);
		});
		socket.on("error", (error: Error) => {
			Sentry.captureException(error);
			console.log("error", error.message);
		});
		socket.on("reconnecting", (attemptNumber: number) => {
			console.log("reconnecting", attemptNumber);
			if (!hide) {
				hide = message.loading("Verbindung wiederaufbauen..", 0);
			}
			if (attemptNumber % 5 === 0) {
				notification.error({
					message: "Verbindungsprobleme",
					description:
						"Ein Fehler ist aufgetreten und es kann keine Verbindung mit dem Server aufgebaut werden. Bitte lade die Seite neu und versuche es noch einmal. Sonst schreib uns einfach eine E-mail.",
					duration: 0,
				});
			}
		});
		socket.on("reconnect", () => {
			const email2 = this.getEmail();
			if (hide) {
				hide();
				hide = null;
			}
			if (!email2 || email2.length === 0) {
				notification.error({
					message: "Verbindungsprobleme",
					description:
						"Ein Fehler ist aufgetreten und es kann keine Verbindung mit dem Server aufgebaut werden. Bitte lade die Seite neu und versuche es noch einmal.  Sonst schreib uns einfach eine E-mail.",
					duration: 0,
				});
				console.warn("Cannot find email");
				localStorage.removeItem("loginEmail");
				this.setState({
					jobInfo: null,
					email: "",
					isModalOpen: false,
					isLoggedIn: false,
				});
				return;
			}

			message.success("Verbindung wieder hergestellt.");
			console.log("reconnected.");
			socket.emit("student-reconnect", { email: email2 });
		});
		socket.on("connect_timeout", (data: any) => {
			console.log("connect_timeout", data.message);
		});
		socket.on("failedReconnect", () => {
			notification.error({
				message: "Verbindungsprobleme",
				description:
					"Ein Fehler ist aufgetreten und es kann keine Verbindung mit dem Server aufgebaut werden. Bitte lade die Seite neu und versuche es noch einmal.  Sonst schreib uns einfach eine E-mail.",
				duration: 0,
			});
			console.warn("Could not reconnect properly. Forcing Logout.");
			localStorage.removeItem("loginEmail");
			this.props.history.replace("/");
			this.setState({
				jobInfo: null,
				email: "",
				isModalOpen: false,
				isLoggedIn: false,
			});
		});
		socket.on(StudentSocketEvents.UPDATE_JOB, (jobInfo: JobInfo) => {
			if (jobInfo.status === "completed" || jobInfo.status === "rejected") {
				localStorage.removeItem("loginEmail");
			}
			this.setState({ ...this.getStateFromJob(jobInfo) });
		});

		socket.on(
			StudentSocketEvents.UPDATE_SCREENER,
			(data: { screenerCount: number }) => {
				this.setState({ onlineScreener: data.screenerCount });
				console.log("Live screener count:", data.screenerCount);
			}
		);

		socket.on(StudentSocketEvents.REMOVED_JOB, () => {
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
				this.props.history.replace("/");
			}
		});

		socket.on(
			StudentSocketEvents.LOGIN,
			(data: { success: boolean; jobInfo: JobInfo }) => {
				if (!data.success) {
					const hasEmailInURL = this.props.match.params.email ? true : false;

					this.setState({
						isLoggedIn: false,
						pendingLogin: false,
						loginError: hasEmailInURL
							? null
							: "Wir konnten keine Student*innen mit dieser E-Mail finden.",
					});

					if (this.props.match.params.email) {
						this.props.history.replace("/");
					}
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

				this.props.history.push("/queue/" + data.jobInfo.email);
			}
		);
	}

	handleLogin = (email: string) => {
		socket.emit("login", { email });
	};

	handleLogout = () => {
		localStorage.removeItem("loginEmail");
		socket.emit("logout", { email: "" });
		this.props.history.push("/");
		this.setState({
			jobInfo: null,
			email: "",
			isModalOpen: false,
			isLoggedIn: false,
		});
	};

	resetError = () => {
		this.setState({ error: null });
	};

	componentWillUnmount() {
		socket.close();
	}

	render() {
		const value: IProviderProps = {
			isLoggedIn: this.state.isLoggedIn,
			pendingLogin: this.state.pendingLogin,
			jobInfo: this.state.jobInfo,
			loginError: this.state.loginError,
			onlineScreener: this.state.onlineScreener,
			handleLogin: this.handleLogin,
			handleLogout: this.handleLogout,
			resetError: this.resetError,
		};
		return (
			<ApiContext.Provider value={value}>
				{this.props.children}
			</ApiContext.Provider>
		);
	}
}

export default withRouter(ApiContextComponent);
export { ApiContext };
