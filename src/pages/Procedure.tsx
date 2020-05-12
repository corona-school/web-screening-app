import React from "react";
import ProcedureIcon from "../icons/procedureIcon.svg";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import List from "../components/List";

const Procedure = () => {
	return (
		<>
			<div style={{ width: "100%", textAlign: "left" }}>
				<Link to="/"> zurück</Link>
			</div>
			<img
				style={{ marginBottom: "32px", height: "160px" }}
				src={ProcedureIcon}
				alt="Verify Icon"
			/>
			<h1 className="headline">Der Ablauf</h1>
			<div className="text">
				<p>
					Wir möchten dich in einem kurzen Videogespräch kennenlernen. In dem
					Gespräch fragen wir nach deinem Studierendemausweis, reden kurz über
					deine angegebenen Fächer und du kannst deine Fragen loswerden.
				</p>
			</div>
			<List>
				<List.Item itemNumber={1}>
					Du stellst dich in der digitalen Warteschlange an.
				</List.Item>
				<List.Item itemNumber={2}>
					Wenn du dran bist, wird dir ein Link zum Videogrspräch geschickt.
				</List.Item>
				<List.Item itemNumber={3}>
					Anschließend führst du dein Screeninggespräch mit uns.
				</List.Item>
				<List.Item itemNumber={4}>
					Du wirst freigeschalten und bekommst ein*e Schüler*in gematcht!
				</List.Item>
			</List>

			<div className="text">
				<p>
					Bitte plane ungefähr 15-20min für den ganzen Prozess ein. In der
					Warteschlange wird dir auch eine geschätzte Wartezeit angezeigt.
				</p>
			</div>

			<Link to="/checklist">
				<Button>Weiter</Button>
			</Link>
		</>
	);
};

export default Procedure;
