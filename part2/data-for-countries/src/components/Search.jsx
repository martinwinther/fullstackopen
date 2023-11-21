const Search = ({ onSearchChange }) => {
	return (
		<div>
			<input
				type="text"
				onChange={(e) => onSearchChange(e.target.value)}
				placeholder="Search for a country..."
				className="search-input"
			/>
		</div>
	);
};

export default Search;
