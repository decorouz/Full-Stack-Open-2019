import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ title }) => <h1>{title}</h1>;

const Part = ({ content }) => {
  return (
    <>
      <p>
        {content.name} {content.exercises}
      </p>
    </>
  );
};

const Content = ({ contents }) => {
  const partContent = () =>
    contents.map(content => <Part key={content.id} content={content} />);

  return <div>{partContent()}</div>;
};

const Total = ({ parts }) => {
  const total = parts.reduce((sum, currValue) => {
    return sum + currValue.exercises;
  }, 0);

  return (
    <div>
      <h4>total of {total} exercises </h4>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content contents={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
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
  ];

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
