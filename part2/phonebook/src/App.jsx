import axios from "axios";
import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/persons";
const App = () => {
	const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
	const [newName, setNewName] = useState("");
	const [newNumber, setNewNumber] = useState("");
	const [searchName, setSearchName] = useState("");
	const [filteredPersons, setFilteredPersons] = useState([]);

	useEffect(() => {
		personService.getAll().then((initalPersons) => {
			setPersons(initalPersons);
		});
	}, []);

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
		personService.create(nameObject).then((returnedPerson) => {
			setPersons(persons.concat(returnedPerson));
			setNewName("");
			setNewNumber("");
		});

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

	const handleDelete = (id) => {
		// Find the person to be deleted from the state∂
		const personToDelete = persons.find((person) => person.id === id);

		// Confirm with the user before deleting
		if (window.confirm(`Delete ${personToDelete.name}?`)) {
			personService
				.update(id, { ...personToDelete, number: "" })
				.then(() => {
					setPersons(persons.filter((person) => person.id !== id));
				})
				.catch((error) => {
					console.error("Error deleting person:", error);
				});
		}
	};

	return (
		<div>
			<h2>Phonebook</h2>
			filter:{" "}
			<Filter
				searchName={searchName}
				handleSearchChange={handleSearchChange}
			/>{" "}
			<h2>add a new</h2>
			<PersonForm
				newName={newName}
				newNumber={newNumber}
				handleNameChange={handleNameChange}
				handleNumberChange={handleNumberChange}
				addName={addName}
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
