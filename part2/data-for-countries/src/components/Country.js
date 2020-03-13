import React from 'react';

const mapLanguages = languages =>
  languages.map(language => <li key={language.name}>{language.name}</li>);

const Country = ({ country }) => {
  const { name, capital, population, languages, flag } = country;
  return (
    <div>
      <h2>{name}</h2>
      <p>capital: {capital} </p>
      <p>population: {population}</p>
      <h3>languages</h3>
      <ul>{mapLanguages(languages)}</ul>
      <img style={{ width: '200px' }} src={flag} alt="" />
    </div>
  );
};

export default Country;
