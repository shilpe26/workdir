import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTitle } from "../../hooks/useTitle";
import { FaPlay, FaPause, FaStop } from "react-icons/fa";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./pomoClock.css";

function PomoClock() {
	const location = useLocation();
	const { task } = location.state;
	const { title, description, time } = task;

	const clockInitalState = {
		isStarted: false,
		isPaused: false,
	};

	const [seconds, setSeconds] = useState(0);
	const [infoMessage, setInfoMessage] = useState("");
	const [setTimeoutId, setSetTimeoutId] = useState(null);
	const [clockState, setClockState] = useState(clockInitalState);
	const [pomoMode, setPomoMode] = useState("focus");

	const intervalTime = useRef(null);
	const secondsTime = useRef(0);

	const clockHandler = (key, value) => {
		setClockState((val) => ({ ...val, [key]: value }));
	};

	const switchMode = () => {
		if (intervalTime.current) clearInterval(intervalTime.current);

		setPomoMode((prev) => (prev === "focus" ? "break" : "focus"));

		if (pomoMode === "focus") {
			setInfoMessage("Break Mode");
			setSeconds(5 * 60);
			secondsTime.current = 5 * 60;
		} else {
			setInfoMessage("Focus Mode");
			setSeconds(time * 60);
			secondsTime.current = time * 60;
		}

		clockHandler("isStarted", false);
		clearMessage();
	};

	const clearMessage = () => {
		if (setTimeoutId) {
			clearTimeout(setTimeoutId);
		}

		const id = setTimeout(() => {
			setInfoMessage("");
		}, 2000);

		setSetTimeoutId(id);
	};

	const handleStart = () => {
		if (intervalTime.current) clearInterval(intervalTime.current);

		setInfoMessage("Clock Started");
		clearMessage();
		clockHandler("isStarted", true);

		intervalTime.current = setInterval(() => {
			if (secondsTime.current === 0) {
				clearInterval(intervalTime);
				switchMode();
			} else {
				secondsTime.current--;
				setSeconds(secondsTime.current);
			}
		}, 1000);
	};

	const pauseHandler = () => {
		if (clockState.isPaused) {
			handleStart();
			clockHandler("isPaused", false);
			setInfoMessage("Clock Resumed");
		} else {
			clearInterval(intervalTime.current);
			clockHandler("isPaused", true);
			setInfoMessage("Clock Paused");
		}

		clearMessage();
	};

	const restartHandler = () => {
		setSeconds(time * 60);
		secondsTime.current = time * 60;
		clearInterval(intervalTime.current);
		setInfoMessage("Clock reset");
		setClockState(clockInitalState);
		setPomoMode("focus");
		clearMessage();
	};

	useEffect(() => {
		setSeconds(time * 60);
		secondsTime.current = time * 60;
	}, [time]);

	const totalSeconds = pomoMode === "focus" ? time * 60 : 5 * 60;
	const secondsLeft = seconds % 60;
	const minutesLeft = Math.floor(seconds / 60);
	const percentValue = (seconds / totalSeconds) * 100;

	useTitle(
		`${minutesLeft}:${secondsLeft} ${
			pomoMode === "focus" ? "⏳" : "☕"
		}  WORKDIR`
	);
	return (
		<div>
			<main className="pomoclock-container my-44 mx-auto">
				<section className="pomoclock">
					<div className="pomoclock-bar my-4 mx-auto">
						<CircularProgressbar
							value={percentValue}
							text={`${minutesLeft}m:${secondsLeft}s`}
							counterClockwise={true}
							styles={{
								text: {
									fontSize: "1rem",
								},
								path: {
									stroke:
										pomoMode === "focus"
											? "hsl(242, 51%, 61%)"
											: "hsl(69, 58%, 89%)",
								},
								trail: {
									stroke:
										pomoMode === "focus"
											? "hsl(69, 58%, 89%)"
											: "hsl(242, 51%, 61%)",
								},
							}}
						/>
					</div>

					<div className="clock-btn grid my-8 mx-auto gap-4 text-center">
						<button
							className="btn btn-primary"
							onClick={handleStart}
							disabled={clockState.isStarted}
						>
							<span className="flex align-center justify-center">
								<FaPlay className="mt-2" /> Start
							</span>
						</button>

						<button
							className="btn btn-success"
							onClick={pauseHandler}
							disabled={!clockState.isStarted}
						>
							{clockState.isPaused ? (
								<span className="flex align-center justify-center">
									<FaPause className="mt-2" /> Resume
								</span>
							) : (
								<span className="flex align-center justify-center">
									<FaStop className="mt-2" /> Pause
								</span>
							)}
						</button>

						<button className="btn btn-info" onClick={restartHandler}>
							Reset
						</button>
					</div>

					{infoMessage && (
						<span className="info-message text-center text-3xl absolute p-4 rounded-md">
							{infoMessage}
						</span>
					)}
				</section>
				<Link to="/todo" className="mb-48">
					<section className="task-details p-4">
						<h1 className="task-title text-5xl font-semibold text-center underline">
							{title}
						</h1>
						<p className="task-description text-2xl mt-4">{description}</p>
					</section>
				</Link>
			</main>
		</div>
	);
}

export { PomoClock };
