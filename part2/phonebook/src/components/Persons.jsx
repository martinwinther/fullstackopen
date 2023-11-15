const Persons = ({ person, handleDelete }) => {
	return (
		<li>
			{person.name} {person.number}{" "}
			<button onClick={() => handleDelete(person.id)}>delete</button>
		</li>
	);
};
export default Persons;
