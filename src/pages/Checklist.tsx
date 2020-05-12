import React from "react";
import { Link } from "react-router-dom";
import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import ChecklistIcon from "../icons/checklistIcon.svg";
import VerifyIcon from "../icons/verifyIcon.svg";
import { randomId } from "../utils/randomId";
import Button, { LinkButton } from "../components/Button";
import List from "../components/List";
import classes from "./Checklist.module.scss";

const Checklist = () => {
	return (
		<>
			<div style={{ width: "100%", textAlign: "left" }}>
				<Link to="/procedure"> zurück</Link>
			</div>
			<img
				style={{ marginBottom: "32px", height: "160px" }}
				src={ChecklistIcon}
				alt="Verify Icon"
			/>
			<h1 className={classes.headline}>Checkliste</h1>
			<div className="text">
				<p>
					Bitte überprüfe die folgenden Sachen, bevor du dich in die
					Warteschlange einträgst:
				</p>
			</div>
			<List>
				<List.Item
					itemNumber={
						<img style={{ width: "30px" }} src={VerifyIcon} alt="Verify Icon" />
					}>
					Ich nutze Chrome als Browser.
				</List.Item>
				<List.Item
					itemNumber={
						<img style={{ width: "30px" }} src={VerifyIcon} alt="Verify Icon" />
					}>
					Ich habe eine Webcam und ein Mikrofon.
				</List.Item>
				<List.Item
					itemNumber={
						<img style={{ width: "30px" }} src={VerifyIcon} alt="Verify Icon" />
					}>
					Ich habe meinen Studierendenausweis.{" "}
					<Tooltip title="Der Studierendenausweis dient dem Nachweis, dass du entweder im WiSe 19/20 an einer Hochschule eingeschrieben warst, bzw. es im SoSe 20 noch immer bist. Solltest du deinen Studierendenausweis nicht finden können, können auch andere Dokumente vorgelegt werden, die den Studierendenstatus zu den oben genannten Daten belegen. Bitte zeige diese dann in Kombination mit einem Lichtbildausweis vor.">
						<QuestionCircleOutlined className={classes.procedureSearchIcon} />
					</Tooltip>
				</List.Item>
				<List.Item
					itemNumber={
						<img style={{ width: "30px" }} src={VerifyIcon} alt="Verify Icon" />
					}>
					Ich kann Jitsi benutzen.
				</List.Item>
			</List>

			<div className="text">
				<p>
					Für die Videogespräche nutzen wir die Videoanwendung Jitsi. Bitte
					überprüfe vorher, ob deine Kamera und dein Mikrophon in Jitsi
					funktioniert.
				</p>
			</div>
			<div style={{ display: "flex" }}>
				<LinkButton inverse link={`https://meet.jit.si/${randomId(30)}`}>
					Jitsi testen
				</LinkButton>

				<Link to="/login">
					<Button>Weiter</Button>
				</Link>
			</div>
		</>
	);
};

export default Checklist;
