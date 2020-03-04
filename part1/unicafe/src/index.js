import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = props => {
  return (
    <div>
      {props.text} {props.feedback}
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + neutral + bad;
  const average = (good + bad * -1) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return <div>No feedback given</div>;
  }

  return (
    <div>
      <table>
        <tbody>
          <tr>
            <td>
              <Statistic text="good" feedback={good} />
            </td>
          </tr>

          <tr>
            <td>
              <Statistic text="neutral" feedback={neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="bad" feedback={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="average" feedback={average} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="positive" feedback={positive} />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)} text="good" />
      <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button onClick={() => setBad(bad + 1)} text="bad" />

      <h3>Statistics</h3>

      <Statistics good={good} neutral={neutral} bad={bad} />
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
