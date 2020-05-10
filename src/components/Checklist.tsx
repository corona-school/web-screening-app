import React from "react";
import Header from "./Header";
import ChecklistIcon from "../icons/checklistIcon.svg";
import VerifyIcon from "../icons/verifyIcon.svg";
import { Link } from "react-router-dom";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./Procedure.scss";
import { randomId } from "../utils/randomId";
import { Tooltip } from "antd";

const Checklist = () => {
	return (
		<div className="container">
			<Header />
			<div className="main">
				<div className="form-container">
					<div style={{ width: "100%", textAlign: "left" }}>
						<Link to="/procedure"> zurück</Link>
					</div>
					<img
						style={{ marginBottom: "32px", height: "160px" }}
						src={ChecklistIcon}
						alt="Verify Icon"
					/>
					<h1 className="headline">Checkliste</h1>
					<div className="procedure-text">
						<p>
							Bitte überprüfe die folgenden Sachen, bevor du dich in die
							Warteschlange einträgst:
						</p>
					</div>
					<div className="procedure-container">
						<div className="procedure-item">
							<div className="procedure-number">
								<img
									style={{ width: "30px" }}
									src={VerifyIcon}
									alt="Verify Icon"
								/>
							</div>
							<div className="procedure-text">
								Ich nutze Chrome als Browser.
							</div>
						</div>
						<div className="procedure-item">
							<div className="procedure-number">
								<img
									style={{ width: "30px" }}
									src={VerifyIcon}
									alt="Verify Icon"
								/>
							</div>
							<div className="procedure-text">
								Ich habe eine Webcam und ein Mikrofon.
							</div>
						</div>
						<div className="procedure-item">
							<div className="procedure-number">
								<img
									style={{ width: "30px" }}
									src={VerifyIcon}
									alt="Verify Icon"
								/>
							</div>
							<div className="procedure-text">
								Ich habe meinen Studierendenausweis.{" "}
								<Tooltip title="Der Studierendenausweis dient dem Nachweis, dass du entweder im WiSe 19/20 an einer Hochschule eingeschrieben warst, bzw. es im SoSe 20 noch immer bist. Solltest du deinen Studierendenausweis nicht finden können, können auch andere Dokumente vorgelegt werden, die den Studierendenstatus zu den oben genannten Daten belegen. Bitte zeige diese dann in Kombination mit einem Lichtbildausweis vor.">
									<QuestionCircleOutlined className="procedure-search-icon" />
								</Tooltip>
							</div>
						</div>
						<div className="procedure-item">
							<div className="procedure-number">
								<img
									style={{ width: "30px" }}
									src={VerifyIcon}
									alt="Verify Icon"
								/>
							</div>
							<div className="procedure-text">Ich kann Jitsi benutzen.</div>
						</div>
					</div>

					<div className="procedure-text">
						<p>
							Für die Videogespräche nutzen wir die Videoanwendung Jitsi. Bitte
							überprüfe vorher, ob deine Kamera und dein Mikrophon in Jitsi
							funktioniert.
						</p>
					</div>
					<div style={{ display: "flex" }}>
						<div className="buttonContainer">
							<a
								href={`https://meet.jit.si/${randomId(30)}`}
								style={{ width: "200px", textAlign: "center" }}
								className="abortButton"
								target="_blank"
								rel="noopener noreferrer">
								Jitsi testen
							</a>
						</div>

						<Link to="/login">
							<button className={"button"}>Weiter</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Checklist;
