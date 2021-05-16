import React from "react";

const Title = () => <h1>Web development curriculum</h1>

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

const CoursesList = ({courses}) => {
  return (
    <div>
      {courses.map((course) => (
        <Course key={course.id} course={course}></Course>
      ))}
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
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
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <Title/>
      <CoursesList courses={courses}/>
    </div>
  )
    
};

export default App;
