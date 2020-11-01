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
					Ich habe meinen Statusnachweis.{" "}
					<Tooltip title="Wir werden dich bitten, deinen Statusausweis kurz in die Kamera zu halten. Wenn du Student*in bist, reicht als Statusausweis dein Studierendenausweis oder ein ähnlicher Nachweis der bezeugt, dass du in diesem oder im letzten Semester an einer Hochschule  eingeschrieben bist. Wenn du kein*e Student*in bist, so bereite bitte einen Lichtbildausweis, wie Führerschein oder Personalausweis vor. Du kannst gerne alles außer Name und Bild abkleben oder abdecken. Hast du dich zum 1:1-Projektcoaching angemeldet und bist kein*e Student*in, so lege bitte außerdem deinen Jugend forscht-Nachweis bereit.">
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
					überprüfe vorher, ob deine Kamera und dein Mikrofon in Jitsi
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
