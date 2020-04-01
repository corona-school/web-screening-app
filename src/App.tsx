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

interface State {
	email: string;
	isLoggedIn: boolean;
	pendingLogin: boolean;
	isModalOpen: boolean;
	jobInfo: JobInfo | null;
}

class App extends React.Component {
	state: State = {
		email: "",
		isLoggedIn: false,
		pendingLogin: false,
		isModalOpen: false,
		jobInfo: null
	};

	socket = io("https://corona-screening-backend-dev.herokuapp.com/");

	audio = new Audio("/media/redo.mp3");

	getStateFromJob(job: JobInfo) {
		if (job.status === "active") {
			this.audio.play();
		}
		return {
			jobInfo: job,
			isModalOpen: job.status === "active" ? true : false
		};
	}

	componentDidMount() {
		const email = localStorage.getItem("loginEmail");
		if (email) {
			this.setState({ pendingLogin: true });
			this.socket.emit("login", { email });
		}

		this.socket.on("updateJob", (jobInfo: JobInfo) => {
			console.log(jobInfo);

			this.setState({ ...this.getStateFromJob(jobInfo) });
		});

		this.socket.on("login", (data: { success: boolean; jobInfo: JobInfo }) => {
			localStorage.setItem("loginEmail", data.jobInfo.email);

			this.setState({
				...this.getStateFromJob(data.jobInfo),
				isLoggedIn: data.success,
				pendingLogin: false
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
			isLoggedIn: false
		});
	};
	render() {
		if (this.state.pendingLogin) {
			return (
				<div className="container">
					<Header isLoggedIn={false} handleLogout={this.handleLogout} />
					<BounceLoader size={150} color={"#ed6b66"} loading={true} />
				</div>
			);
		}
		return (
			<div className="container">
				<Header
					isLoggedIn={this.state.isLoggedIn}
					handleLogout={this.handleLogout}
				/>
				<div className="main">
					<div className="form-container">
						{this.state.isLoggedIn && this.state.jobInfo ? (
							<Queue
								jobInfo={this.state.jobInfo}
								handleLogout={this.handleLogout}
							/>
						) : (
							<LoginForm
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
