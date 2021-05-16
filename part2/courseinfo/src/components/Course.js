import React from "react";

const Header = ({ course }) => {
  return <h2>{course.name}</h2>;
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

export default Course;
