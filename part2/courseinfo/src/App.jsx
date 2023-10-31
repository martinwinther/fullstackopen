const Header = ({ course }) => {
	return <h1>{course.name}</h1>;
};

const Total = ({ parts }) => {
	// Calculate the total number of exercises
	const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);

	return (
		<p>
			<b>total of {totalExercises} exercises</b>
		</p>
	);
};

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) =>
	parts.map((part) => <Part key={part.id} part={part} />);

const Course = ({ course }) => (
	<div>
		<Header course={course} />
		<Content parts={course.parts} />
	</div>
);

const App = () => {
	const course = {
		id: 1,
		name: "Half Stack application development",
		parts: [
			{
				name: "Fundamentals of React",
				exercises: 10,
				id: 1,
			},
			{
				name: "Using props to pass data",
				exercises: 7,
				id: 2,
			},
			{
				name: "State of a component",
				exercises: 14,
				id: 3,
			},
		],
	};

	return (
		<div>
			<Course course={course} />
			<Total parts={course.parts} />
		</div>
	);
};

export default App;
