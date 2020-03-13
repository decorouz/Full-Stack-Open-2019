import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Weather from './components/Weather';
import Country from './components/Country';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then(response => {
      setCountries(response.data);
    });
  }, []);

  const onChangeHandler = event => {
    setSearchQuery(event.target.value);
  };

  const showCountryHandler = name => {
    setSearchQuery(name);
  };

  const renderCountries = () => {
    const filteredCountry = countries.filter(country =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const country = filteredCountry[0];

    if (!searchQuery) {
      return;
    }

    if (filteredCountry.length === 1) {
      return (
        <>
          <Country country={country} />
          <Weather city={country.capital} />
        </>
      );
    }

    if (filteredCountry.length <= 10) {
      return filteredCountry.map(filter => (
        <div key={filter.alpha3Code}>
          {filter.name}{' '}
          <button onClick={() => showCountryHandler(filter.name)}>show</button>{' '}
        </div>
      ));
    }

    if (filteredCountry.length > 10)
      return <p>Too many matches, specify another filter</p>;
  };

  return (
    <>
      <h1>Basic Country Data</h1>
      find countries <input value={searchQuery} onChange={onChangeHandler} />
      <div>{renderCountries()}</div>
    </>
  );
};

export default App;
