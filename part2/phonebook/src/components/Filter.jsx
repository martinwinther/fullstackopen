const Filter = ({ searchName, handleSearchChange }) => {
	return <input value={searchName} onChange={handleSearchChange}></input>;
};
export default Filter;
