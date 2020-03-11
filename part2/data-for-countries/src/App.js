import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

  const filtered = !searchQuery
    ? []
    : countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

  const renderCountries = () => {
    console.log(filtered);
    if (filtered.length === 1) {
      const { name, capital, population, languages, flag } = filtered[0];
      return (
        <div>
          <h2>{name}</h2>
          <p>capital {capital} </p>
          <p>population {population}</p>
          <h3>languages</h3>
          <ul>
            {languages.map(language => (
              <li key={language.name}>{language.name}</li>
            ))}
          </ul>
          <img style={{ width: '150px' }} src={flag} alt="" />
        </div>
      );
    }

    if (filtered.length <= 10) {
      return filtered.map(filter => <div key={filter.name}>{filter.name}</div>);
    }

    if (filtered.length > 10)
      return <p>Too many matches, specify another filter</p>;
  };

  return (
    <>
      <h1>Finding Country</h1>
      find countries
      <input value={searchQuery} onChange={onChangeHandler} />
      <div>{renderCountries()}</div>
    </>
  );
};

export default App;
