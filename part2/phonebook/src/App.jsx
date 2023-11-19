import axios from "axios";
import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
	const [persons, setPersons] = useState([]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");
	const [successMessage, setSuccessMessage] = useState(null);

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const showSuccessMessage = (message) => {
		setSuccessMessage(message);
		setTimeout(() => {
			setSuccessMessage(null);
		}, 5000);
	};

	const addOrUpdatePerson = async () => {
		const personExists = persons.find((person) => person.name === newName);

		if (personExists) {
			if (
				window.confirm(
					`${newName} is already added to the phonebook, replace the old number with a new one?`
				)
			) {
				try {
					const updatedPerson = { ...personExists, number: newNumber };
					const returnedPerson = await personService.update(
						personExists.id,
						updatedPerson
					);
					setPersons(
						persons.map((p) =>
							p.id === returnedPerson.id ? returnedPerson : p
						)
					);
					showSuccessMessage(`Updated ${returnedPerson.name}`);
				} catch (error) {
					console.error("Error updating person:", error);
				}
			}
		} else {
			const newPerson = { name: newName, number: newNumber };
			try {
				const returnedPerson = await personService.create(newPerson);
				setPersons(persons.concat(returnedPerson));
				showSuccessMessage(`Added ${returnedPerson.name}`);
			} catch (error) {
				console.error("Error adding person:", error);
			}
		}
		setNewName("");
		setNewNumber("");
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

	const handleDelete = async (id) => {
		const personToDelete = persons.find((person) => person.id === id);
		if (window.confirm(`Delete ${personToDelete.name}?`)) {
			try {
				await personService.update(id, { ...personToDelete, number: "" });
				setPersons(persons.filter((person) => person.id !== id));
			} catch (error) {
				console.error("Error deleting person:", error);
			}
		}
	};

	// Filter persons directly in the render
	const filteredPersons = persons.filter((person) =>
		person.name.toLowerCase().includes(searchName.toLowerCase())
	);

	return (
		<div>
			<h2>Phonebook</h2>
			<Notification message={successMessage} />
			<Filter searchName={searchName} handleSearchChange={handleSearchChange} />
			<h2>Add a new</h2>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addName={addOrUpdatePerson}
			/>
			<h2>Numbers</h2>
			<ul
				style={{
					listStyleType: "none",
					padding: 0,
					margin: 0,
					textAlign: "left",
				}}>
				{filteredPersons.map((person) => (
					<Persons
						key={person.name}
						person={person}
						handleDelete={handleDelete}
					/>
				))}
			</ul>
		</div>
	);
};

export default App;
