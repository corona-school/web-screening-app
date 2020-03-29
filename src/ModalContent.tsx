import React from "react";
import "./ModalContent.scss";
import VideoCallImage from "./videocall.svg";

const ModalContent = ({
	closeModal,
	screenerName,
	jitsiLink
}: {
	closeModal: () => void;
	screenerName: string;
	jitsiLink?: string;
}) => {
	return (
		<div className="model-container">
			<img className="video-call" src={VideoCallImage} alt="video call" />
			<h1 className="headlien">Du bist dran!</h1>
			<div className="text">
				<span>
					{screenerName} wartet schon auf dich! Klicke auf dem Link, um den
					Videocall zu starten.
				</span>
			</div>

			<div className="buttonContainer">
				<button onClick={closeModal} id="close">
					Close
				</button>
				<a
					href={jitsiLink}
					className="link-button"
					target="_blank"
					rel="noopener noreferrer">
					Open Videocall
				</a>
			</div>
		</div>
	);
};

export default ModalContent;
