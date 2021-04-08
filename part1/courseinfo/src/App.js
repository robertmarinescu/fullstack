import React from "react";

const App = () => {
  const course = "Half Stack application development";
  const part1 = {
    name: "Fundamentals of React",
    exercises: 10,
  };
  const part2 = {
    name: "Using props to pass data",
    exercises: 7,
  };
  const part3 = {
    name: "State of a component",
    exercises: 14,
  };

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

  const Content = (props) => {
    return (
      <div>
        <Part part={part1.name} exercise={part1.exercises} />
        <Part part={part2.name} exercise={part2.exercises} />
        <Part part={part3.name} exercise={part3.exercises} />
      </div>
    );
  };

  const Total = () => {
    return (
      <div>
        <p>
          Number of exercises{" "}
          {part1.exercises + part2.exercises + part3.exercises}
        </p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course}></Header>
      <Content />
      <Total />
    </div>
  );
};

export default App;
