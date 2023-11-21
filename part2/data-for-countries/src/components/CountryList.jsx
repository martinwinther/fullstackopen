const CountryList = ({ countries, onSelectCountry }) => {
	return (
		<div className="country-list">
			{countries.map((country) => (
				<p key={country.cca3}>
					{country.name.common}{" "}
					<button onClick={() => onSelectCountry(country)}>Show</button>
				</p>
			))}
		</div>
	);
};

export default CountryList;
