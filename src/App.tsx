import React, { useContext, useState, useEffect } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import Header from "./components/Header";
import "./App.scss";
import Queue from "./pages/Queue";
import Modal from "react-modal";
import ModalContent from "./components/ModalContent";
import { ApiContext } from "./api/ApiContext";

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

const App = () => {
	const [isModalOpen, setModalOpen] = useState(false);
	const context = useContext(ApiContext);

	const job = context?.jobInfo;

	const playAudio = () => {
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
	};

	useEffect(() => {
		if (job && job.status === "active") {
			setModalOpen(true);
			playAudio();
		}
		if (
			job &&
			isModalOpen &&
			(job.status === "completed" || job.status === "rejected")
		) {
			setModalOpen(false);
		}
	}, [job]);

	if (!context || context?.pendingLogin) {
		return (
			<div className="container">
				<Header />
				<BounceLoader size={150} color={"#ed6b66"} loading={true} />
			</div>
		);
	}

	return (
		<>
			{context?.isLoggedIn && context?.jobInfo && (
				<Queue
					isNotCompleted={
						job ? job.status === "waiting" || job.status === "active" : true
					}
					isLoggedIn={context?.isLoggedIn}
					handleLogout={context?.handleLogout}
					jobInfo={context?.jobInfo}
					onlineScreener={context?.onlineScreener}
				/>
			)}

			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => {
					setModalOpen(false);
				}}
				style={customStyles}
				contentLabel="Verifikation">
				<ModalContent
					screenerName={context?.jobInfo?.assignedTo?.firstname || "Max"}
					jitsiLink={context?.jobInfo?.data.jitsi}
				/>
			</Modal>
		</>
	);
};

export default App;
