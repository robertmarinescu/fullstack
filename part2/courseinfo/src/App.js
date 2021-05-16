import React from "react";

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Total = ({ course }) => {
  const total = course.parts.reduce((sum, numberOfExercises) => {
    return sum + numberOfExercises.exercises;
  }, 0);
  return <p style={{ fontWeight: "bold" }}>total of {total} exercises</p>;
};

const Part = ({ courseObject }) => {
  return (
    <p>
      {courseObject.name} {courseObject.exercises}
    </p>
  );
};

const Content = ({ courses }) => {
  return (
    <div>
      {courses.parts.map((course) => (
        <Part key={course.id} courseObject={course}></Part>
      ))}
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}></Header>
      <Content courses={course}></Content>
      <Total course={course}></Total>
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
      },
      {
        name: "Redux",
        exercises: 11,
        id: 4,
      }
    ],
  };

  return <Course course={course}></Course>;
};

export default App;
