const CountryDetail = ({ country }) => {
	const languages = country.languages ? Object.values(country.languages) : [];
	const flagUrl = country.flags ? country.flags.svg : ""; // Using SVG flag URL

	return (
		<div className="country-detail">
			<h1>{country.name.common}</h1>
			<p>Capital: {country.capital}</p>
			<p>Area: {country.area}</p>
			<p>Languages:</p>
			<ul>
				{languages.map((language, index) => (
					<li key={index}>{language}</li> // Using index as key since language names are unique
				))}
			</ul>

			{flagUrl && (
				<img
					src={flagUrl}
					alt={`Flag of ${country.name.common}`}
					style={{ width: "150px" }}
				/>
			)}
		</div>
	);
};

export default CountryDetail;
