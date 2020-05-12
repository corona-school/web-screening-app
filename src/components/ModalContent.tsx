import React from "react";
import classes from "./ModalContent.module.scss";
import VideoCallImage from "../icons/videocall.svg";

interface Props {
	screenerName: string;
	jitsiLink?: string;
}

const ModalContent = ({ screenerName, jitsiLink }: Props) => {
	return (
		<div className={classes.modelContainer}>
			<img
				className={classes.videoCall}
				src={VideoCallImage}
				alt="video call"
			/>
			<h1 className={classes.headline}>Du bist dran!</h1>
			<div className={classes.text}>
				<span>{screenerName} wartet schon auf dich!</span>
			</div>

			<div className={classes.buttonContainer}>
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
