import React from "react";
import Header from "./Header";
import ProcedureIcon from "../icons/procedureIcon.svg";
import { Link } from "react-router-dom";
import "./Procedure.scss";

const Procedure = () => {
	return (
		<div className="container">
			<Header />
			<div className="main">
				<div className="form-container">
					<div style={{ width: "100%", textAlign: "left" }}>
						<Link to="/"> zurück</Link>
					</div>
					<img
						style={{ marginBottom: "32px", height: "160px" }}
						src={ProcedureIcon}
						alt="Verify Icon"
					/>
					<h1 className="headline">Der Ablauf</h1>
					<div className="procedure-text">
						<p>
							Wir möchten dich in einem kurzen Videogespräch kennenlernen. In
							dem Gespräch fragen wir nach deinem Studierendemausweis, reden
							kurz über deine angegebenen Fächer und du kannst deine Fragen
							loswerden.
						</p>
					</div>
					<div className="procedure-container">
						<div className="procedure-item">
							<div className="procedure-number">1</div>
							<div className="procedure-text">
								Du stellst dich in der digitalen Warteschlange an.
							</div>
						</div>
						<div className="procedure-item">
							<div className="procedure-number">2</div>
							<div className="procedure-text">
								Wenn du dran bist, wird dir ein Link zum Videogrspräch
								geschickt.
							</div>
						</div>
						<div className="procedure-item">
							<div className="procedure-number">3</div>
							<div className="procedure-text">
								Anschließend führst du dein Screeninggespräch mit uns.
							</div>
						</div>
						<div className="procedure-item">
							<div className="procedure-number">4</div>
							<div className="procedure-text">
								Du wirst freigeschalten und bekommst ein*e Schüler*in gematcht!
							</div>
						</div>
					</div>
					<div className="procedure-text">
						<p>
							Bitte plane ungefähr 15-20min für den ganzen Prozess ein. In der
							Warteschlange wird dir auch eine geschätzte Wartezeit angezeigt.
						</p>
					</div>

					<Link to="/checklist">
						<button className={"button"}>Weiter</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Procedure;
