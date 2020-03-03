// My task is to implement a web application for collecting customer feedback.

import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const Statistic = props => {
  return (
    <div>
      {props.text} {props.feedBack}
    </div>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const average = (good + bad * -1) / all;
  const positive = (good / all) * 100;

  if (all === 0) {
    return 'No feedback provided';
  }

  return (
    <>
      <table>
        <tbody>
          <tr>
            <td>
              <Statistic text="good" feedBack={good} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="neutral" feedBack={neutral} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="bad" feedBack={bad} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="all" feedBack={all} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="average" feedBack={average} />
            </td>
          </tr>
          <tr>
            <td>
              <Statistic text="positive" feedBack={positive} />
            </td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <Button onClick={() => setGood(good + 1)} text="good" />
        <Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button onClick={() => setBad(bad + 1)} text="bad" />
      </div>

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
