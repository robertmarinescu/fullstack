import React from "react";
import ReactDOM from "react-dom";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const sum =
    course.parts[0].exercises +
    course.parts[1].exercises +
    course.parts[2].exercises;
  return <p>Number of exercises {sum}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = ({ courses }) => {
  return (
    <div>
      {
        courses.parts.map(course => <Part key={course.id} part={course}></Part>)
      }
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content courses={course}></Content>
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      }
    ],
  };

  return <Course course={course}></Course>;
};

ReactDOM.render(<App />, document.getElementById("root"));
