const Course = ({ course }) => (
	<div>
		<Header course={course} />
		<Content parts={course.parts} />
		<Total parts={course.parts} />
	</div>
);

const Header = ({ course }) => {
	return <h1>{course.name}</h1>;
};

const Part = ({ part }) => (
	<p>
		{part.name} {part.exercises}
	</p>
);

const Content = ({ parts }) => (
	<div>
		{parts.map((part) => (
			<Part key={part.id} part={part} />
		))}
	</div>
);

const Total = ({ parts }) => {
	const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
	return <p>Total number of exercises: {totalExercises}</p>;
};

export default Course;
