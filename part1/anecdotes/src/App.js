import React, { useState } from "react";

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;
const DisplayVote = (props) => <div>has {props.vote} votes</div>;
const Title = ({ text }) => <h1>{text}</h1>;
const Anecdote = ({ anecdote }) => <div>{anecdote}</div>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
  ];

  const [selected, setSelected] = useState(0);
  const [vote, setVote] = useState(new Array(anecdotes.length).fill(0));

  const nextPhrase = () => {
    setSelected(Math.floor(Math.random() * (anecdotes.length - 1)));
  };

  const votePhrase = () => {
    const copy = [...vote];
    copy[selected] += 1;
    setVote(copy);
  };

  const mostVotes = Math.max.apply(null, vote);
  const mostVotesIndex = vote.indexOf(mostVotes);

  return (
    <div>
      <Title text="Anecdote of the day" />
      <Anecdote anecdote={anecdotes[selected]} />
      <DisplayVote vote={vote[selected]} />
      <Button onClick={votePhrase} text="vote" />
      &nbsp;
      <Button onClick={nextPhrase} text="next anecdote" />
      <Title text="Anecdote with most votes" />
      <Anecdote anecdote={anecdotes[mostVotesIndex]} />
      <DisplayVote vote={mostVotes} />
    </div>
  );
};

export default App;
