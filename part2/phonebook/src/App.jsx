import { useState } from "react";

const App = (props) => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");

	const checkDuplicate = (name) => {
		return persons.some((person) => person.name === name);
	};

	const addName = (event) => {
		event.preventDefault();

		// Check for duplicates using the checkDuplicate function
		if (checkDuplicate(newName)) {
			alert(`${newName} is already added to the phonebook`);
			return; // Exit the function if it's a duplicate
		}

		const nameObject = {
			name: newName,
			number: newNumber,
		};
		setPersons(persons.concat(nameObject));
		setNewName("");
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={addName}>
				name:
				<input value={newName} onChange={handleNameChange} />
				<input value={newNumber} onChange={handleNumberChange} />
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			<ul
				style={{
					listStyleType: "none",
					padding: 0,
					margin: 0,
					textAlign: "left",
				}}>
				{persons.map((person, index) => (
					<li key={index}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
