import React from "react";

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course}</h1>
      </div>
    );
  };

  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercise}
        </p>
      </div>
    );
  };

  const Content = () => {
    return (
      <div>
        <Part part={part1} exercise={exercises1} />
        <Part part={part2} exercise={exercises2} />
        <Part part={part3} exercise={exercises3} />
      </div>
    );
  };

  const Total = (props) => {
    return (
      <div>
        <p>
          Number of exercises{" "}
          {props.exercises1 + props.exercises2 + props.exercises3}
        </p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course}></Header>
      <Content />
      <Total
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
    </div>
  );
};

export default App;
