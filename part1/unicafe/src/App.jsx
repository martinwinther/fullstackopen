import { useState } from "react";

// Button component for submitting feedback
const Button = ({ text, handleClick }) => {
	return <button onClick={handleClick}>{text}</button>;
};

// StatisticLine component for displaying a single statistic
const StatisticLine = ({ text, value }) => {
	return (
		<div>
			{text} {value}
		</div>
	);
};

// Statistics component for displaying all statistics
const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const average = all === 0 ? 0 : (good - bad) / all;
	const positive = all === 0 ? 0 : (good / all) * 100;

	return (
		<div>
			<h1>statistics</h1>
			{all > 0 ? (
				<div>
					<StatisticLine text="good" value={good} />
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={all} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={`${positive} %`} />
				</div>
			) : (
				<div>No feedback given</div>
			)}
		</div>
	);
};

// Main App component
const App = () => {
	const [good, setGood] = useState(0);
	const [neutral, setNeutral] = useState(0);
	const [bad, setBad] = useState(0);

	return (
		<div>
			<h1>give feedback</h1>
			<Button text="good" handleClick={() => setGood(good + 1)} />
			<Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
			<Button text="bad" handleClick={() => setBad(bad + 1)} />

			{/* Using the Statistics component */}
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
