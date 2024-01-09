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
	const [messageInfo, setMessageInfo] = useState({
		message: null,
		type: null,
	});

	useEffect(() => {
		personService.getAll().then((initialPersons) => {
			setPersons(initialPersons);
		});
	}, []);

	const showMessage = (message, type) => {
		setMessageInfo({ message, type });
		setTimeout(() => {
			setMessageInfo({ message: null, type: null });
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
					showMessage(`Updated ${returnedPerson.name}`, "success");
				} catch (error) {
					console.error("Error updating person:", error);
					showMessage(error.response.data.error, "error");
				}
			}
		} else {
			const newPerson = { name: newName, number: newNumber };
			try {
				const returnedPerson = await personService.create(newPerson);
				setPersons(persons.concat(returnedPerson));
				showMessage(`Added ${returnedPerson.name}`, "success");
			} catch (error) {
				console.error("Error adding person:", error);
				showMessage(error.response.data.error, "error");
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
				await personService.deletePerson(id);
				setPersons(persons.filter((person) => person.id !== id));
				showMessage(`Deleted ${personToDelete.name}`, "success"); // Specify 'success' type
			} catch (error) {
				console.error("Error deleting person:", error);
				showMessage(
					`Information on ${personToDelete.name} has already been removed from server`,
					"error" // Specify 'error' type
				);
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
			<Notification message={messageInfo.message} type={messageInfo.type} />

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
