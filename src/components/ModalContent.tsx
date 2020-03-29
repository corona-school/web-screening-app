import React from "react";
import "./ModalContent.scss";
import VideoCallImage from "../icons/videocall.svg";

interface Props {
	screenerName: string;
	jitsiLink?: string;
}

const ModalContent = ({ screenerName, jitsiLink }: Props) => {
	return (
		<div className="model-container">
			<img className="video-call" src={VideoCallImage} alt="video call" />
			<h1 className="headlien">Du bist dran!</h1>
			<div className="text">
				<span>{screenerName} wartet schon auf dich!</span>
			</div>

			<div className="buttonContainer">
				<a
					href={jitsiLink}
					className="link-button"
					target="_blank"
					rel="noopener noreferrer">
					Videoanruf starten
				</a>
			</div>
		</div>
	);
};

export default ModalContent;
