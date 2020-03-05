import React from 'react';

const Header = ({ title }) => <h1>{title}</h1>;

const Content = ({ contents }) => {
  const partContent = () =>
    contents.map(content => <Part key={content.id} content={content} />);

  return <div>{partContent()}</div>;
};

const Part = ({ name, exercises }) => (
  <p>
    {name} {exercises}
  </p>
);

const Total = ({ total }) => {
  const exerciceTotal = total.reduce((sum, currValue) => {
    return sum + currValue.exercises;
  }, 0);

  return (
    <div>
      <h4>total of {exerciceTotal} exercises </h4>
    </div>
  );
};

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Content contents={course.parts} />
      <Total total={course.parts} />
    </div>
  );
};

export default Course;
