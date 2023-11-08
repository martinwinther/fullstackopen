const PersonForm = ({
	newName,
	newNumber,
	handleNameChange,
	handleNumberChange,
	addName,
}) => {
	return (
		<form onSubmit={addName}>
			name:
			<input value={newName} onChange={handleNameChange} />
			<input value={newNumber} onChange={handleNumberChange} />
			<div>
				<button type="submit">add</button>
			</div>
		</form>
	);
};
export default PersonForm;
