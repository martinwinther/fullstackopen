import { useState } from "react";

// Separate Statistics component
const Statistics = ({ good, neutral, bad }) => {
	const all = good + neutral + bad;
	const average = all === 0 ? 0 : (good - bad) / all;
	const positive = all === 0 ? 0 : (good / all) * 100;

	return (
		<div>
			<h1>statistics</h1>
			{all > 0 ? (
				<div>
					<div>good {good}</div>
					<div>neutral {neutral}</div>
					<div>bad {bad}</div>
					<div>all {all}</div>
					<div>average {average}</div>
					<div>positive {positive} %</div>
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
			<button onClick={() => setGood(good + 1)}>good</button>
			<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
			<button onClick={() => setBad(bad + 1)}>bad</button>

			{/* Using the Statistics component */}
			<Statistics good={good} neutral={neutral} bad={bad} />
		</div>
	);
};

export default App;
