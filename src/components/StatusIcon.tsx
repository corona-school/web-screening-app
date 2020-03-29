import React from "react";
import BounceLoader from "react-spinners/BounceLoader";
import CompleteIcon from "../icons/verifyIcon.svg";
import RejectedIcon from "../icons/cancel-color-filled.svg";

const IconMap = new Map([
	[
		"waiting",
		<div className="loading-icon">
			<BounceLoader size={150} color={"#ed6b66"} loading={true} />
		</div>
	],
	[
		"active",
		<div className="loading-icon">
			<BounceLoader size={150} color={"#ed6b66"} loading={true} />
		</div>
	],
	[
		"completed",
		<img
			style={{ marginBottom: "32px" }}
			src={CompleteIcon}
			alt="Verify Icon"
		/>
	],
	[
		"rejected",
		<img
			width={140}
			style={{ marginBottom: "32px" }}
			src={RejectedIcon}
			alt="Rejected Icon"
		/>
	]
]);

export { IconMap };
