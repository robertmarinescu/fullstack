import React, { useState } from "react";

const Title = ({ title }) => <h1>{title}</h1>;
const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;
const Statistics = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.results}</td>
  </tr>
);

const NoFeedback = () => (
  <tr>
    <td>No feedback given</td>
  </tr>
);

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
  };
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };
  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  const average = (good - bad) / all;
  const positive = (good * 100) / all;

  const statisticsArray = [
    { text: "good", results: good },
    { text: "neutral", results: neutral },
    { text: "bad", results: bad },
    { text: "all", results: all },
    { text: "average", results: average > 0 ? average : 0 },
    { text: "positive", results: `${positive > 0 ? positive : 0} %` },
  ];

  return (
    <div>
      <Title title="give feedback"></Title>
      <Button onClick={handleGoodClick} text="good"></Button>
      <Button onClick={handleNeutralClick} text="neutral"></Button>
      <Button onClick={handleBadClick} text="bad"></Button>

      <Title title="statistics"></Title>
      <table>
        <tbody>
          {!all ? (
            <NoFeedback />
          ) : (
            statisticsArray.map((value, index) => (
              <Statistics
                key={index}
                text={value.text}
                results={value.results}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default App;
