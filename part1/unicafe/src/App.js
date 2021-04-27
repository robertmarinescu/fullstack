import React, {useState} from "react";

const Title = ({title}) => <h1>{title}</h1> 
const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>
const Statistics = (props) => <div>{props.text} {props.results}</div>

const NoFeedback = () => <div>No feedback given</div>

const App = () => {
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const handleGoodClick = () => {
    setGood(good + 1);
    setAll(all + 1);
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  }
  const handleBadClick = () => {
    setBad(bad + 1);
    setAll(all + 1);
  }

  const average = (good - bad) / all;
  const positive = (good * 100) / all;

  return(
    <div>
      <Title title="give feedback"></Title>
      <Button onClick={handleGoodClick} text="good"></Button>
      <Button onClick={handleNeutralClick} text="neutral"></Button>
      <Button onClick={handleBadClick} text="bad"></Button>

      <Title title="statistics"></Title>
      {
        !all 
          ? <NoFeedback/>
          : [
              <Statistics text="good" results={good}/>,
              <Statistics text="neutral" results={neutral}/>,
              <Statistics text="bad" results={bad}/>,
              <Statistics text="average" results={average > 0 ? average : 0}/>,
              <Statistics text="positive" results={positive > 0 ? positive : 0}/>
            ]
      }
    </div>
  )
}

export default App;
