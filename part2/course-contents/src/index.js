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
    contents.map((content, index) => <Part key={index++} content={content} />);

  return <div>{partContent()}</div>;
};

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content contents={course.parts} />
    </div>
  );
};

const Total = props => {
  return (
    <div>
      <p>
        Number of exercises{' '}
        {props.course.parts[0].exercises +
          props.course.parts[1].exercises +
          props.course.parts[2].exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'k of a component',
        exercises: 14
      }
    ]
  };

  return (
    <div>
      <Course course={course} />
      <Total course={course} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
