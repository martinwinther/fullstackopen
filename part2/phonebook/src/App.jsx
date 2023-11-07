import { useState, useEffect } from "react";

const App = (props) => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");
	const [filteredPersons, setFilteredPersons] = useState([]);

	useEffect(() => {
		// Filter the persons based on the searchName
		const filtered = persons.filter((person) =>
			person.name.toLowerCase().includes(searchName.toLowerCase())
		);
		setFilteredPersons(filtered);
	}, [persons, searchName]);

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

		// Update both the persons and filteredPersons arrays
		setPersons(persons.concat(nameObject));
		setNewName("");
		setNewNumber("");

		// Refilter the list based on the updated searchName
		const filtered = persons.filter((person) =>
			person.name.toLowerCase().includes(searchName.toLowerCase())
		);
		setFilteredPersons(filtered);
	};

	const handleNameChange = (event) => {
		setNewName(event.target.value);
	};

	const handleNumberChange = (event) => {
		setNewNumber(event.target.value);
	};

	const handleSearchChange = (event) => {
		setSearchName(event.target.value);
	};

	return (
		<div>
			<h2>Phonebook</h2>
			filter shown with{" "}
			<input value={searchName} onChange={handleSearchChange}></input>
			<h2>add a new</h2>
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
				{filteredPersons.map((person, index) => (
					<li key={index}>
						{person.name} {person.number}
					</li>
				))}
			</ul>
		</div>
	);
};

export default App;
