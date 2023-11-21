import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./components/Search";
import CountryList from "./components/CountryList";
import CountryDetail from "./components/CountryDetail";
import Weather from "./components/Weather";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");
	const [selectedCountry, setSelectedCountry] = useState(null);

	useEffect(() => {
		if (search) {
			axios
				.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
				.then((response) => {
					const filteredCountries = response.data.filter((country) =>
						country.name.common.toLowerCase().includes(search.toLowerCase())
					);
					setCountries(filteredCountries);
					setSelectedCountry(null);
				})
				.catch((error) => console.error(error));
		}
	}, [search]);

	const handleSearchChange = (searchTerm) => {
		setSearch(searchTerm);
	};

	const handleSelectCountry = (country) => {
		setSelectedCountry(country);
	};

	return (
		<div>
			<Search onSearchChange={handleSearchChange} />
			{countries.length > 10 ? (
				<p>Please refine your search</p>
			) : selectedCountry ? (
				<>
					<CountryDetail country={selectedCountry} />
					<Weather capital={selectedCountry.capital[0]} />
				</>
			) : (
				<CountryList
					countries={countries}
					onSelectCountry={handleSelectCountry}
				/>
			)}
		</div>
	);
};

export default App;
