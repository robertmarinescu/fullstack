import React from "react";

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
      },
      {
        name: "State of a component",
        exercises: 14,
      },
    ],
  };

  const Header = (props) => {
    return (
      <div>
        <h1>{props.course.name}</h1>
      </div>
    );
  };

  const Part = (props) => {
    return (
      <div>
        <p>
          {props.part} {props.exercises}
        </p>
      </div>
    );
  };

  const Content = (props) => {
    // console.log(props);
    const { partsObj } = props;
    return (
      <div>
        {/* <Part part={parts[0].name} exercise={parts[0].exercises} />
        <Part part={parts[1].name} exercise={parts[1].exercises} />
        <Part part={parts[2].name} exercise={parts[2].exercises} /> */}
        {partsObj.map((part, index) => {
          return (
            <Part part={part.name} exercises={part.exercises} key={index} />
          );
        })}
      </div>
    );
  };

  const Total = (props) => {
    let sum = 0;
    for (let part of course.parts) {
      sum += part.exercises;
    }
    console.log(sum);
    return (
      <div>
        <p>Number of exercises {sum}</p>
      </div>
    );
  };

  return (
    <div>
      <Header course={course}></Header>
      <Content partsObj={course.parts} />
      <Total parts={course.parts.exercises} />
    </div>
  );
};

export default App;
