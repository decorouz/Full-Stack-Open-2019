import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const all = good + neutral + bad;
  const average = (good + bad * -1) / all;
  const positive = (good / all) * 100;

  return (
    <>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>

      <h3>Statistics</h3>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>average {average}</div>
      <div>positive {positive} %</div>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
